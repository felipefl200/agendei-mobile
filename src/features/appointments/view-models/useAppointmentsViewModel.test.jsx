import { renderHook, act } from '@testing-library/react-native'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { useAppointmentsViewModel } from './useAppointmentsViewModel'
import {
  cancelAppointmentUseCase,
  getAppointmentsHistoryUseCase,
  getUpcomingAppointmentsUseCase,
} from '@/infra/factories/appointmentsUseCases'

vi.mock('@/infra/factories/appointmentsUseCases', () => ({
  cancelAppointmentUseCase: { execute: vi.fn() },
  getAppointmentsHistoryUseCase: { execute: vi.fn() },
  getUpcomingAppointmentsUseCase: { execute: vi.fn() },
}))

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
})

const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

describe('useAppointmentsViewModel', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    queryClient.clear()
  })

  it('deve retornar erro ao tentar cancelar uma consulta passada (bloqueado pelo useCase)', async () => {
    vi.mocked(getUpcomingAppointmentsUseCase.execute).mockResolvedValue([])
    vi.mocked(getAppointmentsHistoryUseCase.execute).mockResolvedValue([])
    
    // Simula o erro retornado pelo use case ao tentar cancelar uma consulta no passado
    vi.mocked(cancelAppointmentUseCase.execute).mockRejectedValue(new Error('Não é possível cancelar uma consulta que já passou.'))

    const { result } = renderHook(() => useAppointmentsViewModel(), { wrapper })

    let error
    await act(async () => {
      try {
        await result.current.cancelAppointment('past-id')
      } catch (e) {
        error = e
      }
    })

    expect(error).toBeDefined()
    expect(error?.message).toContain('Não é possível cancelar uma consulta que já passou.')
  })
})
