import {
  PatientProfileGateway,
  UpdatePatientProfileInput,
} from '@/domain/ports/PatientProfileGateway'

const digitsOnlyFields = new Set(['document', 'phone'])

function normalizeString(value: string) {
  const trimmed = value.trim()
  return trimmed ? trimmed : null
}

function normalizeDate(value: string) {
  const trimmed = value.trim()
  if (!trimmed) {
    return null
  }

  const match = trimmed.match(/^(\d{2})\/(\d{2})\/(\d{4})$/)
  if (match) {
    return `${match[3]}-${match[2]}-${match[1]}`
  }

  return trimmed
}

function normalizeInput(input: UpdatePatientProfileInput): UpdatePatientProfileInput {
  return Object.entries(input).reduce<UpdatePatientProfileInput>((normalized, [key, value]) => {
    if (value === undefined) {
      return normalized
    }

    if (typeof value === 'string') {
      if (key === 'email') {
        return { ...normalized, email: value.trim().toLowerCase() }
      }

      if (key === 'name') {
        return { ...normalized, name: value.trim() }
      }

      if (key === 'birthDate') {
        return { ...normalized, birthDate: normalizeDate(value) }
      }

      if (digitsOnlyFields.has(key)) {
        return { ...normalized, [key]: normalizeString(value.replace(/\D/g, '')) }
      }

      return { ...normalized, [key]: normalizeString(value) }
    }

    return { ...normalized, [key]: value }
  }, {})
}

class UpdatePatientProfileUseCase {
  constructor(private readonly patientProfileGateway: PatientProfileGateway) {}

  async execute(input: UpdatePatientProfileInput) {
    const normalizedInput = normalizeInput(input)

    if (Object.keys(normalizedInput).length === 0) {
      throw new Error('Informe ao menos um dado para atualizar.')
    }

    if ('name' in normalizedInput && !normalizedInput.name?.trim()) {
      throw new Error('Informe seu nome completo.')
    }

    if ('email' in normalizedInput && !normalizedInput.email?.trim()) {
      throw new Error('Informe seu e-mail.')
    }

    return this.patientProfileGateway.updateMe(normalizedInput)
  }
}

export { UpdatePatientProfileUseCase }
