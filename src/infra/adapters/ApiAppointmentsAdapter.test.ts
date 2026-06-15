import { describe, expect, it, vi } from 'vitest'
import { appointmentDetailsFixture, appointmentSummaryFixture } from '@/test/fixtures'
import { ApiAppointmentsAdapter } from './ApiAppointmentsAdapter'

const httpClientMock = vi.hoisted(() => ({
  get: vi.fn(),
  patch: vi.fn(),
  post: vi.fn(),
}))

vi.mock('@/infra/http/client', () => ({
  httpClient: httpClientMock,
}))

function jsonResponse(data: unknown) {
  return { json: vi.fn().mockResolvedValue(data) }
}

describe('ApiAppointmentsAdapter', () => {
  it('creates an appointment from a valid response', async () => {
    const input = {
      clinicId: 'clinic-1',
      date: '2026-06-15',
      doctorId: 'doctor-1',
      specialtyId: 'specialty-1',
      startTime: '09:00',
    }
    httpClientMock.post.mockReturnValue(jsonResponse({ appointment: appointmentDetailsFixture }))

    await expect(new ApiAppointmentsAdapter().create(input)).resolves.toEqual(
      appointmentDetailsFixture,
    )
    expect(httpClientMock.post).toHaveBeenCalledWith('appointments', { json: input })
  })

  it('cancels an appointment from a valid response', async () => {
    const canceled = { cancelReason: null, id: 'appointment-1', status: 'canceled' }
    httpClientMock.patch.mockReturnValue(jsonResponse({ appointment: canceled }))

    await expect(
      new ApiAppointmentsAdapter().cancel({ appointmentId: 'appointment-1', reason: 'reason' }),
    ).resolves.toEqual(canceled)
    expect(httpClientMock.patch).toHaveBeenCalledWith('appointments/appointment-1/cancel', {
      json: { reason: 'reason' },
    })
  })

  it('parses upcoming and history lists', async () => {
    httpClientMock.get.mockReturnValue(
      jsonResponse({ appointments: [appointmentSummaryFixture] }),
    )

    await expect(new ApiAppointmentsAdapter().getUpcoming()).resolves.toEqual([
      appointmentSummaryFixture,
    ])
    await expect(new ApiAppointmentsAdapter().getHistory()).resolves.toEqual([
      appointmentSummaryFixture,
    ])
  })

  it('rejects invalid appointment payloads', async () => {
    httpClientMock.get.mockReturnValue(jsonResponse({ appointments: [{ id: 1 }] }))

    await expect(new ApiAppointmentsAdapter().getUpcoming()).rejects.toThrow()
  })
})
