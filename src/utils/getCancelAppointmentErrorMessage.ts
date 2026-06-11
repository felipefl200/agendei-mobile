import { AppError } from '@/domain/errors/AppError'

function getCancelAppointmentErrorMessage(error: unknown) {
  if (error instanceof AppError) {
    if (error.message === 'Appointment is already canceled') {
      return 'Esta consulta já foi cancelada.'
    }

    if (error.message === 'Appointment cannot be canceled') {
      return 'Esta consulta não pode ser cancelada.'
    }

    if (error.message === 'Only future appointments can be canceled') {
      return 'Somente consultas futuras podem ser canceladas.'
    }

    if (error.message === 'Appointment not found') {
      return 'Consulta não encontrada.'
    }

    return error.message
  }

  return 'Não foi possível cancelar a consulta. Tente novamente.'
}

export { getCancelAppointmentErrorMessage }
