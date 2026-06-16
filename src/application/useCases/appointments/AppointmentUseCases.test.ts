import { describe, expect, it, vi } from 'vitest'
import { appointmentDetailsFixture, appointmentSummaryFixture } from '@/test/fixtures'
import { CancelAppointmentUseCase } from './CancelAppointmentUseCase'
import { CreateAppointmentUseCase } from './CreateAppointmentUseCase'
import { GetAppointmentsHistoryUseCase } from './GetAppointmentsHistoryUseCase'
import { GetUpcomingAppointmentsUseCase } from './GetUpcomingAppointmentsUseCase'

function makeGateway() {
  return {
    cancel: vi.fn(),
    create: vi.fn(),
    getHistory: vi.fn(),
    getUpcoming: vi.fn(),
  }
}

describe('appointment use cases', () => {
  it('CreateAppointmentUseCase delegates payload and returns details', async () => {
    const gateway = makeGateway()
    const input = {
      clinicId: 'clinic-1',
      date: '2026-06-15',
      doctorId: 'doctor-1',
      specialtyId: 'specialty-1',
      startTime: '09:00',
    }
    gateway.create.mockResolvedValue(appointmentDetailsFixture)

    await expect(new CreateAppointmentUseCase(gateway).execute(input)).resolves.toBe(
      appointmentDetailsFixture,
    )
    expect(gateway.create).toHaveBeenCalledWith(input)
  })

  it('CancelAppointmentUseCase delegates payload and returns canceled appointment', async () => {
    const gateway = makeGateway()
    const canceled = { id: 'appointment-1', status: 'canceled' as const, cancelReason: 'reason' }
    const input = { appointmentId: 'appointment-1', reason: 'reason' }
    gateway.cancel.mockResolvedValue(canceled)

    await expect(new CancelAppointmentUseCase(gateway).execute(input)).resolves.toBe(canceled)
    expect(gateway.cancel).toHaveBeenCalledWith(input)
  })

  it('list use cases return upcoming and history appointments', async () => {
    const gateway = makeGateway()
    gateway.getUpcoming.mockResolvedValue([appointmentSummaryFixture])
    gateway.getHistory.mockResolvedValue([])

    await expect(new GetUpcomingAppointmentsUseCase(gateway).execute()).resolves.toEqual([
      appointmentSummaryFixture,
    ])
    await expect(new GetAppointmentsHistoryUseCase(gateway).execute()).resolves.toEqual([])
  })

  it('propagates gateway errors', async () => {
    const gateway = makeGateway()
    const error = new Error('network')
    gateway.create.mockRejectedValue(error)

    await expect(
      new CreateAppointmentUseCase(gateway).execute({
        clinicId: 'clinic-1',
        date: '2026-06-15',
        doctorId: 'doctor-1',
        specialtyId: 'specialty-1',
        startTime: '09:00',
      }),
    ).rejects.toBe(error)
  })
})
