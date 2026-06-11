import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { CancelAppointmentInput } from '@/domain/ports/AppointmentsGateway'
import {
  cancelAppointmentUseCase,
  getAppointmentsHistoryUseCase,
  getUpcomingAppointmentsUseCase,
} from '@/infra/factories/appointmentsUseCases'
import { queryKeys } from '@/infra/query/queryKeys'

function useUpcomingAppointments() {
  return useQuery({
    queryKey: queryKeys.appointments.upcoming(),
    queryFn: () => getUpcomingAppointmentsUseCase.execute(),
  })
}

function useAppointmentsHistory() {
  return useQuery({
    queryKey: queryKeys.appointments.history(),
    queryFn: () => getAppointmentsHistoryUseCase.execute(),
  })
}

function useCancelAppointment() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: CancelAppointmentInput) => cancelAppointmentUseCase.execute(input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.appointments.upcoming() })
      void queryClient.invalidateQueries({ queryKey: queryKeys.appointments.history() })
    },
  })
}

export { useAppointmentsHistory, useCancelAppointment, useUpcomingAppointments }
