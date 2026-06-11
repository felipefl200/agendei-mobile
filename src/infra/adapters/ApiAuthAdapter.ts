import { httpClient } from '@/infra/http/client'
import {
  AuthGateway,
  AuthSession,
  LoginCredentials,
  RegisterPatientInput,
  RegisterSession,
} from '@/domain/ports/AuthGateway'

class ApiAuthAdapter implements AuthGateway {
  async login(credentials: LoginCredentials): Promise<AuthSession> {
    return httpClient.post('auth/login', { json: credentials }).json<AuthSession>()
  }

  async register(input: RegisterPatientInput): Promise<RegisterSession> {
    return httpClient.post('auth/register', { json: input }).json<RegisterSession>()
  }

  async getCurrentUser() {
    const response = await httpClient.get('auth/me').json<Pick<AuthSession, 'user'>>()

    return response.user
  }
}

export { ApiAuthAdapter }
