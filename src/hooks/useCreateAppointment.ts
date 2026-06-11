import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CreateAppointmentInput } from '@/domain/ports/AppointmentsGateway'
import { createAppointmentUseCase } from '@/infra/factories/appointmentsUseCases'
import { queryKeys } from '@/infra/query/queryKeys'

function useCreateAppointment() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: CreateAppointmentInput) => createAppointmentUseCase.execute(input),
    onSuccess: (_appointment, input) => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.appointments.upcoming() })
      void queryClient.invalidateQueries({ queryKey: queryKeys.appointments.history() })
      void queryClient.invalidateQueries({
        queryKey: queryKeys.doctors.availability({
          clinicId: input.clinicId,
          date: input.date,
          doctorId: input.doctorId,
        }),
      })
    },
  })
}

export { useCreateAppointment }
