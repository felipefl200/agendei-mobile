type UserRole = 'patient' | 'doctor' | 'admin' | 'super_admin'

interface User {
  id: string
  name: string
  email: string
  role: UserRole
  active: boolean
  lastLoginAt: string | null
  createdAt: string
  updatedAt: string
}

export type { User, UserRole }
