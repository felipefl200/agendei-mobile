import { useLocalSearchParams, useRouter } from 'expo-router'
import { useMemo, useState } from 'react'
import { Pressable, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import BookingCalendar from '@/components/booking/booking-calendar'
import BookingDoctorSummary from '@/components/booking/booking-doctor-summary'
import BookingSecureNote from '@/components/booking/booking-secure-note'
import TimeSlotGrid from '@/components/booking/time-slot-grid'
import Button from '@/components/button/button'
import Icon from '@/components/icon/icon'
import { COLORS } from '@/constants/theme'
import { useCreateAppointment } from '@/hooks/useCreateAppointment'
import { useDoctor } from '@/hooks/useDoctors'
import { useDoctorAvailability } from '@/hooks/useDoctorAvailability'
import { getAppointmentErrorMessage } from '@/utils/getAppointmentErrorMessage'
import { getTodayDateString } from '@/utils/date'
import { styles } from './booking.styles'

function getParamValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value
}

function Booking() {
  const router = useRouter()
  const params = useLocalSearchParams<{ doctorId?: string }>()
  const doctorId = getParamValue(params.doctorId)
  const [selectedDate, setSelectedDate] = useState(getTodayDateString())
  const [selectedTime, setSelectedTime] = useState('')
  const [formError, setFormError] = useState<string | null>(null)
  const doctorQuery = useDoctor(doctorId)
  const doctor = doctorQuery.data
  const availabilityQuery = useDoctorAvailability(
    doctor
      ? {
          clinicId: doctor.clinic.id,
          date: selectedDate,
          doctorId: doctor.id,
        }
      : undefined,
  )
  const createAppointmentMutation = useCreateAppointment()
  const availableTimes = useMemo(
    () =>
      (availabilityQuery.data?.slots ?? [])
        .filter((slot) => slot.available)
        .map((slot) => slot.time),
    [availabilityQuery.data?.slots],
  )
  const selectedAvailableTime = availableTimes.includes(selectedTime) ? selectedTime : ''
  const isSubmitting = createAppointmentMutation.isPending

  function handleSelectDate(date: string) {
    setFormError(null)
    setSelectedTime('')
    setSelectedDate(date)
  }

  async function handleConfirmAppointment() {
    if (!doctor) {
      setFormError('Escolha um médico para agendar.')
      return
    }

    if (!selectedAvailableTime) {
      setFormError('Escolha um horário disponível.')
      return
    }

    setFormError(null)

    try {
      await createAppointmentMutation.mutateAsync({
        clinicId: doctor.clinic.id,
        date: selectedDate,
        doctorId: doctor.id,
        specialtyId: doctor.specialty.id,
        startTime: selectedAvailableTime,
      })
      router.replace('/appointments')
    } catch (error) {
      setFormError(getAppointmentErrorMessage(error))
    }
  }

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        style={styles.container}
      >
        <View style={styles.header}>
          <Pressable
            accessibilityRole="button"
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Icon color={COLORS.primaryDark} name="arrowLeft" size="md" />
          </Pressable>
          <Text style={styles.headerTitle}>Agendar consulta</Text>
          <View style={styles.headerSpacer} />
        </View>

        {!doctorId ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>Escolha um médico</Text>
            <Text style={styles.stateText}>
              Selecione um profissional na busca para ver datas e horários disponíveis.
            </Text>
            <Button onPress={() => router.push('/search')}>Buscar médicos</Button>
          </View>
        ) : doctorQuery.isLoading ? (
          <Text style={styles.stateText}>Carregando médico...</Text>
        ) : doctorQuery.isError || !doctor ? (
          <Text style={styles.stateText}>Não foi possível carregar este médico.</Text>
        ) : (
          <>
            <BookingDoctorSummary
              clinic={doctor.clinic.name}
              name={doctor.name}
              specialty={doctor.specialty.name}
            />

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Selecione a data</Text>
              <BookingCalendar selectedDate={selectedDate} onSelectDate={handleSelectDate} />
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Horários disponíveis</Text>
              {availabilityQuery.isLoading ? (
                <Text style={styles.stateText}>Carregando horários...</Text>
              ) : availabilityQuery.isError ? (
                <Text style={styles.stateText}>Não foi possível carregar os horários.</Text>
              ) : availableTimes.length === 0 ? (
                <Text style={styles.stateText}>Nenhum horário disponível para esta data.</Text>
              ) : (
                <TimeSlotGrid
                  onSelectTime={(time) => {
                    setFormError(null)
                    setSelectedTime(time)
                  }}
                  selectedTime={selectedAvailableTime}
                  times={availableTimes}
                />
              )}
            </View>

            {formError ? <Text style={styles.formError}>{formError}</Text> : null}

            <Button
              disabled={!selectedAvailableTime || isSubmitting}
              onPress={handleConfirmAppointment}
              style={[
                styles.confirmButton,
                !selectedAvailableTime || isSubmitting ? styles.buttonDisabled : null,
              ]}
            >
              {isSubmitting ? 'Confirmando...' : 'Confirmar agendamento'}
            </Button>
            <BookingSecureNote />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

export default Booking
