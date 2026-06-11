import { useQuery } from '@tanstack/react-query'
import { GetDoctorAvailabilityInput } from '@/domain/ports/DoctorAvailabilityGateway'
import { getDoctorAvailabilityUseCase } from '@/infra/factories/doctorsUseCases'
import { queryKeys } from '@/infra/query/queryKeys'

function useDoctorAvailability(input?: GetDoctorAvailabilityInput) {
  return useQuery({
    enabled: Boolean(input?.doctorId && input.clinicId && input.date),
    queryKey: input
      ? queryKeys.doctors.availability(input)
      : [...queryKeys.doctors.all, 'availability'],
    queryFn: () => getDoctorAvailabilityUseCase.execute(input as GetDoctorAvailabilityInput),
  })
}

export { useDoctorAvailability }
