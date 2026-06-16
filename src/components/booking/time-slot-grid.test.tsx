import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import TimeSlotGrid from './time-slot-grid'

describe('TimeSlotGrid', () => {
  it('renders time slots and emits selected time', () => {
    const onSelectTime = vi.fn()

    render(
      <TimeSlotGrid
        onSelectTime={onSelectTime}
        selectedTime="09:00"
        times={['09:00', '10:00']}
      />,
    )
    fireEvent.click(screen.getByText('10:00'))

    expect(screen.getByText('09:00')).toBeTruthy()
    expect(onSelectTime).toHaveBeenCalledWith('10:00')
  })
})
