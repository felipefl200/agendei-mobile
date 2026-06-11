import { AppointmentDetails } from '@/domain/entities/appointment'
import {
  AppointmentsGateway,
  CreateAppointmentInput,
} from '@/domain/ports/AppointmentsGateway'

class CreateAppointmentUseCase {
  constructor(private readonly appointmentsGateway: AppointmentsGateway) {}

  execute(input: CreateAppointmentInput): Promise<AppointmentDetails> {
    return this.appointmentsGateway.create(input)
  }
}

export { CreateAppointmentUseCase }
