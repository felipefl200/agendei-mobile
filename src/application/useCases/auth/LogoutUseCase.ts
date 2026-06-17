import { AuthGateway } from '@/domain/ports/AuthGateway'

class LogoutUseCase {
  constructor(private readonly authGateway: AuthGateway) {}

  async execute(): Promise<void> {
    await this.authGateway.logout()
  }
}

export { LogoutUseCase }
