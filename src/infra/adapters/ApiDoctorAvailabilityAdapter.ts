import { DoctorAvailability } from '@/domain/entities/availability'
import {
  DoctorAvailabilityGateway,
  GetDoctorAvailabilityInput,
} from '@/domain/ports/DoctorAvailabilityGateway'
import { httpClient } from '@/infra/http/client'

class ApiDoctorAvailabilityAdapter implements DoctorAvailabilityGateway {
  async getAvailableSlots({
    doctorId,
    clinicId,
    date,
  }: GetDoctorAvailabilityInput): Promise<DoctorAvailability> {
    return httpClient
      .get(`doctors/${doctorId}/available-slots`, {
        searchParams: {
          clinicId,
          date,
        },
      })
      .json<DoctorAvailability>()
  }
}

export { ApiDoctorAvailabilityAdapter }
