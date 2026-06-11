import { AppError } from '@/domain/errors/AppError'

function getAppointmentErrorMessage(error: unknown) {
  if (error instanceof AppError) {
    if (error.message === 'Appointment time is already occupied') {
      return 'Este horário acabou de ficar indisponível.'
    }

    if (error.message === 'Patient already has an appointment at this time') {
      return 'Você já tem uma consulta marcada neste horário.'
    }

    if (error.message === 'Appointment date cannot be in the past') {
      return 'Escolha uma data futura para agendar.'
    }

    if (error.message === 'Appointment time is outside doctor availability') {
      return 'Este horário está fora da agenda do médico.'
    }

    return error.message
  }

  return 'Não foi possível confirmar o agendamento. Tente novamente.'
}

export { getAppointmentErrorMessage }
