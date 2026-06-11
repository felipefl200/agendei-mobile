interface Patient {
  id: string
  name: string
  email: string
  phone: string | null
  birthDate: string | null
  document: string | null
  avatarUrl: string | null
  createdAt: string
  updatedAt: string
}

export type { Patient }
