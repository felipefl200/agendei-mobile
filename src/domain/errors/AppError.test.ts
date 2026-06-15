import { describe, expect, it } from 'vitest'
import { AppError, appErrorPayloadSchema } from './AppError'

describe('AppError', () => {
  it('creates an error from a complete payload', () => {
    const error = new AppError({
      statusCode: 400,
      error: 'Validation Error',
      message: 'Invalid input',
      issues: [{ code: 'invalid_type', path: ['email'], message: 'Required' }],
    })

    expect(error).toBeInstanceOf(Error)
    expect(error.name).toBe('AppError')
    expect(error.statusCode).toBe(400)
    expect(error.error).toBe('Validation Error')
    expect(error.message).toBe('Invalid input')
    expect(error.issues).toEqual([
      { code: 'invalid_type', path: ['email'], message: 'Required' },
    ])
  })

  it('fills safe defaults from partial payloads', () => {
    const error = AppError.fromPayload({ message: 'Backend message' }, 422)

    expect(error.statusCode).toBe(422)
    expect(error.error).toBe('Unexpected Error')
    expect(error.message).toBe('Backend message')
  })

  it('returns an unknown error with predictable message', () => {
    const error = AppError.fromUnknown(500)

    expect(error.statusCode).toBe(500)
    expect(error.error).toBe('Unexpected Error')
    expect(error.message).toBe('Unexpected error. Please try again.')
  })

  it('validates error payload issues with string and numeric paths', () => {
    const parsed = appErrorPayloadSchema.parse({
      error: 'Validation Error',
      issues: [{ code: 'custom', path: ['items', 0], message: 'Invalid item' }],
      message: 'Invalid payload',
      statusCode: 400,
    })

    expect(parsed.issues?.[0].path).toEqual(['items', 0])
  })
})
