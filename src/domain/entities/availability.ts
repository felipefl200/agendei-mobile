interface AvailableSlot {
  time: string
  available: boolean
}

interface DoctorAvailability {
  doctorId: string
  clinicId: string
  date: string
  slots: AvailableSlot[]
}

export type { AvailableSlot, DoctorAvailability }
