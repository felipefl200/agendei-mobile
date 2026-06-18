import {
  PatientProfileGateway,
  UpdatePatientProfileInput,
} from '@/domain/ports/PatientProfileGateway'
import { z } from 'zod'

const updatePatientProfileSchema = z
  .object({
    name: z.string().trim().min(1, 'Informe seu nome completo.').optional(),
    email: z.string().trim().toLowerCase().email('Informe um e-mail válido.').optional(),
    phone: z
      .string()
      .transform((val) => val.replace(/\D/g, ''))
      .transform((val) => (val ? val : null))
      .optional()
      .nullable(),
    birthDate: z
      .string()
      .trim()
      .transform((val) => {
        if (!val) return null
        const match = val.match(/^(\d{2})\/(\d{2})\/(\d{4})$/)
        if (match) return `${match[3]}-${match[2]}-${match[1]}`
        return val
      })
      .optional()
      .nullable(),
    document: z
      .string()
      .transform((val) => val.replace(/\D/g, ''))
      .transform((val) => (val ? val : null))
      .optional()
      .nullable(),
    avatarUrl: z.string().trim().optional().nullable(),
    healthInsuranceName: z.string().trim().optional().nullable(),
    healthInsuranceCard: z.string().trim().optional().nullable(),
    bloodType: z.string().trim().optional().nullable(),
    allergies: z.string().trim().optional().nullable(),
    receiveNotifications: z.boolean().optional(),
    appointmentReminders: z.boolean().optional(),
  })
  .refine(
    (data) => Object.keys(data).length > 0,
    { message: 'Informe ao menos um dado para atualizar.' }
  )

class UpdatePatientProfileUseCase {
  constructor(private readonly patientProfileGateway: PatientProfileGateway) {}

  async execute(input: UpdatePatientProfileInput) {
    const parseResult = updatePatientProfileSchema.safeParse(input)

    if (!parseResult.success) {
      throw new Error(parseResult.error.issues[0].message)
    }

    const normalizedInput = parseResult.data

    return this.patientProfileGateway.updateMe(normalizedInput)
  }
}

export { UpdatePatientProfileUseCase }
