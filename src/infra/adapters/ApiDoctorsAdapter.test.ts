import { describe, expect, it, vi } from 'vitest'
import { doctorFixture } from '@/test/fixtures'
import { ApiDoctorsAdapter } from './ApiDoctorsAdapter'

const httpClientMock = vi.hoisted(() => ({
  get: vi.fn(),
}))

vi.mock('@/infra/http/client', () => ({
  httpClient: httpClientMock,
}))

function jsonResponse(data: unknown) {
  return { json: vi.fn().mockResolvedValue(data) }
}

describe('ApiDoctorsAdapter', () => {
  it('builds searchParams only with defined filters', async () => {
    const result = { doctors: [doctorFixture], page: 1, perPage: 20, total: 1 }
    httpClientMock.get.mockReturnValue(jsonResponse(result))

    await expect(
      new ApiDoctorsAdapter().list({ page: 1, perPage: 20, search: 'cardio' }),
    ).resolves.toBe(result)

    expect(httpClientMock.get).toHaveBeenCalledWith('doctors', {
      searchParams: { page: '1', perPage: '20', search: 'cardio' },
    })
  })

  it('returns doctor detail from wrapped response', async () => {
    httpClientMock.get.mockReturnValue(jsonResponse({ doctor: doctorFixture }))

    await expect(new ApiDoctorsAdapter().getById('doctor-1')).resolves.toBe(doctorFixture)
    expect(httpClientMock.get).toHaveBeenCalledWith('doctors/doctor-1')
  })
})
