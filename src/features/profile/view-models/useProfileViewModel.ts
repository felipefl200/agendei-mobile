import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { Alert } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { logoutUseCase } from '@/infra/factories/authUseCases'
import {
  getPatientProfileUseCase,
  updatePatientAvatarUseCase,
  updatePatientPasswordUseCase,
  updatePatientProfileUseCase,
} from '@/infra/factories/profileUseCases'
import { queryKeys } from '@/infra/query/queryKeys'
import { useAuthStore } from '@/store/useAuthStore'
import { Patient } from '@/domain/entities/patient'
import { UpdatePatientProfileInput } from '@/domain/ports/PatientProfileGateway'

type ProfileField =
  | 'name'
  | 'email'
  | 'document'
  | 'birthDate'
  | 'phone'
  | 'healthInsuranceName'
  | 'healthInsuranceCard'
  | 'bloodType'
  | 'allergies'

interface ProfileFormState {
  name: string
  email: string
  document: string
  birthDate: string
  phone: string
}

const fieldLabels: Record<ProfileField, string> = {
  allergies: 'Alergias',
  birthDate: 'Data de nascimento',
  bloodType: 'Tipo sanguineo',
  document: 'CPF',
  email: 'E-mail',
  healthInsuranceCard: 'Carteirinha',
  healthInsuranceName: 'Convenio',
  name: 'Nome completo',
  phone: 'Telefone',
}

function digitsOnly(value: string) {
  return value.replace(/\D/g, '')
}

function formatCpf(value: string | null) {
  const digits = digitsOnly(value ?? '').slice(0, 11)
  return digits
    .replace(/^(\d{3})(\d)/, '$1.$2')
    .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1-$2')
}

function formatPhone(value: string | null) {
  const digits = digitsOnly(value ?? '').slice(0, 11)
  if (digits.length <= 10) {
    return digits.replace(/^(\d{2})(\d)/, '($1) $2').replace(/(\d{4})(\d)/, '$1-$2')
  }

  return digits.replace(/^(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d)/, '$1-$2')
}

function formatBirthDate(value: string | null) {
  if (!value) {
    return ''
  }

  const [date] = value.split('T')
  const parts = date.split('-')
  if (parts.length !== 3) {
    return value
  }

  return `${parts[2]}/${parts[1]}/${parts[0]}`
}

function toInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  const initials = parts.slice(0, 2).map((part) => part[0]).join('')
  return initials.toUpperCase() || 'AG'
}

function makeProfileForm(profile?: Patient): ProfileFormState {
  return {
    birthDate: formatBirthDate(profile?.birthDate ?? null),
    document: formatCpf(profile?.document ?? null),
    email: profile?.email ?? '',
    name: profile?.name ?? '',
    phone: formatPhone(profile?.phone ?? null),
  }
}

function getFriendlyError(error: unknown) {
  if (error instanceof Error && error.message) {
    if (error.message === 'Invalid credentials') {
      return 'Senha atual invalida.'
    }

    return error.message
  }

  return 'Nao foi possivel salvar as alteracoes.'
}

function getMimeType(uri: string) {
  const extension = uri.split('.').pop()?.toLowerCase()

  if (extension === 'jpg' || extension === 'jpeg') {
    return 'image/jpeg'
  }

  if (extension === 'png') {
    return 'image/png'
  }

  if (extension === 'webp') {
    return 'image/webp'
  }

  return 'image/jpeg'
}

function getFileName(uri: string, mimeType: string) {
  const fileName = uri.split('/').pop()
  if (fileName?.includes('.')) {
    return fileName
  }

  const extension = mimeType.split('/')[1] ?? 'jpg'
  return `avatar.${extension === 'jpeg' ? 'jpg' : extension}`
}

function useProfileViewModel() {
  const queryClient = useQueryClient()
  const signOut = useAuthStore((state) => state.signOut)
  const updateUser = useAuthStore((state) => state.updateUser)
  const [editingField, setEditingField] = useState<ProfileField | null>(null)
  const [fieldValue, setFieldValue] = useState('')
  const [isMainFormVisible, setIsMainFormVisible] = useState(false)
  const [mainForm, setMainForm] = useState<ProfileFormState>(makeProfileForm())
  const [isPasswordFormVisible, setIsPasswordFormVisible] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [formError, setFormError] = useState<string | null>(null)
  const [avatarError, setAvatarError] = useState<string | null>(null)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const profileQuery = useQuery({
    queryKey: queryKeys.profile.me(),
    queryFn: () => getPatientProfileUseCase.execute(),
  })

  const updateProfileMutation = useMutation({
    mutationFn: (input: UpdatePatientProfileInput) => updatePatientProfileUseCase.execute(input),
    onSuccess: (patient) => {
      queryClient.setQueryData(queryKeys.profile.me(), patient)
      updateUser({ email: patient.email, name: patient.name })
      void queryClient.invalidateQueries({ queryKey: queryKeys.profile.me() })
    },
  })

  const updatePasswordMutation = useMutation({
    mutationFn: () =>
      updatePatientPasswordUseCase.execute({
        currentPassword,
        newPassword,
        passwordConfirmation,
      }),
  })

  const updateAvatarMutation = useMutation({
    mutationFn: (asset: ImagePicker.ImagePickerAsset) => {
      const type = asset.mimeType ?? getMimeType(asset.uri)
      return updatePatientAvatarUseCase.execute({
        name: asset.fileName ?? getFileName(asset.uri, type),
        type,
        uri: asset.uri,
      })
    },
    onSuccess: (profile) => {
      queryClient.setQueryData<Patient | undefined>(queryKeys.profile.me(), (patient) =>
        patient ? { ...patient, avatarUrl: profile.avatarUrl } : patient,
      )
      void queryClient.invalidateQueries({ queryKey: queryKeys.profile.me() })
    },
  })

  const profile = profileQuery.data

  function openMainForm() {
    setFormError(null)
    setMainForm(makeProfileForm(profile))
    setIsMainFormVisible(true)
  }

  function openFieldForm(field: ProfileField) {
    setFormError(null)
    setEditingField(field)
    setFieldValue(getEditableValue(field))
  }

  function closeForms() {
    setEditingField(null)
    setIsMainFormVisible(false)
    setIsPasswordFormVisible(false)
    setCurrentPassword('')
    setNewPassword('')
    setPasswordConfirmation('')
    setFormError(null)
  }

  function getEditableValue(field: ProfileField) {
    if (!profile) {
      return ''
    }

    const value = profile[field]
    if (field === 'document') {
      return formatCpf(profile.document)
    }

    if (field === 'phone') {
      return formatPhone(profile.phone)
    }

    if (field === 'birthDate') {
      return formatBirthDate(profile.birthDate)
    }

    return typeof value === 'string' ? value : ''
  }

  async function saveField() {
    if (!editingField) {
      return
    }

    try {
      setFormError(null)
      await updateProfileMutation.mutateAsync({ [editingField]: fieldValue })
      closeForms()
    } catch (error) {
      setFormError(getFriendlyError(error))
    }
  }

  async function saveMainForm() {
    try {
      setFormError(null)
      await updateProfileMutation.mutateAsync(mainForm)
      closeForms()
    } catch (error) {
      setFormError(getFriendlyError(error))
    }
  }

  async function updatePreference(input: Pick<UpdatePatientProfileInput, 'appointmentReminders' | 'receiveNotifications'>) {
    try {
      setFormError(null)
      await updateProfileMutation.mutateAsync(input)
    } catch (error) {
      setFormError(getFriendlyError(error))
    }
  }

  async function savePassword() {
    try {
      setFormError(null)
      await updatePasswordMutation.mutateAsync()
      closeForms()
    } catch (error) {
      setFormError(getFriendlyError(error))
    }
  }

  async function uploadAvatar(asset: ImagePicker.ImagePickerAsset | undefined) {
    if (!asset) {
      return
    }

    try {
      setAvatarError(null)
      await updateAvatarMutation.mutateAsync(asset)
    } catch (error) {
      setAvatarError(getFriendlyError(error))
    }
  }

  async function pickAvatarFromLibrary() {
    try {
      setAvatarError(null)
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync()
      if (!permission.granted) {
        setAvatarError('Permita acesso as suas fotos para alterar o avatar.')
        return
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
        mediaTypes: ['images'],
        quality: 0.85,
      })

      if (!result.canceled) {
        await uploadAvatar(result.assets[0])
      }
    } catch (error) {
      setAvatarError(getFriendlyError(error))
    }
  }

  async function takeAvatarPhoto() {
    try {
      setAvatarError(null)
      const permission = await ImagePicker.requestCameraPermissionsAsync()
      if (!permission.granted) {
        setAvatarError('Permita acesso a camera para tirar uma foto.')
        return
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        cameraType: ImagePicker.CameraType.front,
        mediaTypes: ['images'],
        quality: 0.85,
      })

      if (!result.canceled) {
        await uploadAvatar(result.assets[0])
      }
    } catch (error) {
      setAvatarError(getFriendlyError(error))
    }
  }

  function openAvatarOptions() {
    if (updateAvatarMutation.isPending) {
      return
    }

    Alert.alert('Alterar foto', 'Escolha como atualizar seu avatar.', [
      { text: 'Galeria', onPress: () => void pickAvatarFromLibrary() },
      { text: 'Camera', onPress: () => void takeAvatarPhoto() },
      { text: 'Cancelar', style: 'cancel' },
    ])
  }

  async function handleLogout() {
    setIsLoggingOut(true)
    try {
      await logoutUseCase.execute()
    } catch {
      // Falha silenciosa para nao impedir o usuario de sair localmente.
    } finally {
      await signOut()
      setIsLoggingOut(false)
    }
  }

  return {
    appointmentReminders: profile?.appointmentReminders ?? true,
    avatarError,
    avatarInitials: toInitials(profile?.name ?? ''),
    avatarUrl: profile?.avatarUrl ?? null,
    closeForms,
    currentPassword,
    editingField,
    email: profile?.email ?? '',
    fieldLabel: editingField ? fieldLabels[editingField] : '',
    fieldValue,
    formError,
    handleLogout,
    isLoading: profileQuery.isLoading,
    isLoggingOut,
    isMainFormVisible,
    isPasswordFormVisible,
    isUploadingAvatar: updateAvatarMutation.isPending,
    isSaving: updateProfileMutation.isPending || updatePasswordMutation.isPending,
    mainForm,
    name: profile?.name ?? 'Paciente',
    newPassword,
    openAvatarOptions,
    openFieldForm,
    openMainForm,
    openPasswordForm: () => {
      setFormError(null)
      setIsPasswordFormVisible(true)
    },
    passwordConfirmation,
    pickAvatarFromLibrary,
    profileError: profileQuery.isError ? 'Nao foi possivel carregar seu perfil.' : null,
    refetchProfile: () => profileQuery.refetch(),
    receiveNotifications: profile?.receiveNotifications ?? true,
    saveField,
    saveMainForm,
    savePassword,
    setCurrentPassword,
    setFieldValue,
    setMainForm,
    setNewPassword,
    setPasswordConfirmation,
    takeAvatarPhoto,
    updatePreference,
    values: {
      allergies: profile?.allergies ?? '',
      birthDate: formatBirthDate(profile?.birthDate ?? null),
      bloodType: profile?.bloodType ?? '',
      document: formatCpf(profile?.document ?? null),
      healthInsuranceCard: profile?.healthInsuranceCard ?? '',
      healthInsuranceName: profile?.healthInsuranceName ?? '',
      phone: formatPhone(profile?.phone ?? null),
    },
  }
}

export type { ProfileField, ProfileFormState }
export { useProfileViewModel }
