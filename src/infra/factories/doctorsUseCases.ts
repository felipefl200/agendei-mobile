import {
  GetDoctorAvailabilityUseCase,
  GetDoctorUseCase,
  ListDoctorsUseCase,
} from '@/application/useCases/doctors'
import { ApiDoctorAvailabilityAdapter } from '@/infra/adapters/ApiDoctorAvailabilityAdapter'
import { ApiDoctorsAdapter } from '@/infra/adapters/ApiDoctorsAdapter'

const apiDoctorsAdapter = new ApiDoctorsAdapter()
const apiDoctorAvailabilityAdapter = new ApiDoctorAvailabilityAdapter()

const getDoctorAvailabilityUseCase = new GetDoctorAvailabilityUseCase(
  apiDoctorAvailabilityAdapter,
)
const getDoctorUseCase = new GetDoctorUseCase(apiDoctorsAdapter)
const listDoctorsUseCase = new ListDoctorsUseCase(apiDoctorsAdapter)

export { getDoctorAvailabilityUseCase, getDoctorUseCase, listDoctorsUseCase }
