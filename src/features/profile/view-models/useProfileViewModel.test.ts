import { act, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { patientFixture, userFixture } from '@/test/fixtures'
import { renderHookWithProviders } from '@/test/renderHookWithProviders'
import { useAuthStore } from '@/store/useAuthStore'
import { useProfileViewModel } from './useProfileViewModel'

const profileUseCasesMock = vi.hoisted(() => ({
  getPatientProfileUseCase: { execute: vi.fn() },
  updatePatientPasswordUseCase: { execute: vi.fn() },
  updatePatientProfileUseCase: { execute: vi.fn() },
}))

const authUseCasesMock = vi.hoisted(() => ({
  logoutUseCase: { execute: vi.fn() },
}))

vi.mock('@/infra/factories/profileUseCases', () => profileUseCasesMock)
vi.mock('@/infra/factories/authUseCases', () => authUseCasesMock)

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
    profileUseCasesMock.updatePatientPasswordUseCase.execute.mockResolvedValue(undefined)
    authUseCasesMock.logoutUseCase.execute.mockResolvedValue(undefined)
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
