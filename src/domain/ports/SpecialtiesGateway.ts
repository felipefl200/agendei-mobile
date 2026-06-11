import { Specialty } from '@/domain/entities/specialty'

interface SpecialtiesGateway {
  list(): Promise<Specialty[]>
}

export type { SpecialtiesGateway }
