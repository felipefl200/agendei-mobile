type AppErrorIssuePath = (string | number)[]

interface AppErrorIssue {
  code: string
  path: AppErrorIssuePath
  message: string
}

interface AppErrorPayload {
  statusCode: number
  error: string
  message: string
  issues?: AppErrorIssue[]
}

class AppError extends Error {
  statusCode: number
  error: string
  issues?: AppErrorIssue[]

  constructor({ statusCode, error, message, issues }: AppErrorPayload) {
    super(message)

    this.name = 'AppError'
    this.statusCode = statusCode
    this.error = error
    this.issues = issues
  }

  static fromPayload(payload: Partial<AppErrorPayload>, fallbackStatusCode: number) {
    return new AppError({
      statusCode: payload.statusCode ?? fallbackStatusCode,
      error: payload.error ?? 'Unexpected Error',
      message: payload.message ?? 'Unexpected error. Please try again.',
      issues: payload.issues,
    })
  }

  static fromUnknown(statusCode: number) {
    return new AppError({
      statusCode,
      error: 'Unexpected Error',
      message: 'Unexpected error. Please try again.',
    })
  }
}

export type { AppErrorIssue, AppErrorIssuePath, AppErrorPayload }
export { AppError }
