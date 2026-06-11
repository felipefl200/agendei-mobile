import { User } from '@/domain/entities/user'

interface LoginCredentials {
  email: string
  password: string
}

interface RegisterPatientInput {
  name: string
  email: string
  password: string
  phone?: string
  birthDate?: string
  document?: string
}

interface AuthSession {
  user: User
  token: string
}

interface RegisteredPatient {
  id: string
  userId: string
  phone: string | null
  birthDate: string | null
  document: string | null
  avatarUrl: string | null
  createdAt: string
  updatedAt: string
}

interface RegisterSession extends AuthSession {
  patient: RegisteredPatient
}

interface AuthGateway {
  login(credentials: LoginCredentials): Promise<AuthSession>
  register(input: RegisterPatientInput): Promise<RegisterSession>
  getCurrentUser(): Promise<User>
}

export type {
  AuthGateway,
  AuthSession,
  LoginCredentials,
  RegisteredPatient,
  RegisterPatientInput,
  RegisterSession,
}
