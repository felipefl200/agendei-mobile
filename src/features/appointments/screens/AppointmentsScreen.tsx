import { Alert, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import AppointmentListCard from '@/components/appointments/appointment-list-card'
import AppointmentsTabs from '@/components/appointments/appointments-tabs'
import { useAppointmentsViewModel } from '@/features/appointments/view-models/useAppointmentsViewModel'
import { styles } from './AppointmentsScreen.styles'

function AppointmentsScreen() {
  const vm = useAppointmentsViewModel()

  function handleCancel(appointmentId: string) {
    Alert.alert(
      'Cancelar consulta',
      'Tem certeza que deseja cancelar esta consulta?',
      [
        {
          text: 'Manter',
          style: 'cancel',
        },
        {
          text: 'Cancelar consulta',
          style: 'destructive',
          onPress: async () => {
            try {
              await vm.cancelAppointment(appointmentId)
            } catch (error) {
              Alert.alert('Não foi possível cancelar', error instanceof Error ? error.message : 'Erro desconhecido')
            }
          },
        },
      ],
    )
  }

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <View style={styles.menuButton} />
            <Text style={styles.headerTitle}>Minhas consultas</Text>
            <View style={styles.headerSpacer} />
          </View>

          <AppointmentsTabs activeTab={vm.activeTab} onChangeTab={vm.setActiveTab} />

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{vm.sectionTitle}</Text>

            <View style={styles.list}>
              {vm.loading ? (
                <Text style={styles.stateText}>Carregando consultas...</Text>
              ) : vm.error ? (
                <Text style={styles.stateText}>{vm.error}</Text>
              ) : vm.appointments.length === 0 ? (
                <Text style={styles.stateText}>{vm.emptyMessage}</Text>
              ) : (
                vm.appointments.map((appointment) => (
                  <AppointmentListCard
                    key={appointment.id}
                    clinic={appointment.clinic}
                    day={appointment.day}
                    doctorName={appointment.doctorName}
                    isCanceling={appointment.isCanceling}
                    month={appointment.month}
                    onCancel={
                      vm.activeTab === 'upcoming'
                        ? () => handleCancel(appointment.id)
                        : undefined
                    }
                    specialty={appointment.specialty}
                    status={appointment.status}
                    time={appointment.time}
                    variant={appointment.variant}
                  />
                ))
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default AppointmentsScreen
