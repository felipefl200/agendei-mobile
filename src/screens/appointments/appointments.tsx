import { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import AppointmentListCard, {
  AppointmentListCardProps,
} from '@/components/appointments/appointment-list-card'
import AppointmentsTabs, { AppointmentTab } from '@/components/appointments/appointments-tabs'
import BottomNavigation, { BottomNavigationItem } from '@/components/dashboard/bottom-navigation'
import Icon from '@/components/icon/icon'
import { COLORS } from '@/constants/theme'
import { styles } from './appointments.styles'

const upcomingAppointments: AppointmentListCardProps[] = [
  {
    day: '20',
    month: 'MAI',
    doctorName: 'Dra. Juliana Martins',
    specialty: 'Clínica Geral',
    time: '10:30',
    clinic: 'Clínica Saúde & Vida',
    status: 'confirmed',
  },
  {
    day: '03',
    month: 'JUN',
    doctorName: 'Dr. Rafael Souza',
    specialty: 'Cardiologia',
    time: '14:00',
    clinic: 'Cardio Center',
    status: 'scheduled',
  },
  {
    day: '17',
    month: 'JUN',
    doctorName: 'Dra. Camila Lemos',
    specialty: 'Pediatria',
    time: '09:00',
    clinic: 'Clínica Saúde & Vida',
    status: 'scheduled',
  },
]

const historyAppointments: AppointmentListCardProps[] = [
  {
    day: '12',
    month: 'ABR',
    doctorName: 'Dra. Beatriz Nunes',
    specialty: 'Ginecologia',
    time: '10:00',
    clinic: 'Clínica Feminina',
    status: 'completed',
    variant: 'past',
  },
]

const bottomNavigationItems: BottomNavigationItem[] = [
  { key: 'home', label: 'Início', icon: 'home' },
  { key: 'search', label: 'Buscar', icon: 'search' },
  { key: 'appointments', label: 'Consultas', icon: 'calendarDays' },
  { key: 'messages', label: 'Mensagens', icon: 'messageCircle' },
  { key: 'profile', label: 'Perfil', icon: 'user' },
]

function Appointments() {
  const [activeTab, setActiveTab] = useState<AppointmentTab>('upcoming')
  const appointments = activeTab === 'upcoming' ? upcomingAppointments : historyAppointments

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <View style={styles.menuButton}>
              <Icon color={COLORS.primaryDark} name="menu" size="md" />
            </View>
            <Text style={styles.headerTitle}>Minhas consultas</Text>
            <View style={styles.headerSpacer} />
          </View>

          <AppointmentsTabs activeTab={activeTab} onChangeTab={setActiveTab} />

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {activeTab === 'upcoming' ? 'Próximas consultas' : 'Histórico'}
            </Text>

            <View style={styles.list}>
              {appointments.map((appointment) => (
                <AppointmentListCard
                  key={`${appointment.day}-${appointment.month}-${appointment.doctorName}`}
                  {...appointment}
                />
              ))}
            </View>
          </View>
        </ScrollView>

        <BottomNavigation activeKey="appointments" items={bottomNavigationItems} />
      </View>
    </SafeAreaView>
  )
}

export default Appointments
