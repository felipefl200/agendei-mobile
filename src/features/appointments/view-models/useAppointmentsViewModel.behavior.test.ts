import { act, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { AppError } from '@/domain/errors/AppError'
import { appointmentSummaryFixture } from '@/test/fixtures'
import { renderHookWithProviders } from '@/test/renderHookWithProviders'
import { useAppointmentsViewModel } from './useAppointmentsViewModel'

const appointmentsUseCasesMock = vi.hoisted(() => ({
  cancelAppointmentUseCase: { execute: vi.fn() },
  getAppointmentsHistoryUseCase: { execute: vi.fn() },
  getUpcomingAppointmentsUseCase: { execute: vi.fn() },
}))

vi.mock('@/infra/factories/appointmentsUseCases', () => appointmentsUseCasesMock)

describe('useAppointmentsViewModel behavior', () => {
  beforeEach(() => {
    appointmentsUseCasesMock.getUpcomingAppointmentsUseCase.execute.mockResolvedValue([
      appointmentSummaryFixture,
    ])
    appointmentsUseCasesMock.getAppointmentsHistoryUseCase.execute.mockResolvedValue([])
    appointmentsUseCasesMock.cancelAppointmentUseCase.execute.mockResolvedValue({
      cancelReason: 'Cancelado pelo paciente',
      id: 'appointment-1',
      status: 'canceled',
    })
  })

  it('starts on upcoming tab and changes tab metadata', async () => {
    const { result } = renderHookWithProviders(() => useAppointmentsViewModel())

    expect(result.current.activeTab).toBe('upcoming')
    expect(result.current.sectionTitle).toBe('Próximas consultas')
    expect(result.current.emptyMessage).toBe('Você ainda não tem consultas agendadas.')

    act(() => {
      result.current.setActiveTab('history')
    })

    expect(result.current.sectionTitle).toBe('Histórico')
    expect(result.current.emptyMessage).toBe('Seu histórico de consultas está vazio.')

    await waitFor(() => {
      expect(result.current.appointments).toEqual([])
    })
  })

  it('maps upcoming appointments and cancels with invalidation side effect', async () => {
    const { queryClient, result } = renderHookWithProviders(() => useAppointmentsViewModel())
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries')

    await waitFor(() => {
      expect(result.current.appointments[0]).toMatchObject({
        clinic: 'Clinica Central',
        doctorName: 'Dra. Clara',
        id: 'appointment-1',
        isCanceling: false,
        variant: 'future',
      })
    })

    await act(async () => {
      await result.current.cancelAppointment('appointment-1')
    })

    expect(appointmentsUseCasesMock.cancelAppointmentUseCase.execute).toHaveBeenCalledWith({
      appointmentId: 'appointment-1',
      reason: 'Cancelado pelo paciente',
    })
    expect(invalidateSpy).toHaveBeenCalled()
  })

  it('throws friendly cancel error', async () => {
    appointmentsUseCasesMock.cancelAppointmentUseCase.execute.mockRejectedValue(
      new AppError({
        error: 'Business Rule Error',
        message: 'Only future appointments can be canceled',
        statusCode: 400,
      }),
    )
    const { result } = renderHookWithProviders(() => useAppointmentsViewModel())

    await act(async () => {
      await expect(result.current.cancelAppointment('appointment-1')).rejects.toThrow(
        'Somente consultas futuras podem ser canceladas.',
      )
    })
  })
})
