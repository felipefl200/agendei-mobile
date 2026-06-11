import { useQuery } from '@tanstack/react-query'
import { listSpecialtiesUseCase } from '@/infra/factories/specialtiesUseCases'
import { queryKeys } from '@/infra/query/queryKeys'

function useSpecialties() {
  return useQuery({
    queryKey: queryKeys.specialties.list(),
    queryFn: () => listSpecialtiesUseCase.execute(),
  })
}

export { useSpecialties }
