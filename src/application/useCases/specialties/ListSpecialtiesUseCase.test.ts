import { describe, expect, it, vi } from 'vitest'
import { specialtyFixture } from '@/test/fixtures'
import { ListSpecialtiesUseCase } from './ListSpecialtiesUseCase'

describe('ListSpecialtiesUseCase', () => {
  it('delegates to specialties gateway', async () => {
    const gateway = { list: vi.fn().mockResolvedValue([specialtyFixture]) }

    await expect(new ListSpecialtiesUseCase(gateway).execute()).resolves.toEqual([
      specialtyFixture,
    ])
    expect(gateway.list).toHaveBeenCalled()
  })
})
