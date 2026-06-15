import {
  AppointmentDetails,
  AppointmentSummary,
  CanceledAppointment,
} from '@/domain/entities/appointment'
import {
  AppointmentsGateway,
  CancelAppointmentInput,
  CreateAppointmentInput,
} from '@/domain/ports/AppointmentsGateway'
import { httpClient } from '@/infra/http/client'
import { z } from 'zod'

const appointmentStatusSchema = z.union([
  z.literal('scheduled'),
  z.literal('confirmed'),
  z.literal('completed'),
  z.literal('canceled'),
  z.literal('no_show'),
])

const appointmentPersonSummarySchema = z.object({
  id: z.string(),
  name: z.string(),
})

const appointmentClinicSummarySchema = z.object({
  id: z.string(),
  name: z.string(),
})

const appointmentSummarySchema = z.object({
  id: z.string(),
  doctorName: z.string(),
  specialtyName: z.string(),
  clinicName: z.string(),
  date: z.string(),
  startTime: z.string(),
  status: appointmentStatusSchema,
})

const appointmentDetailsSchema = z.object({
  id: z.string(),
  doctor: appointmentPersonSummarySchema,
  specialty: appointmentPersonSummarySchema,
  clinic: appointmentClinicSummarySchema,
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  status: appointmentStatusSchema,
})

const canceledAppointmentSchema = z.object({
  id: z.string(),
  status: z.literal('canceled'),
  cancelReason: z.string().nullable(),
})

class ApiAppointmentsAdapter implements AppointmentsGateway {
  async cancel({ appointmentId, reason }: CancelAppointmentInput): Promise<CanceledAppointment> {
    const data = await httpClient
      .patch(`appointments/${appointmentId}/cancel`, { json: { reason } })
      .json()

    const response = z.object({ appointment: canceledAppointmentSchema }).parse(data)
    return response.appointment as CanceledAppointment
  }

  async create(input: CreateAppointmentInput): Promise<AppointmentDetails> {
    const data = await httpClient
      .post('appointments', { json: input })
      .json()

    const response = z.object({ appointment: appointmentDetailsSchema }).parse(data)
    return response.appointment as AppointmentDetails
  }

  async getHistory(): Promise<AppointmentSummary[]> {
    const data = await httpClient
      .get('appointments/history')
      .json()

    const response = z.object({ appointments: z.array(appointmentSummarySchema) }).parse(data)
    return response.appointments as AppointmentSummary[]
  }

  async getUpcoming(): Promise<AppointmentSummary[]> {
    const data = await httpClient
      .get('appointments/upcoming')
      .json()

    const response = z.object({ appointments: z.array(appointmentSummarySchema) }).parse(data)
    return response.appointments as AppointmentSummary[]
  }
}

export { ApiAppointmentsAdapter }
