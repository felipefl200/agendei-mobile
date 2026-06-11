import { Specialty } from '@/domain/entities/specialty'
import { SpecialtiesGateway } from '@/domain/ports/SpecialtiesGateway'

class ListSpecialtiesUseCase {
  constructor(private readonly specialtiesGateway: SpecialtiesGateway) {}

  execute(): Promise<Specialty[]> {
    return this.specialtiesGateway.list()
  }
}

export { ListSpecialtiesUseCase }
