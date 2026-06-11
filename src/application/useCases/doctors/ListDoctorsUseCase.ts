import {
  DoctorsGateway,
  ListDoctorsInput,
  ListDoctorsResult,
} from '@/domain/ports/DoctorsGateway'

class ListDoctorsUseCase {
  constructor(private readonly doctorsGateway: DoctorsGateway) {}

  execute(input?: ListDoctorsInput): Promise<ListDoctorsResult> {
    return this.doctorsGateway.list({
      ...input,
      search: input?.search?.trim(),
      page: input?.page ?? 1,
      perPage: input?.perPage ?? 20,
    })
  }
}

export { ListDoctorsUseCase }
