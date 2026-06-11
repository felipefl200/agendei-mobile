import { AppointmentSummary } from '@/domain/entities/appointment'
import { AppointmentsGateway } from '@/domain/ports/AppointmentsGateway'

class GetUpcomingAppointmentsUseCase {
  constructor(private readonly appointmentsGateway: AppointmentsGateway) {}

  execute(): Promise<AppointmentSummary[]> {
    return this.appointmentsGateway.getUpcoming()
  }
}

export { GetUpcomingAppointmentsUseCase }
