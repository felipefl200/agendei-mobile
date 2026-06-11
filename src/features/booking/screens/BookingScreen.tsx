import { Pressable, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import BookingCalendar from '@/components/booking/booking-calendar'
import BookingDoctorSummary from '@/components/booking/booking-doctor-summary'
import BookingSecureNote from '@/components/booking/booking-secure-note'
import TimeSlotGrid from '@/components/booking/time-slot-grid'
import Button from '@/components/button/button'
import Icon from '@/components/icon/icon'
import { COLORS } from '@/constants/theme'
import { useBookingViewModel } from '@/features/booking/view-models/useBookingViewModel'
import { styles } from './BookingScreen.styles'

function BookingScreen() {
  const vm = useBookingViewModel()
  const availableTimes = vm.slots
    .filter((slot) => slot.available)
    .map((slot) => slot.time)

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
            onPress={vm.handleBack}
            style={styles.backButton}
          >
            <Icon color={COLORS.primaryDark} name="arrowLeft" size="md" />
          </Pressable>
          <Text style={styles.headerTitle}>Agendar consulta</Text>
          <View style={styles.headerSpacer} />
        </View>

        {!vm.hasDoctorParam ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>Escolha um médico</Text>
            <Text style={styles.stateText}>
              Selecione um profissional na busca para ver datas e horários disponíveis.
            </Text>
            <Button onPress={vm.handleGoToSearch}>Buscar médicos</Button>
          </View>
        ) : vm.doctorLoading ? (
          <Text style={styles.stateText}>Carregando médico...</Text>
        ) : !vm.selectedDoctor ? (
          <Text style={styles.stateText}>
            {vm.error ?? 'Não foi possível carregar este médico.'}
          </Text>
        ) : (
          <>
            <BookingDoctorSummary
              clinic={vm.selectedDoctor.clinic.name}
              name={vm.selectedDoctor.name}
              specialty={vm.selectedDoctor.specialty.name}
            />

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Selecione a data</Text>
              <BookingCalendar
                selectedDate={vm.selectedDate}
                onSelectDate={vm.handleSelectDate}
              />
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Horários disponíveis</Text>
              {vm.slotsLoading ? (
                <Text style={styles.stateText}>Carregando horários...</Text>
              ) : vm.error && availableTimes.length === 0 ? (
                <Text style={styles.stateText}>{vm.error}</Text>
              ) : availableTimes.length === 0 ? (
                <Text style={styles.stateText}>Nenhum horário disponível para esta data.</Text>
              ) : (
                <TimeSlotGrid
                  onSelectTime={vm.handleSelectSlot}
                  selectedTime={vm.selectedSlot}
                  times={availableTimes}
                />
              )}
            </View>

            {vm.error && availableTimes.length > 0 ? (
              <Text style={styles.formError}>{vm.error}</Text>
            ) : null}

            <Button
              disabled={vm.confirmDisabled}
              onPress={vm.handleConfirm}
              style={[
                styles.confirmButton,
                vm.confirmDisabled ? styles.buttonDisabled : null,
              ]}
            >
              {vm.submitting ? 'Confirmando...' : 'Confirmar agendamento'}
            </Button>
            <BookingSecureNote />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

export default BookingScreen
