import { SpecialtySummary } from './specialty'

interface DoctorClinic {
  id: string
  name: string
  address: string
}

interface Doctor {
  id: string
  name: string
  email: string
  crm: string
  bio: string | null
  avatarUrl: string | null
  active: boolean
  specialty: SpecialtySummary
  clinic: DoctorClinic
  availableToday: boolean
  createdAt: string
  updatedAt: string
}

export type { Doctor, DoctorClinic }
