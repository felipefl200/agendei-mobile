import { Doctor } from '@/domain/entities/doctor'
import { DoctorsGateway } from '@/domain/ports/DoctorsGateway'

class GetDoctorUseCase {
  constructor(private readonly doctorsGateway: DoctorsGateway) {}

  execute(id: string): Promise<Doctor> {
    return this.doctorsGateway.getById(id)
  }
}

export { GetDoctorUseCase }
