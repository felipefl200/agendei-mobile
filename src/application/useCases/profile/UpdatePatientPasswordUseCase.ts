import { PatientProfileGateway } from '@/domain/ports/PatientProfileGateway'

interface UpdatePatientPasswordUseCaseInput {
  currentPassword: string
  newPassword: string
  passwordConfirmation: string
}

class UpdatePatientPasswordUseCase {
  constructor(private readonly patientProfileGateway: PatientProfileGateway) {}

  async execute(input: UpdatePatientPasswordUseCaseInput) {
    const currentPassword = input.currentPassword.trim()
    const newPassword = input.newPassword.trim()

    if (!currentPassword || !newPassword) {
      throw new Error('Informe a senha atual e a nova senha.')
    }

    if (newPassword.length < 8) {
      throw new Error('A nova senha deve ter pelo menos 8 caracteres.')
    }

    if (newPassword !== input.passwordConfirmation.trim()) {
      throw new Error('As senhas não conferem.')
    }

    return this.patientProfileGateway.updatePassword({
      currentPassword,
      newPassword,
    })
  }
}

export type { UpdatePatientPasswordUseCaseInput }
export { UpdatePatientPasswordUseCase }
