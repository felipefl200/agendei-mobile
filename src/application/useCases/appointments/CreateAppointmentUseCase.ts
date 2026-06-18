import { AppointmentDetails } from '@/domain/entities/appointment'
import {
  AppointmentsGateway,
  CreateAppointmentInput,
} from '@/domain/ports/AppointmentsGateway'
import { z } from 'zod'

const createAppointmentSchema = z.object({
  doctorId: z.string().trim().min(1, 'Informe o médico.'),
  specialtyId: z.string().trim().min(1, 'Informe a especialidade.'),
  clinicId: z.string().trim().min(1, 'Informe a clínica.'),
  date: z.string().trim().min(1, 'Informe a data.'),
  startTime: z.string().trim().min(1, 'Informe o horário.'),
})

class CreateAppointmentUseCase {
  constructor(private readonly appointmentsGateway: AppointmentsGateway) {}

  async execute(input: CreateAppointmentInput): Promise<AppointmentDetails> {
    const parseResult = createAppointmentSchema.safeParse(input)

    if (!parseResult.success) {
      throw new Error(parseResult.error.issues[0].message)
    }

    return this.appointmentsGateway.create(parseResult.data)
  }
}

export { CreateAppointmentUseCase }
