import {
  PatientProfileGateway,
  UpdatePatientAvatarInput,
} from '@/domain/ports/PatientProfileGateway'

const allowedAvatarTypes = new Set(['image/jpeg', 'image/png', 'image/webp'])

class UpdatePatientAvatarUseCase {
  constructor(private readonly patientProfileGateway: PatientProfileGateway) {}

  async execute(input: UpdatePatientAvatarInput) {
    if (!input.uri || !input.name || !input.type) {
      throw new Error('Selecione uma imagem para atualizar seu avatar.')
    }

    if (!allowedAvatarTypes.has(input.type)) {
      throw new Error('Use uma imagem JPG, PNG ou WebP.')
    }

    return this.patientProfileGateway.updateAvatar(input)
  }
}

export { UpdatePatientAvatarUseCase }
