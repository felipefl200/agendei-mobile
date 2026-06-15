import { describe, expect, it, vi } from 'vitest'
import { doctorFixture } from '@/test/fixtures'
import { GetDoctorAvailabilityUseCase } from './GetDoctorAvailabilityUseCase'
import { GetDoctorUseCase } from './GetDoctorUseCase'
import { ListDoctorsUseCase } from './ListDoctorsUseCase'

describe('doctor use cases', () => {
  it('ListDoctorsUseCase applies defaults and trims search', async () => {
    const gateway = { getById: vi.fn(), list: vi.fn() }
    gateway.list.mockResolvedValue({ doctors: [doctorFixture], page: 1, perPage: 20, total: 1 })

    await new ListDoctorsUseCase(gateway).execute({
      search: '  cardiologista  ',
      specialtyId: 'specialty-1',
    })

    expect(gateway.list).toHaveBeenCalledWith({
      page: 1,
      perPage: 20,
      search: 'cardiologista',
      specialtyId: 'specialty-1',
    })
  })

  it('GetDoctorUseCase delegates id to the gateway', async () => {
    const gateway = { getById: vi.fn(), list: vi.fn() }
    gateway.getById.mockResolvedValue(doctorFixture)

    await expect(new GetDoctorUseCase(gateway).execute('doctor-1')).resolves.toBe(doctorFixture)
    expect(gateway.getById).toHaveBeenCalledWith('doctor-1')
  })

  it('GetDoctorAvailabilityUseCase delegates availability input', async () => {
    const gateway = { getAvailableSlots: vi.fn() }
    const availability = {
      clinicId: 'clinic-1',
      date: '2026-06-15',
      doctorId: 'doctor-1',
      slots: [{ available: true, time: '09:00' }],
    }
    gateway.getAvailableSlots.mockResolvedValue(availability)

    await expect(new GetDoctorAvailabilityUseCase(gateway).execute(availability)).resolves.toBe(
      availability,
    )
    expect(gateway.getAvailableSlots).toHaveBeenCalledWith(availability)
  })
})
