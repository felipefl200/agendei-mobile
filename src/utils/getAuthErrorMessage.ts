import { AppError } from '@/domain/errors/AppError'

function getAuthErrorMessage(error: unknown) {
  if (error instanceof AppError) {
    if (error.message === 'E-mail already registered') {
      return 'Este e-mail já está cadastrado.'
    }

    if (error.message === 'Invalid credentials') {
      return 'E-mail ou senha inválidos.'
    }

    if (error.message === 'Inactive user') {
      return 'Esta conta está inativa.'
    }

    return error.message
  }

  return 'Não foi possível concluir a solicitação. Tente novamente.'
}

export { getAuthErrorMessage }
