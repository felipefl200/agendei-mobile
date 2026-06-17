import {
  GetPatientProfileUseCase,
  UpdatePatientPasswordUseCase,
  UpdatePatientProfileUseCase,
} from '@/application/useCases/profile'
import { ApiPatientProfileAdapter } from '@/infra/adapters/ApiPatientProfileAdapter'

const apiPatientProfileAdapter = new ApiPatientProfileAdapter()

const getPatientProfileUseCase = new GetPatientProfileUseCase(apiPatientProfileAdapter)
const updatePatientProfileUseCase = new UpdatePatientProfileUseCase(apiPatientProfileAdapter)
const updatePatientPasswordUseCase = new UpdatePatientPasswordUseCase(apiPatientProfileAdapter)

export {
  getPatientProfileUseCase,
  updatePatientPasswordUseCase,
  updatePatientProfileUseCase,
}
