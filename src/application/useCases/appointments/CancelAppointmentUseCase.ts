import { CanceledAppointment } from '@/domain/entities/appointment'
import {
  AppointmentsGateway,
  CancelAppointmentInput,
} from '@/domain/ports/AppointmentsGateway'
import { z } from 'zod'

const cancelAppointmentSchema = z.object({
  appointmentId: z.string().trim().min(1, 'Informe o agendamento.'),
  reason: z.string().trim().min(1, 'Informe o motivo do cancelamento.'),
})

class CancelAppointmentUseCase {
  constructor(private readonly appointmentsGateway: AppointmentsGateway) {}

  async execute(input: CancelAppointmentInput): Promise<CanceledAppointment> {
    const parseResult = cancelAppointmentSchema.safeParse(input)

    if (!parseResult.success) {
      throw new Error(parseResult.error.issues[0].message)
    }

    return this.appointmentsGateway.cancel(parseResult.data)
  }
}

export { CancelAppointmentUseCase }
