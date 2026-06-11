import { Doctor } from '@/domain/entities/doctor'

interface Pagination {
  page: number
  perPage: number
  total: number
  totalPages: number
}

interface ListDoctorsInput {
  search?: string
  specialtyId?: string
  page?: number
  perPage?: number
}

interface ListDoctorsResult {
  doctors: Doctor[]
  pagination: Pagination
}

interface DoctorsGateway {
  list(input?: ListDoctorsInput): Promise<ListDoctorsResult>
  getById(id: string): Promise<Doctor>
}

export type { DoctorsGateway, ListDoctorsInput, ListDoctorsResult, Pagination }
