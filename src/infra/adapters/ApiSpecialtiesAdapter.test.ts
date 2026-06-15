import { describe, expect, it, vi } from 'vitest'
import { specialtyFixture } from '@/test/fixtures'
import { ApiSpecialtiesAdapter } from './ApiSpecialtiesAdapter'

const httpClientMock = vi.hoisted(() => ({
  get: vi.fn(),
}))

vi.mock('@/infra/http/client', () => ({
  httpClient: httpClientMock,
}))

describe('ApiSpecialtiesAdapter', () => {
  it('returns specialties from wrapped response', async () => {
    httpClientMock.get.mockReturnValue({
      json: vi.fn().mockResolvedValue({ specialties: [specialtyFixture] }),
    })

    await expect(new ApiSpecialtiesAdapter().list()).resolves.toEqual([specialtyFixture])
    expect(httpClientMock.get).toHaveBeenCalledWith('specialties')
  })
})
