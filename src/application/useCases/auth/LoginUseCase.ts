import { AuthGateway, AuthSession, LoginCredentials } from '@/domain/ports/AuthGateway'
import { AuthTokenStorage } from '@/domain/ports/AuthTokenStorage'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email('Informe um e-mail válido.'),
  password: z.string().min(1, 'Informe a senha.'),
})

class LoginUseCase {
  constructor(
    private readonly authGateway: AuthGateway,
    private readonly authTokenStorage: AuthTokenStorage,
  ) {}

  async execute(credentials: LoginCredentials): Promise<AuthSession> {
    const parseResult = loginSchema.safeParse(credentials)

    if (!parseResult.success) {
      throw new Error(parseResult.error.issues[0].message)
    }

    const session = await this.authGateway.login(parseResult.data)

    await this.authTokenStorage.setToken(session.token)

    return session
  }
}

export { LoginUseCase }
