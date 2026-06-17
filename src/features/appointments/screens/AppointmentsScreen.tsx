import { Alert, FlatList, Text, View } from 'react-native'
import AppointmentListCard from '@/components/appointments/appointment-list-card'
import AppointmentsTabs from '@/components/appointments/appointments-tabs'
import { Screen } from '@/components/screen'
import { useAppointmentsViewModel } from '@/features/appointments/view-models/useAppointmentsViewModel'
import { styles } from './AppointmentsScreen.styles'
import { SPACING } from '@/constants/theme'

function AppointmentsScreen() {
  const vm = useAppointmentsViewModel()

  function handleCancel(appointmentId: string) {
    Alert.alert('Cancelar consulta', 'Tem certeza que deseja cancelar esta consulta?', [
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
            Alert.alert(
              'Não foi possível cancelar',
              error instanceof Error ? error.message : 'Erro desconhecido'
            )
          }
        },
      },
    ])
  }

  function renderHeader() {
    return (
      <View>
        <View style={styles.header}>
          <View style={styles.menuButton} />
          <Text style={styles.headerTitle}>Minhas consultas</Text>
          <View style={styles.headerSpacer} />
        </View>

        <AppointmentsTabs activeTab={vm.activeTab} onChangeTab={vm.setActiveTab} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{vm.sectionTitle}</Text>
        </View>
      </View>
    )
  }

  return (
    <Screen>
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.content}
          data={vm.appointments}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={renderHeader}
          ListEmptyComponent={
            vm.loading ? (
              <Text style={styles.stateText}>Carregando consultas...</Text>
            ) : vm.error ? (
              <Text style={styles.stateText}>{vm.error}</Text>
            ) : (
              <Text style={styles.stateText}>{vm.emptyMessage}</Text>
            )
          }
          ItemSeparatorComponent={() => <View style={{ height: SPACING[4] }} />}
          renderItem={({ item: appointment }) => (
            <AppointmentListCard
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
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </Screen>
  )
}

export default AppointmentsScreen
