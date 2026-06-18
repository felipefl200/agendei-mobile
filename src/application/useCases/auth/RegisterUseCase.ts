import {
  AuthGateway,
  RegisterPatientInput,
  RegisterSession,
} from '@/domain/ports/AuthGateway'
import { AuthTokenStorage } from '@/domain/ports/AuthTokenStorage'
import { z } from 'zod'

const registerSchema = z.object({
  name: z.string().trim().min(1, 'Informe seu nome completo.'),
  email: z.string().trim().toLowerCase().email('Informe um e-mail válido.'),
  password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres.'),
  phone: z.string().optional(),
  birthDate: z.string().optional(),
  document: z.string().optional(),
})

class RegisterUseCase {
  constructor(
    private readonly authGateway: AuthGateway,
    private readonly authTokenStorage: AuthTokenStorage,
  ) {}

  async execute(input: RegisterPatientInput): Promise<RegisterSession> {
    const parseResult = registerSchema.safeParse(input)

    if (!parseResult.success) {
      throw new Error(parseResult.error.issues[0].message)
    }

    const session = await this.authGateway.register(parseResult.data)

    await this.authTokenStorage.setToken(session.token)

    return session
  }
}

export { RegisterUseCase }
