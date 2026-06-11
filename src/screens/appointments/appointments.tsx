import { useState } from 'react'
import { Alert, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import AppointmentListCard from '@/components/appointments/appointment-list-card'
import AppointmentsTabs, { AppointmentTab } from '@/components/appointments/appointments-tabs'
import {
  useAppointmentsHistory,
  useCancelAppointment,
  useUpcomingAppointments,
} from '@/hooks/usePatientAppointments'
import { toAppointmentListItem } from '@/utils/appointmentPresentation'
import { getCancelAppointmentErrorMessage } from '@/utils/getCancelAppointmentErrorMessage'
import { styles } from './appointments.styles'

function Appointments() {
  const [activeTab, setActiveTab] = useState<AppointmentTab>('upcoming')
  const [cancelingAppointmentId, setCancelingAppointmentId] = useState<string | null>(null)
  const upcomingAppointmentsQuery = useUpcomingAppointments()
  const appointmentsHistoryQuery = useAppointmentsHistory()
  const cancelAppointmentMutation = useCancelAppointment()
  const isUpcomingTab = activeTab === 'upcoming'
  const activeQuery = isUpcomingTab ? upcomingAppointmentsQuery : appointmentsHistoryQuery
  const appointments = activeQuery.data ?? []

  function cancelAppointment(appointmentId: string) {
    setCancelingAppointmentId(appointmentId)
    cancelAppointmentMutation.mutate(
      {
        appointmentId,
        reason: 'Cancelado pelo paciente',
      },
      {
        onError: (error) => {
          Alert.alert('Não foi possível cancelar', getCancelAppointmentErrorMessage(error))
        },
        onSettled: () => {
          setCancelingAppointmentId(null)
        },
      },
    )
  }

  function handleCancelAppointment(appointmentId: string) {
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
          onPress: () => cancelAppointment(appointmentId),
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

          <AppointmentsTabs activeTab={activeTab} onChangeTab={setActiveTab} />

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {activeTab === 'upcoming' ? 'Próximas consultas' : 'Histórico'}
            </Text>

            <View style={styles.list}>
              {activeQuery.isLoading ? (
                <Text style={styles.stateText}>Carregando consultas...</Text>
              ) : activeQuery.isError ? (
                <Text style={styles.stateText}>Não foi possível carregar suas consultas.</Text>
              ) : appointments.length === 0 ? (
                <Text style={styles.stateText}>
                  {isUpcomingTab
                    ? 'Você ainda não tem consultas agendadas.'
                    : 'Seu histórico de consultas está vazio.'}
                </Text>
              ) : (
                appointments.map((appointment) => (
                  <AppointmentListCard
                    key={appointment.id}
                    {...toAppointmentListItem(appointment)}
                    isCanceling={cancelingAppointmentId === appointment.id}
                    onCancel={
                      isUpcomingTab
                        ? () => handleCancelAppointment(appointment.id)
                        : undefined
                    }
                    variant={isUpcomingTab ? 'future' : 'past'}
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

export default Appointments
