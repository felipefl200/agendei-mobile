import { act, waitFor } from '@testing-library/react'
import { Alert } from 'react-native'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { patientFixture, userFixture } from '@/test/fixtures'
import { renderHookWithProviders } from '@/test/renderHookWithProviders'
import { useAuthStore } from '@/store/useAuthStore'
import { useProfileViewModel } from './useProfileViewModel'

const profileUseCasesMock = vi.hoisted(() => ({
  getPatientProfileUseCase: { execute: vi.fn() },
  updatePatientAvatarUseCase: { execute: vi.fn() },
  updatePatientPasswordUseCase: { execute: vi.fn() },
  updatePatientProfileUseCase: { execute: vi.fn() },
}))

const imagePickerMock = vi.hoisted(() => ({
  CameraType: { front: 'front' },
  launchCameraAsync: vi.fn(),
  launchImageLibraryAsync: vi.fn(),
  requestCameraPermissionsAsync: vi.fn(),
  requestMediaLibraryPermissionsAsync: vi.fn(),
}))

const authUseCasesMock = vi.hoisted(() => ({
  logoutUseCase: { execute: vi.fn() },
}))

vi.mock('@/infra/factories/profileUseCases', () => profileUseCasesMock)
vi.mock('@/infra/factories/authUseCases', () => authUseCasesMock)
vi.mock('expo-image-picker', () => imagePickerMock)

describe('useProfileViewModel', () => {
  beforeEach(() => {
    useAuthStore.setState({
      isAuthenticated: true,
      isRestoring: false,
      token: 'token-1',
      user: userFixture,
    })
    profileUseCasesMock.getPatientProfileUseCase.execute.mockResolvedValue(patientFixture)
    profileUseCasesMock.updatePatientProfileUseCase.execute.mockResolvedValue({
      ...patientFixture,
      email: 'ana.martins@example.com',
      name: 'Ana Martins',
    })
    profileUseCasesMock.updatePatientAvatarUseCase.execute.mockResolvedValue({
      avatarUrl: 'https://example.com/avatar.webp',
      type: 'patient',
    })
    profileUseCasesMock.updatePatientPasswordUseCase.execute.mockResolvedValue(undefined)
    authUseCasesMock.logoutUseCase.execute.mockResolvedValue(undefined)
    imagePickerMock.requestMediaLibraryPermissionsAsync.mockResolvedValue({ granted: true })
    imagePickerMock.requestCameraPermissionsAsync.mockResolvedValue({ granted: true })
    imagePickerMock.launchImageLibraryAsync.mockResolvedValue({
      assets: [
        {
          fileName: 'avatar.webp',
          mimeType: 'image/webp',
          uri: 'file://avatar.webp',
        },
      ],
      canceled: false,
    })
    imagePickerMock.launchCameraAsync.mockResolvedValue({
      assets: [
        {
          fileName: 'photo.jpg',
          mimeType: 'image/jpeg',
          uri: 'file://photo.jpg',
        },
      ],
      canceled: false,
    })
  })

  it('loads and formats profile fields', async () => {
    const { result } = renderHookWithProviders(() => useProfileViewModel())

    await waitFor(() => {
      expect(result.current.name).toBe('Ana Paciente')
      expect(result.current.values.document).toBe('123.456.789-00')
      expect(result.current.values.birthDate).toBe('15/04/1988')
      expect(result.current.values.phone).toBe('(11) 98765-4321')
    })
  })

  it('updates a single field and syncs auth store user', async () => {
    const { result } = renderHookWithProviders(() => useProfileViewModel())

    await waitFor(() => expect(result.current.name).toBe('Ana Paciente'))

    act(() => {
      result.current.openFieldForm('name')
      result.current.setFieldValue('Ana Martins')
    })

    await act(async () => {
      await result.current.saveField()
    })

    expect(profileUseCasesMock.updatePatientProfileUseCase.execute).toHaveBeenCalledWith({
      name: 'Ana Martins',
    })
    expect(useAuthStore.getState().user?.name).toBe('Ana Martins')
  })

  it('updates preferences immediately', async () => {
    const { result } = renderHookWithProviders(() => useProfileViewModel())

    await waitFor(() => expect(result.current.receiveNotifications).toBe(true))

    await act(async () => {
      await result.current.updatePreference({ receiveNotifications: false })
    })

    expect(profileUseCasesMock.updatePatientProfileUseCase.execute).toHaveBeenCalledWith({
      receiveNotifications: false,
    })
  })

  it('uploads avatar from library and updates cached profile', async () => {
    const { result } = renderHookWithProviders(() => useProfileViewModel())

    await waitFor(() => expect(result.current.name).toBe('Ana Paciente'))
    profileUseCasesMock.getPatientProfileUseCase.execute.mockResolvedValue({
      ...patientFixture,
      avatarUrl: 'https://example.com/avatar.webp',
    })

    await act(async () => {
      await result.current.pickAvatarFromLibrary()
    })

    expect(imagePickerMock.launchImageLibraryAsync).toHaveBeenCalledWith({
      allowsEditing: true,
      aspect: [1, 1],
      mediaTypes: ['images'],
      quality: 0.85,
    })
    expect(profileUseCasesMock.updatePatientAvatarUseCase.execute).toHaveBeenCalledWith({
      name: 'avatar.webp',
      type: 'image/webp',
      uri: 'file://avatar.webp',
    })
    await waitFor(() => {
      expect(result.current.avatarUrl).toBe('https://example.com/avatar.webp')
    })
  })

  it('opens a single avatar options menu', async () => {
    const { result } = renderHookWithProviders(() => useProfileViewModel())

    await waitFor(() => expect(result.current.name).toBe('Ana Paciente'))

    act(() => {
      result.current.openAvatarOptions()
    })

    expect(Alert.alert).toHaveBeenCalledWith('Alterar foto', 'Escolha como atualizar seu avatar.', [
      { text: 'Galeria', onPress: expect.any(Function) },
      { text: 'Camera', onPress: expect.any(Function) },
      { text: 'Cancelar', style: 'cancel' },
    ])
  })

  it('uploads avatar from camera', async () => {
    const { result } = renderHookWithProviders(() => useProfileViewModel())

    await waitFor(() => expect(result.current.name).toBe('Ana Paciente'))

    await act(async () => {
      await result.current.takeAvatarPhoto()
    })

    expect(imagePickerMock.launchCameraAsync).toHaveBeenCalledWith({
      allowsEditing: true,
      aspect: [1, 1],
      cameraType: imagePickerMock.CameraType.front,
      mediaTypes: ['images'],
      quality: 0.85,
    })
    expect(profileUseCasesMock.updatePatientAvatarUseCase.execute).toHaveBeenCalledWith({
      name: 'photo.jpg',
      type: 'image/jpeg',
      uri: 'file://photo.jpg',
    })
  })

  it('does not upload avatar when permission is denied or picker is canceled', async () => {
    const { result } = renderHookWithProviders(() => useProfileViewModel())

    await waitFor(() => expect(result.current.name).toBe('Ana Paciente'))

    imagePickerMock.requestMediaLibraryPermissionsAsync.mockResolvedValueOnce({ granted: false })
    await act(async () => {
      await result.current.pickAvatarFromLibrary()
    })

    expect(result.current.avatarError).toBe('Permita acesso as suas fotos para alterar o avatar.')
    expect(profileUseCasesMock.updatePatientAvatarUseCase.execute).not.toHaveBeenCalled()

    imagePickerMock.requestMediaLibraryPermissionsAsync.mockResolvedValueOnce({ granted: true })
    imagePickerMock.launchImageLibraryAsync.mockResolvedValueOnce({ assets: [], canceled: true })
    await act(async () => {
      await result.current.pickAvatarFromLibrary()
    })

    expect(profileUseCasesMock.updatePatientAvatarUseCase.execute).not.toHaveBeenCalled()
  })

  it('changes password and logs out', async () => {
    const { result } = renderHookWithProviders(() => useProfileViewModel())

    act(() => {
      result.current.setCurrentPassword('current123')
      result.current.setNewPassword('newpass123')
      result.current.setPasswordConfirmation('newpass123')
    })

    await act(async () => {
      await result.current.savePassword()
    })

    expect(profileUseCasesMock.updatePatientPasswordUseCase.execute).toHaveBeenCalledWith({
      currentPassword: 'current123',
      newPassword: 'newpass123',
      passwordConfirmation: 'newpass123',
    })

    await act(async () => {
      await result.current.handleLogout()
    })

    expect(authUseCasesMock.logoutUseCase.execute).toHaveBeenCalled()
    expect(useAuthStore.getState().isAuthenticated).toBe(false)
  })
})
