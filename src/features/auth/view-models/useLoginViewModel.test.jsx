import { renderHook, act } from '@testing-library/react-native'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { useLoginViewModel } from './useLoginViewModel'
import { loginUseCase } from '@/infra/factories/authUseCases'

// Mock dependencies
vi.mock('expo-router', () => ({
  useRouter: () => ({ replace: vi.fn() })
}))

vi.mock('@/infra/factories/authUseCases', () => ({
  loginUseCase: {
    execute: vi.fn()
  }
}))

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
})

const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

describe('useLoginViewModel', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    queryClient.clear()
  })

  it('deve retornar erro se e-mail e senha não forem informados', async () => {
    const { result } = renderHook(() => useLoginViewModel(), { wrapper })

    await act(async () => {
      await result.current.handleLogin()
    })

    expect(result.current.error).toBe('Informe e-mail e senha para entrar.')
  })

  it('deve retornar erro com credenciais inválidas', async () => {
    vi.mocked(loginUseCase.execute).mockRejectedValue(new Error('Credenciais inválidas'))

    const { result } = renderHook(() => useLoginViewModel(), { wrapper })

    act(() => {
      result.current.setEmail('test@example.com')
      result.current.setPassword('wrong')
    })

    await act(async () => {
      await result.current.handleLogin()
    })

    expect(result.current.error).toBe('Ocorreu um erro ao fazer login. Tente novamente.')
  })
})
