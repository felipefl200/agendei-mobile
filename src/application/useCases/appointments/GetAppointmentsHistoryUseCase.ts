import { AppointmentSummary } from '@/domain/entities/appointment'
import { AppointmentsGateway } from '@/domain/ports/AppointmentsGateway'

class GetAppointmentsHistoryUseCase {
  constructor(private readonly appointmentsGateway: AppointmentsGateway) {}

  execute(): Promise<AppointmentSummary[]> {
    return this.appointmentsGateway.getHistory()
  }
}

export { GetAppointmentsHistoryUseCase }
