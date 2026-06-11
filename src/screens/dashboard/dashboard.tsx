import { ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import AppointmentCard from '@/components/dashboard/appointment-card'
import FeatureTile from '@/components/dashboard/feature-tile'
import SectionHeader from '@/components/dashboard/section-header'
import Icon, { IconName } from '@/components/icon/icon'
import { COLORS } from '@/constants/theme'
import { useUpcomingAppointments } from '@/hooks/usePatientAppointments'
import { useAuthStore } from '@/store/useAuthStore'
import { getAppointmentDateParts } from '@/utils/appointmentPresentation'
import { styles } from './dashboard.styles'

const specialties: { title: string; icon: IconName; color: string }[] = [
  { title: 'Clínica Geral', icon: 'stethoscope', color: COLORS.primary },
  { title: 'Pediatria', icon: 'baby', color: '#FFAA6B' },
  { title: 'Ginecologia', icon: 'venus', color: '#A16EFF' },
  { title: 'Cardiologia', icon: 'heartPulse', color: COLORS.accent },
]

const quickActions: { title: string; icon: IconName; color: string }[] = [
  { title: 'Agendar', icon: 'calendarDays', color: COLORS.primary },
  { title: 'Buscar médicos', icon: 'userSearch', color: COLORS.secondary },
  { title: 'Exames e procedimentos', icon: 'flaskConical', color: '#7B61FF' },
  { title: 'Convênios', icon: 'creditCard', color: COLORS.secondaryDark },
]

function Dashboard() {
  const user = useAuthStore((state) => state.user)
  const upcomingAppointmentsQuery = useUpcomingAppointments()
  const nextAppointment = upcomingAppointmentsQuery.data?.[0]
  const nextAppointmentDateParts = nextAppointment
    ? getAppointmentDateParts(nextAppointment.date)
    : null

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <View style={styles.iconButton} />
            <View style={styles.notificationButton}>
              <Icon color={COLORS.primaryDark} name="bell" size="md" />
              <View style={styles.notificationDot} />
            </View>
          </View>

          <View style={styles.greeting}>
            <Text style={styles.greetingTitle}>Olá, {user?.name ?? 'paciente'}!</Text>
            <Text style={styles.greetingSubtitle}>Como podemos cuidar de você hoje?</Text>
          </View>

          {upcomingAppointmentsQuery.isLoading ? (
            <Text style={styles.stateText}>Carregando próxima consulta...</Text>
          ) : nextAppointment && nextAppointmentDateParts ? (
            <AppointmentCard
              clinic={nextAppointment.clinicName}
              date={nextAppointmentDateParts.shortDate}
              doctorName={nextAppointment.doctorName}
              specialty={nextAppointment.specialtyName}
              time={nextAppointment.startTime}
              weekday={nextAppointmentDateParts.weekday}
            />
          ) : (
            <Text style={styles.stateText}>Você ainda não tem consultas próximas.</Text>
          )}

          <View style={styles.section}>
            <SectionHeader actionLabel="Ver todas" title="Especialidades" />
            <View style={styles.specialtiesGrid}>
              {specialties.map((specialty) => (
                <FeatureTile
                  key={specialty.title}
                  color={specialty.color}
                  icon={specialty.icon}
                  title={specialty.title}
                />
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <SectionHeader title="Ações rápidas" />
            <View style={styles.quickActionsGrid}>
              {quickActions.map((action) => (
                <FeatureTile
                  key={action.title}
                  color={action.color}
                  compact
                  icon={action.icon}
                  style={styles.quickActionTile}
                  title={action.title}
                />
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default Dashboard
