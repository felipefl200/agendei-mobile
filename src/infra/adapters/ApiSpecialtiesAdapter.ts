import { Specialty } from '@/domain/entities/specialty'
import { SpecialtiesGateway } from '@/domain/ports/SpecialtiesGateway'
import { httpClient } from '@/infra/http/client'

class ApiSpecialtiesAdapter implements SpecialtiesGateway {
  async list() {
    const response = await httpClient.get('specialties').json<{ specialties: Specialty[] }>()

    return response.specialties
  }
}

export { ApiSpecialtiesAdapter }
