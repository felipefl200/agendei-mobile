import { Doctor } from '@/domain/entities/doctor'
import {
  DoctorsGateway,
  ListDoctorsInput,
  ListDoctorsResult,
} from '@/domain/ports/DoctorsGateway'
import { httpClient } from '@/infra/http/client'

class ApiDoctorsAdapter implements DoctorsGateway {
  async list(input: ListDoctorsInput = {}): Promise<ListDoctorsResult> {
    const searchParams = {
      ...(input.search ? { search: input.search } : {}),
      ...(input.specialtyId ? { specialtyId: input.specialtyId } : {}),
      ...(input.page ? { page: String(input.page) } : {}),
      ...(input.perPage ? { perPage: String(input.perPage) } : {}),
    }

    return httpClient.get('doctors', { searchParams }).json<ListDoctorsResult>()
  }

  async getById(id: string) {
    const response = await httpClient.get(`doctors/${id}`).json<{ doctor: Doctor }>()

    return response.doctor
  }
}

export { ApiDoctorsAdapter }
