import { Patient } from '@/domain/entities/patient'
import {
  PatientProfileGateway,
  UpdatePatientAvatarInput,
  UpdatePatientPasswordInput,
  UpdatePatientProfileInput,
} from '@/domain/ports/PatientProfileGateway'
import { httpClient, httpMultipartFilePutJson } from '@/infra/http/client'
import { z } from 'zod'

const patientSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string().nullable(),
  birthDate: z.string().nullable(),
  document: z.string().nullable(),
  avatarUrl: z.string().nullable(),
  healthInsuranceName: z.string().nullable().default(null),
  healthInsuranceCard: z.string().nullable().default(null),
  bloodType: z.string().nullable().default(null),
  allergies: z.string().nullable().default(null),
  receiveNotifications: z.boolean().default(true),
  appointmentReminders: z.boolean().default(true),
  createdAt: z.string(),
  updatedAt: z.string(),
})

const avatarProfileSchema = z.object({
  type: z.union([z.literal('patient'), z.literal('doctor')]),
  avatarUrl: z.string(),
})

class ApiPatientProfileAdapter implements PatientProfileGateway {
  async getMe(): Promise<Patient> {
    const data = await httpClient.get('patients/me').json()
    const response = z.object({ patient: patientSchema }).parse(data)

    return response.patient as Patient
  }

  async updateAvatar(input: UpdatePatientAvatarInput) {
    const data = await httpMultipartFilePutJson('profile/avatar', {
      fieldName: 'avatar',
      mimeType: input.type,
      uri: input.uri,
    })
    const response = z.object({ profile: avatarProfileSchema }).parse(data)

    return response.profile
  }

  async updateMe(input: UpdatePatientProfileInput): Promise<Patient> {
    const data = await httpClient.patch('patients/me', { json: input }).json()
    const response = z.object({ patient: patientSchema }).parse(data)

    return response.patient as Patient
  }

  async updatePassword(input: UpdatePatientPasswordInput): Promise<void> {
    await httpClient.patch('auth/me/password', { json: input })
  }
}

export { ApiPatientProfileAdapter }
