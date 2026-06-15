import { httpClient } from '@/infra/http/client'
import { User } from '@/domain/entities/user'
import {
  AuthGateway,
  AuthSession,
  LoginCredentials,
  RegisterPatientInput,
  RegisterSession,
} from '@/domain/ports/AuthGateway'
import { z } from 'zod'

const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  role: z.union([z.literal('patient'), z.literal('doctor'), z.literal('admin'), z.literal('super_admin')]),
  active: z.boolean(),
  lastLoginAt: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

const authSessionSchema = z.object({
  token: z.string(),
  user: userSchema,
})

const registeredPatientSchema = z.object({
  id: z.string(),
  userId: z.string(),
  phone: z.string().nullable(),
  birthDate: z.string().nullable(),
  document: z.string().nullable(),
  avatarUrl: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

const registerSessionSchema = authSessionSchema.extend({
  patient: registeredPatientSchema,
})

class ApiAuthAdapter implements AuthGateway {
  async login(credentials: LoginCredentials): Promise<AuthSession> {
    const data = await httpClient.post('auth/login', { json: credentials }).json()
    return authSessionSchema.parse(data) as AuthSession
  }

  async register(input: RegisterPatientInput): Promise<RegisterSession> {
    const data = await httpClient.post('auth/register', { json: input }).json()
    return registerSessionSchema.parse(data) as RegisterSession
  }

  async getCurrentUser(): Promise<User> {
    const data = await httpClient.get('auth/me').json()
    const response = z.object({ user: userSchema }).parse(data)

    return response.user as User
  }
}

export { ApiAuthAdapter }
