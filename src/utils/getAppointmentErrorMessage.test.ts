import { describe, expect, it } from 'vitest'
import { AppError } from '@/domain/errors/AppError'
import { getAppointmentErrorMessage } from './getAppointmentErrorMessage'

describe('getAppointmentErrorMessage', () => {
  it.each([
    ['Appointment time is already occupied', 'Este horário acabou de ficar indisponível.'],
    [
      'Patient already has an appointment at this time',
      'Você já tem uma consulta marcada neste horário.',
    ],
    ['Appointment date cannot be in the past', 'Escolha uma data futura para agendar.'],
    [
      'Appointment time is outside doctor availability',
      'Este horário está fora da agenda do médico.',
    ],
  ])('maps %s to a friendly message', (backendMessage, friendlyMessage) => {
    expect(
      getAppointmentErrorMessage(
        new AppError({ statusCode: 400, error: 'Bad Request', message: backendMessage }),
      ),
    ).toBe(friendlyMessage)
  })

  it('preserves unknown AppError messages and falls back for unknown errors', () => {
    expect(
      getAppointmentErrorMessage(
        new AppError({ statusCode: 500, error: 'Server Error', message: 'Custom error' }),
      ),
    ).toBe('Custom error')
    expect(getAppointmentErrorMessage(new Error('network'))).toBe(
      'Não foi possível confirmar o agendamento. Tente novamente.',
    )
  })
})
