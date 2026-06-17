import { PatientProfileGateway } from '@/domain/ports/PatientProfileGateway'

class GetPatientProfileUseCase {
  constructor(private readonly patientProfileGateway: PatientProfileGateway) {}

  execute() {
    return this.patientProfileGateway.getMe()
  }
}

export { GetPatientProfileUseCase }
