import { PatientProfileGateway } from '@/domain/ports/PatientProfileGateway'
import { z } from 'zod'

interface UpdatePatientPasswordUseCaseInput {
  currentPassword: string
  newPassword: string
  passwordConfirmation: string
}

const updatePasswordSchema = z
  .object({
    currentPassword: z.string().trim().min(1, 'Informe a senha atual e a nova senha.'),
    newPassword: z.string().trim().min(8, 'A nova senha deve ter pelo menos 8 caracteres.'),
    passwordConfirmation: z.string().trim(),
  })
  .refine((data) => data.newPassword === data.passwordConfirmation, {
    message: 'As senhas não conferem.',
    path: ['passwordConfirmation'],
  })

class UpdatePatientPasswordUseCase {
  constructor(private readonly patientProfileGateway: PatientProfileGateway) {}

  async execute(input: UpdatePatientPasswordUseCaseInput) {
    const parseResult = updatePasswordSchema.safeParse(input)

    if (!parseResult.success) {
      throw new Error(parseResult.error.issues[0].message)
    }

    const { currentPassword, newPassword } = parseResult.data

    return this.patientProfileGateway.updatePassword({
      currentPassword,
      newPassword,
    })
  }
}

export type { UpdatePatientPasswordUseCaseInput }
export { UpdatePatientPasswordUseCase }
