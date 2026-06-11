import { DoctorAvailability } from '@/domain/entities/availability'
import {
  DoctorAvailabilityGateway,
  GetDoctorAvailabilityInput,
} from '@/domain/ports/DoctorAvailabilityGateway'

class GetDoctorAvailabilityUseCase {
  constructor(private readonly doctorAvailabilityGateway: DoctorAvailabilityGateway) {}

  execute(input: GetDoctorAvailabilityInput): Promise<DoctorAvailability> {
    return this.doctorAvailabilityGateway.getAvailableSlots(input)
  }
}

export { GetDoctorAvailabilityUseCase }
