import { describe, expect, it } from 'vitest'
import { AppError } from '@/domain/errors/AppError'
import { getCancelAppointmentErrorMessage } from './getCancelAppointmentErrorMessage'

describe('getCancelAppointmentErrorMessage', () => {
  it.each([
    ['Appointment is already canceled', 'Esta consulta já foi cancelada.'],
    ['Appointment cannot be canceled', 'Esta consulta não pode ser cancelada.'],
    ['Only future appointments can be canceled', 'Somente consultas futuras podem ser canceladas.'],
    ['Appointment not found', 'Consulta não encontrada.'],
  ])('maps %s to a friendly message', (backendMessage, friendlyMessage) => {
    expect(
      getCancelAppointmentErrorMessage(
        new AppError({ statusCode: 400, error: 'Bad Request', message: backendMessage }),
      ),
    ).toBe(friendlyMessage)
  })

  it('preserves unknown AppError messages and falls back for unknown errors', () => {
    expect(
      getCancelAppointmentErrorMessage(
        new AppError({ statusCode: 500, error: 'Server Error', message: 'Custom error' }),
      ),
    ).toBe('Custom error')
    expect(getCancelAppointmentErrorMessage(new Error('network'))).toBe(
      'Não foi possível cancelar a consulta. Tente novamente.',
    )
  })
})
