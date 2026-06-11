import { IconName } from '@/components/icon/icon'
import { COLORS } from '@/constants/theme'
import { useAuthStore } from '@/store/useAuthStore'
import { getAppointmentDateParts } from '@/utils/appointmentPresentation'
import { getUpcomingAppointmentsUseCase } from '@/infra/factories/appointmentsUseCases'
import { queryKeys } from '@/infra/query/queryKeys'
import { useQuery } from '@tanstack/react-query'

interface DashboardFeatureItem {
  title: string
  icon: IconName
  color: string
}

interface DashboardAppointment {
  doctorName: string
  specialty: string
  date: string
  weekday: string
  time: string
  clinic: string
}

/**
 * ViewModel da tela de Dashboard.
 * Centraliza saudacao, proxima consulta e atalhos exibidos no resumo inicial.
 */
interface DashboardViewModel {
  userName: string
  nextAppointment: DashboardAppointment | null
  nextAppointmentLoading: boolean
  specialties: DashboardFeatureItem[]
  quickActions: DashboardFeatureItem[]
}

const specialties: DashboardFeatureItem[] = [
  { title: 'Clínica Geral', icon: 'stethoscope', color: COLORS.primary },
  { title: 'Pediatria', icon: 'baby', color: '#FFAA6B' },
  { title: 'Ginecologia', icon: 'venus', color: '#A16EFF' },
  { title: 'Cardiologia', icon: 'heartPulse', color: COLORS.accent },
]

const quickActions: DashboardFeatureItem[] = [
  { title: 'Agendar', icon: 'calendarDays', color: COLORS.primary },
  { title: 'Buscar médicos', icon: 'userSearch', color: COLORS.secondary },
  { title: 'Exames e procedimentos', icon: 'flaskConical', color: '#7B61FF' },
  { title: 'Convênios', icon: 'creditCard', color: COLORS.secondaryDark },
]

function useDashboardViewModel(): DashboardViewModel {
  const user = useAuthStore((state) => state.user)
  const upcomingAppointmentsQuery = useQuery({
    queryKey: queryKeys.appointments.upcoming(),
    queryFn: () => getUpcomingAppointmentsUseCase.execute(),
  })
  const nextAppointment = upcomingAppointmentsQuery.data?.[0]
  const nextAppointmentDateParts = nextAppointment
    ? getAppointmentDateParts(nextAppointment.date)
    : null

  return {
    userName: user?.name ?? 'paciente',
    nextAppointment:
      nextAppointment && nextAppointmentDateParts
        ? {
            clinic: nextAppointment.clinicName,
            date: nextAppointmentDateParts.shortDate,
            doctorName: nextAppointment.doctorName,
            specialty: nextAppointment.specialtyName,
            time: nextAppointment.startTime,
            weekday: nextAppointmentDateParts.weekday,
          }
        : null,
    nextAppointmentLoading: upcomingAppointmentsQuery.isLoading,
    specialties,
    quickActions,
  }
}

export type { DashboardAppointment, DashboardFeatureItem, DashboardViewModel }
export { useDashboardViewModel }
