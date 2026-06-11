import {
  CancelAppointmentUseCase,
  CreateAppointmentUseCase,
  GetAppointmentsHistoryUseCase,
  GetUpcomingAppointmentsUseCase,
} from '@/application/useCases/appointments'
import { ApiAppointmentsAdapter } from '@/infra/adapters/ApiAppointmentsAdapter'

const apiAppointmentsAdapter = new ApiAppointmentsAdapter()

const cancelAppointmentUseCase = new CancelAppointmentUseCase(apiAppointmentsAdapter)
const createAppointmentUseCase = new CreateAppointmentUseCase(apiAppointmentsAdapter)
const getAppointmentsHistoryUseCase = new GetAppointmentsHistoryUseCase(
  apiAppointmentsAdapter,
)
const getUpcomingAppointmentsUseCase = new GetUpcomingAppointmentsUseCase(
  apiAppointmentsAdapter,
)

export {
  cancelAppointmentUseCase,
  createAppointmentUseCase,
  getAppointmentsHistoryUseCase,
  getUpcomingAppointmentsUseCase,
}
