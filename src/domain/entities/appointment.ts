type AppointmentStatus = 'scheduled' | 'confirmed' | 'completed' | 'canceled' | 'no_show'

interface AppointmentPersonSummary {
  id: string
  name: string
}

interface AppointmentClinicSummary {
  id: string
  name: string
}

interface AppointmentDetails {
  id: string
  doctor: AppointmentPersonSummary
  specialty: AppointmentPersonSummary
  clinic: AppointmentClinicSummary
  date: string
  startTime: string
  endTime: string
  status: AppointmentStatus
}

interface AppointmentSummary {
  id: string
  doctorName: string
  specialtyName: string
  clinicName: string
  date: string
  startTime: string
  status: AppointmentStatus
}

interface CanceledAppointment {
  id: string
  status: Extract<AppointmentStatus, 'canceled'>
  cancelReason: string | null
}

type Appointment = AppointmentDetails | AppointmentSummary | CanceledAppointment

export type {
  Appointment,
  AppointmentClinicSummary,
  AppointmentDetails,
  AppointmentPersonSummary,
  AppointmentStatus,
  AppointmentSummary,
  CanceledAppointment,
}
