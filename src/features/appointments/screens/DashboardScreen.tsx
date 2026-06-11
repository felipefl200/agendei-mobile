import { ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import AppointmentCard from '@/components/dashboard/appointment-card'
import FeatureTile from '@/components/dashboard/feature-tile'
import SectionHeader from '@/components/dashboard/section-header'
import Icon from '@/components/icon/icon'
import { COLORS } from '@/constants/theme'
import { useDashboardViewModel } from '@/features/appointments/view-models/useDashboardViewModel'
import { styles } from './DashboardScreen.styles'

function DashboardScreen() {
  const vm = useDashboardViewModel()

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
            <Text style={styles.greetingTitle}>Olá, {vm.userName}!</Text>
            <Text style={styles.greetingSubtitle}>Como podemos cuidar de você hoje?</Text>
          </View>

          {vm.nextAppointmentLoading ? (
            <Text style={styles.stateText}>Carregando próxima consulta...</Text>
          ) : vm.nextAppointment ? (
            <AppointmentCard
              clinic={vm.nextAppointment.clinic}
              date={vm.nextAppointment.date}
              doctorName={vm.nextAppointment.doctorName}
              specialty={vm.nextAppointment.specialty}
              time={vm.nextAppointment.time}
              weekday={vm.nextAppointment.weekday}
            />
          ) : (
            <Text style={styles.stateText}>Você ainda não tem consultas próximas.</Text>
          )}

          <View style={styles.section}>
            <SectionHeader actionLabel="Ver todas" title="Especialidades" />
            <View style={styles.specialtiesGrid}>
              {vm.specialties.map((specialty) => (
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
              {vm.quickActions.map((action) => (
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

export default DashboardScreen
