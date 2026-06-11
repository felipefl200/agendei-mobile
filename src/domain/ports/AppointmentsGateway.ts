import {
  AppointmentDetails,
  AppointmentSummary,
  CanceledAppointment,
} from '@/domain/entities/appointment'

interface CreateAppointmentInput {
  doctorId: string
  specialtyId: string
  clinicId: string
  date: string
  startTime: string
}

interface CancelAppointmentInput {
  appointmentId: string
  reason: string
}

interface AppointmentsGateway {
  cancel(input: CancelAppointmentInput): Promise<CanceledAppointment>
  create(input: CreateAppointmentInput): Promise<AppointmentDetails>
  getHistory(): Promise<AppointmentSummary[]>
  getUpcoming(): Promise<AppointmentSummary[]>
}

export type { AppointmentsGateway, CancelAppointmentInput, CreateAppointmentInput }
