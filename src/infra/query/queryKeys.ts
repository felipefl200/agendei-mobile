import { ListDoctorsInput } from '@/domain/ports/DoctorsGateway'
import { GetDoctorAvailabilityInput } from '@/domain/ports/DoctorAvailabilityGateway'

const queryKeys = {
  appointments: {
    all: ['appointments'] as const,
    history: () => [...queryKeys.appointments.all, 'history'] as const,
    upcoming: () => [...queryKeys.appointments.all, 'upcoming'] as const,
  },
  doctors: {
    all: ['doctors'] as const,
    availability: (input: GetDoctorAvailabilityInput) =>
      [...queryKeys.doctors.all, 'availability', input] as const,
    detail: (id: string) => [...queryKeys.doctors.all, 'detail', id] as const,
    list: (input?: ListDoctorsInput) => [...queryKeys.doctors.all, 'list', input] as const,
  },
  specialties: {
    all: ['specialties'] as const,
    list: () => [...queryKeys.specialties.all, 'list'] as const,
  },
}

export { queryKeys }
