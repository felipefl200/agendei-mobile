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

class ApiAppointmentsAdapter implements AppointmentsGateway {
  async cancel({ appointmentId, reason }: CancelAppointmentInput) {
    const response = await httpClient
      .patch(`appointments/${appointmentId}/cancel`, { json: { reason } })
      .json<{ appointment: CanceledAppointment }>()

    return response.appointment
  }

  async create(input: CreateAppointmentInput) {
    const response = await httpClient
      .post('appointments', { json: input })
      .json<{ appointment: AppointmentDetails }>()

    return response.appointment
  }

  async getHistory() {
    const response = await httpClient
      .get('appointments/history')
      .json<{ appointments: AppointmentSummary[] }>()

    return response.appointments
  }

  async getUpcoming() {
    const response = await httpClient
      .get('appointments/upcoming')
      .json<{ appointments: AppointmentSummary[] }>()

    return response.appointments
  }
}

export { ApiAppointmentsAdapter }
