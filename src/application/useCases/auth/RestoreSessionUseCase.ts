import { AuthGateway, AuthSession } from '@/domain/ports/AuthGateway'
import { AuthTokenStorage } from '@/domain/ports/AuthTokenStorage'

class RestoreSessionUseCase {
  constructor(
    private readonly authGateway: AuthGateway,
    private readonly authTokenStorage: AuthTokenStorage,
  ) {}

  async execute(): Promise<AuthSession | null> {
    const token = await this.authTokenStorage.getToken()

    if (!token) {
      return null
    }

    try {
      const user = await this.authGateway.getCurrentUser()

      return { token, user }
    } catch (error) {
      await this.authTokenStorage.removeToken()
      throw error
    }
  }
}

export { RestoreSessionUseCase }
