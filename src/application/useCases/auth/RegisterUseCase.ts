import {
  AuthGateway,
  RegisterPatientInput,
  RegisterSession,
} from '@/domain/ports/AuthGateway'
import { AuthTokenStorage } from '@/domain/ports/AuthTokenStorage'

class RegisterUseCase {
  constructor(
    private readonly authGateway: AuthGateway,
    private readonly authTokenStorage: AuthTokenStorage,
  ) {}

  async execute(input: RegisterPatientInput): Promise<RegisterSession> {
    const session = await this.authGateway.register({
      ...input,
      email: input.email.trim().toLowerCase(),
      name: input.name.trim(),
    })

    await this.authTokenStorage.setToken(session.token)

    return session
  }
}

export { RegisterUseCase }
