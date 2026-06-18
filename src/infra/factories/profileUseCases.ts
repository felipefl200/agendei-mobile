import {
  GetPatientProfileUseCase,
  UpdatePatientAvatarUseCase,
  UpdatePatientPasswordUseCase,
  UpdatePatientProfileUseCase,
} from '@/application/useCases/profile'
import { ApiPatientProfileAdapter } from '@/infra/adapters/ApiPatientProfileAdapter'

const apiPatientProfileAdapter = new ApiPatientProfileAdapter()

const getPatientProfileUseCase = new GetPatientProfileUseCase(apiPatientProfileAdapter)
const updatePatientAvatarUseCase = new UpdatePatientAvatarUseCase(apiPatientProfileAdapter)
const updatePatientProfileUseCase = new UpdatePatientProfileUseCase(apiPatientProfileAdapter)
const updatePatientPasswordUseCase = new UpdatePatientPasswordUseCase(apiPatientProfileAdapter)

export {
  getPatientProfileUseCase,
  updatePatientAvatarUseCase,
  updatePatientPasswordUseCase,
  updatePatientProfileUseCase,
}
