import { CanceledAppointment } from '@/domain/entities/appointment'
import {
  AppointmentsGateway,
  CancelAppointmentInput,
} from '@/domain/ports/AppointmentsGateway'

class CancelAppointmentUseCase {
  constructor(private readonly appointmentsGateway: AppointmentsGateway) {}

  execute(input: CancelAppointmentInput): Promise<CanceledAppointment> {
    return this.appointmentsGateway.cancel(input)
  }
}

export { CancelAppointmentUseCase }
