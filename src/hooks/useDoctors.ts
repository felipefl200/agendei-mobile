import { useQuery } from '@tanstack/react-query'
import { ListDoctorsInput } from '@/domain/ports/DoctorsGateway'
import { getDoctorUseCase, listDoctorsUseCase } from '@/infra/factories/doctorsUseCases'
import { queryKeys } from '@/infra/query/queryKeys'

function useDoctors(input?: ListDoctorsInput) {
  return useQuery({
    queryKey: queryKeys.doctors.list(input),
    queryFn: () => listDoctorsUseCase.execute(input),
  })
}

function useDoctor(id?: string) {
  return useQuery({
    enabled: Boolean(id),
    queryKey: queryKeys.doctors.detail(id ?? ''),
    queryFn: () => getDoctorUseCase.execute(id ?? ''),
  })
}

export { useDoctor, useDoctors }
