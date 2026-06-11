import { AppointmentSummary } from '@/domain/entities/appointment'

const MONTHS = [
  'JAN',
  'FEV',
  'MAR',
  'ABR',
  'MAI',
  'JUN',
  'JUL',
  'AGO',
  'SET',
  'OUT',
  'NOV',
  'DEZ',
]

const WEEKDAYS = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
]

function parseDateString(date: string) {
  const [year, month, day] = date.split('-').map(Number)

  return new Date(year, month - 1, day)
}

function getAppointmentDateParts(date: string) {
  const parsedDate = parseDateString(date)

  return {
    day: String(parsedDate.getDate()).padStart(2, '0'),
    month: MONTHS[parsedDate.getMonth()],
    shortDate: `${String(parsedDate.getDate()).padStart(2, '0')} ${
      MONTHS[parsedDate.getMonth()]
    }`,
    weekday: WEEKDAYS[parsedDate.getDay()],
  }
}

function toAppointmentListItem(appointment: AppointmentSummary) {
  const dateParts = getAppointmentDateParts(appointment.date)

  return {
    ...dateParts,
    clinic: appointment.clinicName,
    doctorName: appointment.doctorName,
    specialty: appointment.specialtyName,
    status: appointment.status,
    time: appointment.startTime,
  }
}

export { getAppointmentDateParts, toAppointmentListItem }
