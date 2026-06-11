import { CreateAppointmentUseCase } from '@/application/useCases/appointments'
import { ApiAppointmentsAdapter } from '@/infra/adapters/ApiAppointmentsAdapter'

const apiAppointmentsAdapter = new ApiAppointmentsAdapter()

const createAppointmentUseCase = new CreateAppointmentUseCase(apiAppointmentsAdapter)

export { createAppointmentUseCase }
