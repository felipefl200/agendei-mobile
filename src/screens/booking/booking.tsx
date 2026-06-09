import { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import BookingCalendar from '@/components/booking/booking-calendar'
import BookingDoctorSummary from '@/components/booking/booking-doctor-summary'
import BookingSecureNote from '@/components/booking/booking-secure-note'
import TimeSlotGrid from '@/components/booking/time-slot-grid'
import Button from '@/components/button/button'
import Icon from '@/components/icon/icon'
import { COLORS } from '@/constants/theme'
import { styles } from './booking.styles'

const availableTimes = [
  '08:00',
  '08:30',
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
]

function Booking() {
  const [selectedDate, setSelectedDate] = useState('2025-05-20')
  const [selectedTime, setSelectedTime] = useState('10:30')

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        style={styles.container}
      >
        <View style={styles.header}>
          <View style={styles.backButton}>
            <Icon color={COLORS.primaryDark} name="arrowLeft" size="md" />
          </View>
          <Text style={styles.headerTitle}>Agendar consulta</Text>
          <View style={styles.headerSpacer} />
        </View>

        <BookingDoctorSummary
          clinic="Clínica Saúde & Vida"
          name="Dra. Juliana Martins"
          rating="4,9"
          reviews={128}
          specialty="Clínica Geral"
        />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Selecione a data</Text>
          <BookingCalendar selectedDate={selectedDate} onSelectDate={setSelectedDate} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Horários disponíveis</Text>
          <TimeSlotGrid
            onSelectTime={setSelectedTime}
            selectedTime={selectedTime}
            times={availableTimes}
          />
        </View>

        <Button style={styles.confirmButton}>Confirmar agendamento</Button>
        <BookingSecureNote />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Booking
