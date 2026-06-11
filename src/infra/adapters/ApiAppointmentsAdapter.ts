import { AppointmentDetails } from '@/domain/entities/appointment'
import {
  AppointmentsGateway,
  CreateAppointmentInput,
} from '@/domain/ports/AppointmentsGateway'
import { httpClient } from '@/infra/http/client'

class ApiAppointmentsAdapter implements AppointmentsGateway {
  async create(input: CreateAppointmentInput) {
    const response = await httpClient
      .post('appointments', { json: input })
      .json<{ appointment: AppointmentDetails }>()

    return response.appointment
  }
}

export { ApiAppointmentsAdapter }
