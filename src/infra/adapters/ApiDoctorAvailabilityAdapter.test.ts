import { describe, expect, it, vi } from 'vitest'
import { ApiDoctorAvailabilityAdapter } from './ApiDoctorAvailabilityAdapter'

const httpClientMock = vi.hoisted(() => ({
  get: vi.fn(),
}))

vi.mock('@/infra/http/client', () => ({
  httpClient: httpClientMock,
}))

describe('ApiDoctorAvailabilityAdapter', () => {
  it('requests available slots with clinic and date search params', async () => {
    const availability = {
      clinicId: 'clinic-1',
      date: '2026-06-15',
      doctorId: 'doctor-1',
      slots: [{ available: true, time: '09:00' }],
    }
    httpClientMock.get.mockReturnValue({ json: vi.fn().mockResolvedValue(availability) })

    await expect(new ApiDoctorAvailabilityAdapter().getAvailableSlots(availability)).resolves.toBe(
      availability,
    )
    expect(httpClientMock.get).toHaveBeenCalledWith('doctors/doctor-1/available-slots', {
      searchParams: {
        clinicId: 'clinic-1',
        date: '2026-06-15',
      },
    })
  })
})
