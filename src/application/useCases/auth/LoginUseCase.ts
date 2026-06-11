import { AuthGateway, AuthSession, LoginCredentials } from '@/domain/ports/AuthGateway'
import { AuthTokenStorage } from '@/domain/ports/AuthTokenStorage'

class LoginUseCase {
  constructor(
    private readonly authGateway: AuthGateway,
    private readonly authTokenStorage: AuthTokenStorage,
  ) {}

  async execute(credentials: LoginCredentials): Promise<AuthSession> {
    const session = await this.authGateway.login({
      ...credentials,
      email: credentials.email.trim().toLowerCase(),
    })

    await this.authTokenStorage.setToken(session.token)

    return session
  }
}

export { LoginUseCase }
