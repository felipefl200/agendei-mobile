import { afterEach, describe, expect, it, vi } from 'vitest'
import { getTodayDateString } from './date'

describe('getTodayDateString', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('formats the current date as yyyy-mm-dd', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2026, 0, 5, 10, 30))

    expect(getTodayDateString()).toBe('2026-01-05')
  })
})
