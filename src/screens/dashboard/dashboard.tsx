import { ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import AppointmentCard from '@/components/dashboard/appointment-card'
import FeatureTile from '@/components/dashboard/feature-tile'
import SectionHeader from '@/components/dashboard/section-header'
import Icon, { IconName } from '@/components/icon/icon'
import { COLORS } from '@/constants/theme'
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
            <Text style={styles.greetingTitle}>Olá, Ana! 👋</Text>
            <Text style={styles.greetingSubtitle}>Como podemos cuidar de você hoje?</Text>
          </View>

          <AppointmentCard
            clinic="Clínica Saúde & Vida"
            date="20 Mai"
            doctorName="Dra. Juliana Martins"
            specialty="Clínica Geral"
            time="10:30"
            weekday="Terça-feira"
          />

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
