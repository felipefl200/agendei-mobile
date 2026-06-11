import { renderHook, act } from '@testing-library/react-native'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { useRegisterViewModel } from './useRegisterViewModel'
import { registerUseCase } from '@/infra/factories/authUseCases'

// Mock dependencies
vi.mock('expo-router', () => ({
  useRouter: () => ({ replace: vi.fn() })
}))

vi.mock('@/infra/factories/authUseCases', () => ({
  registerUseCase: {
    execute: vi.fn()
  }
}))

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
})

const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

describe('useRegisterViewModel', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    queryClient.clear()
  })

  it('deve refletir o estado de loading durante o registro', async () => {
    let resolveMutation
    vi.mocked(registerUseCase.execute).mockReturnValue(
      new Promise((resolve) => {
        resolveMutation = resolve
      })
    )

    const { result } = renderHook(() => useRegisterViewModel(), { wrapper })

    act(() => {
      result.current.setName('Test User')
      result.current.setEmail('test@example.com')
      result.current.setPassword('password123')
      result.current.setPasswordConfirmation('password123')
      result.current.toggleAcceptedTerms()
    })

    expect(result.current.loading).toBe(false)

    let promise
    act(() => {
      promise = result.current.handleRegister()
    })

    expect(result.current.loading).toBe(true)

    await act(async () => {
      resolveMutation({ user: { id: '1' }, token: 'token' })
      await promise
    })

    expect(result.current.loading).toBe(false)
  })
})
