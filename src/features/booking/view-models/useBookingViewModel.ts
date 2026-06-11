import { useLocalSearchParams, useRouter } from 'expo-router'
import { useMemo, useState } from 'react'
import { Doctor } from '@/domain/entities/doctor'
import { Specialty } from '@/domain/entities/specialty'
import { useCreateAppointment } from '@/features/booking/hooks/useCreateAppointment'
import { useDoctorAvailability } from '@/features/booking/hooks/useDoctorAvailability'
import { useDoctor, useDoctors } from '@/features/shared/hooks/useDoctors'
import { useSpecialties } from '@/features/shared/hooks/useSpecialties'
import { getTodayDateString } from '@/utils/date'
import { getAppointmentErrorMessage } from '@/utils/getAppointmentErrorMessage'

type BookingStep = 'doctor' | 'date' | 'slot' | 'confirmation'

interface BookingSlot {
  time: string
  available: boolean
}

/**
 * ViewModel da tela de Agendamento.
 * Orquestra especialidades, medicos, disponibilidade e criacao de consulta.
 */
interface BookingViewModel {
  step: BookingStep
  specialties: Specialty[]
  doctors: Doctor[]
  slots: BookingSlot[]
  selectedSpecialty: Specialty | null
  selectedDoctor: Doctor | null
  selectedDate: string
  selectedSlot: string
  loading: boolean
  doctorLoading: boolean
  slotsLoading: boolean
  submitting: boolean
  error: string | null
  hasDoctorParam: boolean
  confirmDisabled: boolean
  handleBack: () => void
  handleGoToSearch: () => void
  handleSelectSpecialty: (specialty: Specialty | null) => void
  handleSelectDoctor: (doctor: Doctor) => void
  handleSelectDate: (date: string) => void
  handleSelectSlot: (slot: string) => void
  handleConfirm: () => Promise<void>
}

function getParamValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value
}

function useBookingViewModel(): BookingViewModel {
  const router = useRouter()
  const params = useLocalSearchParams<{ doctorId?: string }>()
  const doctorId = getParamValue(params.doctorId)
  const [selectedSpecialty, setSelectedSpecialty] = useState<Specialty | null>(null)
  const [selectedDoctorState, setSelectedDoctorState] = useState<Doctor | null>(null)
  const [selectedDate, setSelectedDate] = useState(getTodayDateString())
  const [selectedSlotState, setSelectedSlotState] = useState('')
  const [error, setError] = useState<string | null>(null)
  const specialtiesQuery = useSpecialties()
  const doctorsQuery = useDoctors({
    page: 1,
    perPage: 20,
    specialtyId: selectedSpecialty?.id,
  })
  const doctorQuery = useDoctor(doctorId)
  const selectedDoctor = doctorQuery.data ?? selectedDoctorState
  const availabilityQuery = useDoctorAvailability(
    selectedDoctor
      ? {
          clinicId: selectedDoctor.clinic.id,
          date: selectedDate,
          doctorId: selectedDoctor.id,
        }
      : undefined,
  )
  const createAppointmentMutation = useCreateAppointment()
  const slots = useMemo(() => availabilityQuery.data?.slots ?? [], [availabilityQuery.data?.slots])
  const availableSlots = useMemo(
    () => slots.filter((slot) => slot.available).map((slot) => slot.time),
    [slots],
  )
  const selectedSlot = availableSlots.includes(selectedSlotState) ? selectedSlotState : ''
  const step: BookingStep = !selectedDoctor
    ? 'doctor'
    : !selectedDate
      ? 'date'
      : !selectedSlot
        ? 'slot'
        : 'confirmation'

  function handleSelectSpecialty(specialty: Specialty | null) {
    setError(null)
    setSelectedSpecialty(specialty)
  }

  function handleSelectDoctor(doctor: Doctor) {
    setError(null)
    setSelectedDoctorState(doctor)
  }

  function handleSelectDate(date: string) {
    setError(null)
    setSelectedSlotState('')
    setSelectedDate(date)
  }

  function handleSelectSlot(slot: string) {
    setError(null)
    setSelectedSlotState(slot)
  }

  async function handleConfirm() {
    if (!selectedDoctor) {
      setError('Escolha um médico para agendar.')
      return
    }

    if (!selectedSlot) {
      setError('Escolha um horário disponível.')
      return
    }

    setError(null)

    try {
      await createAppointmentMutation.mutateAsync({
        clinicId: selectedDoctor.clinic.id,
        date: selectedDate,
        doctorId: selectedDoctor.id,
        specialtyId: selectedDoctor.specialty.id,
        startTime: selectedSlot,
      })
      router.replace('/appointments')
    } catch (mutationError) {
      setError(getAppointmentErrorMessage(mutationError))
    }
  }

  return {
    step,
    specialties: specialtiesQuery.data ?? [],
    doctors: doctorsQuery.data?.doctors ?? [],
    slots,
    selectedSpecialty,
    selectedDoctor,
    selectedDate,
    selectedSlot,
    loading: specialtiesQuery.isLoading || doctorsQuery.isLoading,
    doctorLoading: doctorQuery.isLoading,
    slotsLoading: availabilityQuery.isLoading,
    submitting: createAppointmentMutation.isPending,
    error:
      error ??
      (doctorQuery.isError
        ? 'Não foi possível carregar este médico.'
        : availabilityQuery.isError
          ? 'Não foi possível carregar os horários.'
          : null),
    hasDoctorParam: Boolean(doctorId),
    confirmDisabled: !selectedSlot || createAppointmentMutation.isPending,
    handleBack: router.back,
    handleGoToSearch: () => router.push('/search'),
    handleSelectSpecialty,
    handleSelectDoctor,
    handleSelectDate,
    handleSelectSlot,
    handleConfirm,
  }
}

export type { BookingSlot, BookingStep, BookingViewModel }
export { useBookingViewModel }
