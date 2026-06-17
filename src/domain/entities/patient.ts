interface Patient {
  id: string
  name: string
  email: string
  phone: string | null
  birthDate: string | null
  document: string | null
  avatarUrl: string | null
  healthInsuranceName: string | null
  healthInsuranceCard: string | null
  bloodType: string | null
  allergies: string | null
  receiveNotifications: boolean
  appointmentReminders: boolean
  createdAt: string
  updatedAt: string
}

export type { Patient }
