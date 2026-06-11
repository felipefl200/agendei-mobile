import { DoctorAvailability } from '@/domain/entities/availability'

interface GetDoctorAvailabilityInput {
  doctorId: string
  clinicId: string
  date: string
}

interface DoctorAvailabilityGateway {
  getAvailableSlots(input: GetDoctorAvailabilityInput): Promise<DoctorAvailability>
}

export type { DoctorAvailabilityGateway, GetDoctorAvailabilityInput }
