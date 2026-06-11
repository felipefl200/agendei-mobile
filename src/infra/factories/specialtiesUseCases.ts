import { ListSpecialtiesUseCase } from '@/application/useCases/specialties'
import { ApiSpecialtiesAdapter } from '@/infra/adapters/ApiSpecialtiesAdapter'

const apiSpecialtiesAdapter = new ApiSpecialtiesAdapter()

const listSpecialtiesUseCase = new ListSpecialtiesUseCase(apiSpecialtiesAdapter)

export { listSpecialtiesUseCase }
