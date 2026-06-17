import { waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { appointmentSummaryFixture, userFixture } from '@/test/fixtures'
import { resetExpoRouterMock, routerMock } from '@/test/mocks/expo-router'
import { renderHookWithProviders } from '@/test/renderHookWithProviders'
import { useAuthStore } from '@/store/useAuthStore'
import { useDashboardViewModel } from './useDashboardViewModel'

const appointmentsUseCasesMock = vi.hoisted(() => ({
  getUpcomingAppointmentsUseCase: { execute: vi.fn() },
}))

vi.mock('@/infra/factories/appointmentsUseCases', () => ({
  getUpcomingAppointmentsUseCase: appointmentsUseCasesMock.getUpcomingAppointmentsUseCase,
}))

describe('useDashboardViewModel', () => {
  beforeEach(() => {
    resetExpoRouterMock()
    useAuthStore.setState({
      isAuthenticated: true,
      isRestoring: false,
      token: 'token-1',
      user: userFixture,
    })
  })

  it('uses store user name and formats next appointment', async () => {
    appointmentsUseCasesMock.getUpcomingAppointmentsUseCase.execute.mockResolvedValue([
      appointmentSummaryFixture,
    ])

    const { result } = renderHookWithProviders(() => useDashboardViewModel())

    await waitFor(() => {
      expect(result.current.nextAppointment).toMatchObject({
        clinic: 'Clinica Central',
        date: '22 JUN',
        doctorName: 'Dra. Clara',
        specialty: 'Cardiologia',
        time: '09:00',
        weekday: 'Segunda-feira',
      })
    })
    expect(result.current.userName).toBe('Ana Paciente')
    expect(result.current.specialties).toHaveLength(4)
    expect(result.current.quickActions).toHaveLength(4)
  })

  it('falls back to paciente and navigates to search', () => {
    useAuthStore.setState({ user: null })
    appointmentsUseCasesMock.getUpcomingAppointmentsUseCase.execute.mockResolvedValue([])

    const { result } = renderHookWithProviders(() => useDashboardViewModel())

    expect(result.current.userName).toBe('paciente')
    result.current.handleSeeAllSpecialties()
    expect(routerMock.push).toHaveBeenCalledWith('/search')
  })
})
