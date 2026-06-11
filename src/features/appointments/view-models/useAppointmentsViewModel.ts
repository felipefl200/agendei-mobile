import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AppointmentTab } from '@/components/appointments/appointments-tabs'
import { AppointmentStatus } from '@/components/appointments/appointment-status-badge'
import {
  cancelAppointmentUseCase,
  getAppointmentsHistoryUseCase,
  getUpcomingAppointmentsUseCase,
} from '@/infra/factories/appointmentsUseCases'
import { queryKeys } from '@/infra/query/queryKeys'
import { toAppointmentListItem } from '@/utils/appointmentPresentation'
import { getCancelAppointmentErrorMessage } from '@/utils/getCancelAppointmentErrorMessage'
import { useState } from 'react'

interface AppointmentViewItem {
  id: string
  day: string
  month: string
  doctorName: string
  specialty: string
  time: string
  clinic: string
  status: AppointmentStatus
  variant: 'future' | 'past'
  isCanceling: boolean
}

/**
 * ViewModel da tela de Consultas.
 * Centraliza abas, listagem, estados de carregamento e cancelamento de consultas.
 */
interface AppointmentsViewModel {
  activeTab: AppointmentTab
  appointments: AppointmentViewItem[]
  sectionTitle: string
  emptyMessage: string
  loading: boolean
  refreshing: boolean
  error: string | null
  setActiveTab: (tab: AppointmentTab) => void
  cancelAppointment: (appointmentId: string) => Promise<void>
  handleRefresh: () => Promise<void>
}

function useAppointmentsViewModel(): AppointmentsViewModel {
  const [activeTab, setActiveTab] = useState<AppointmentTab>('upcoming')
  const [cancelingAppointmentId, setCancelingAppointmentId] = useState<string | null>(null)
  const queryClient = useQueryClient()
  const upcomingAppointmentsQuery = useQuery({
    queryKey: queryKeys.appointments.upcoming(),
    queryFn: () => getUpcomingAppointmentsUseCase.execute(),
  })
  const appointmentsHistoryQuery = useQuery({
    queryKey: queryKeys.appointments.history(),
    queryFn: () => getAppointmentsHistoryUseCase.execute(),
  })
  const cancelAppointmentMutation = useMutation({
    mutationFn: (appointmentId: string) =>
      cancelAppointmentUseCase.execute({
        appointmentId,
        reason: 'Cancelado pelo paciente',
      }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.appointments.upcoming() })
      void queryClient.invalidateQueries({ queryKey: queryKeys.appointments.history() })
    },
  })
  const isUpcomingTab = activeTab === 'upcoming'
  const activeQuery = isUpcomingTab ? upcomingAppointmentsQuery : appointmentsHistoryQuery
  const appointmentVariant: AppointmentViewItem['variant'] = isUpcomingTab ? 'future' : 'past'
  const appointments = (activeQuery.data ?? []).map((appointment) => ({
    id: appointment.id,
    ...toAppointmentListItem(appointment),
    isCanceling: cancelingAppointmentId === appointment.id,
    variant: appointmentVariant,
  }))

  async function cancelAppointment(appointmentId: string) {
    setCancelingAppointmentId(appointmentId)
    try {
      await cancelAppointmentMutation.mutateAsync(appointmentId)
    } catch (error) {
      throw new Error(getCancelAppointmentErrorMessage(error))
    } finally {
      setCancelingAppointmentId(null)
    }
  }

  async function handleRefresh() {
    await activeQuery.refetch()
  }

  return {
    activeTab,
    appointments,
    sectionTitle: isUpcomingTab ? 'Próximas consultas' : 'Histórico',
    emptyMessage: isUpcomingTab
      ? 'Você ainda não tem consultas agendadas.'
      : 'Seu histórico de consultas está vazio.',
    loading: activeQuery.isLoading,
    refreshing: activeQuery.isFetching && !activeQuery.isLoading,
    error: activeQuery.isError ? 'Não foi possível carregar suas consultas.' : null,
    setActiveTab,
    cancelAppointment,
    handleRefresh,
  }
}

export type { AppointmentViewItem, AppointmentsViewModel }
export { useAppointmentsViewModel }
