import { AppointmentDetails } from '@/domain/entities/appointment'

interface CreateAppointmentInput {
  doctorId: string
  specialtyId: string
  clinicId: string
  date: string
  startTime: string
}

interface AppointmentsGateway {
  create(input: CreateAppointmentInput): Promise<AppointmentDetails>
}

export type { AppointmentsGateway, CreateAppointmentInput }
