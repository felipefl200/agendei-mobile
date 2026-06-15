import { describe, expect, it } from 'vitest'
import { AppError } from '@/domain/errors/AppError'
import { getAuthErrorMessage } from './getAuthErrorMessage'

describe('getAuthErrorMessage', () => {
  it.each([
    ['E-mail already registered', 'Este e-mail já está cadastrado.'],
    ['Invalid credentials', 'E-mail ou senha inválidos.'],
    ['Inactive user', 'Esta conta está inativa.'],
  ])('maps %s to a friendly message', (backendMessage, friendlyMessage) => {
    expect(
      getAuthErrorMessage(
        new AppError({ statusCode: 400, error: 'Bad Request', message: backendMessage }),
      ),
    ).toBe(friendlyMessage)
  })

  it('preserves unknown AppError messages and falls back for unknown errors', () => {
    expect(
      getAuthErrorMessage(
        new AppError({ statusCode: 500, error: 'Server Error', message: 'Custom error' }),
      ),
    ).toBe('Custom error')
    expect(getAuthErrorMessage(new Error('network'))).toBe(
      'Não foi possível concluir a solicitação. Tente novamente.',
    )
  })
})
