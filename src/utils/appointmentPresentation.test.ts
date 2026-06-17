import { describe, expect, it } from 'vitest'
import { getAppointmentDateParts, toAppointmentListItem } from './appointmentPresentation'
import { appointmentSummaryFixture } from '@/test/fixtures'

describe('appointmentPresentation', () => {
  it('formats day, month, weekday and short date', () => {
    expect(getAppointmentDateParts('2026-06-15')).toEqual({
      day: '15',
      month: 'JUN',
      shortDate: '15 JUN',
      weekday: 'Segunda-feira',
    })
  })

  it('keeps a stable shape for invalid dates without throwing', () => {
    expect(() => getAppointmentDateParts('invalid-date')).not.toThrow()
    expect(getAppointmentDateParts('invalid-date')).toEqual({
      day: 'NaN',
      month: undefined,
      shortDate: 'NaN undefined',
      weekday: undefined,
    })
  })

  it('maps an appointment summary to a list item', () => {
    expect(toAppointmentListItem(appointmentSummaryFixture)).toEqual({
      clinic: 'Clinica Central',
      day: '22',
      doctorName: 'Dra. Clara',
      month: 'JUN',
      shortDate: '22 JUN',
      specialty: 'Cardiologia',
      status: 'scheduled',
      time: '09:00',
      weekday: 'Segunda-feira',
    })
  })
})
