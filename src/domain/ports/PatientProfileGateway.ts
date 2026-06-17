import { Patient } from '@/domain/entities/patient'

interface UpdatePatientProfileInput {
  name?: string
  email?: string
  phone?: string | null
  birthDate?: string | null
  document?: string | null
  avatarUrl?: string | null
  healthInsuranceName?: string | null
  healthInsuranceCard?: string | null
  bloodType?: string | null
  allergies?: string | null
  receiveNotifications?: boolean
  appointmentReminders?: boolean
}

interface UpdatePatientPasswordInput {
  currentPassword: string
  newPassword: string
}

interface PatientProfileGateway {
  getMe(): Promise<Patient>
  updateMe(input: UpdatePatientProfileInput): Promise<Patient>
  updatePassword(input: UpdatePatientPasswordInput): Promise<void>
}

export type {
  PatientProfileGateway,
  UpdatePatientPasswordInput,
  UpdatePatientProfileInput,
}
