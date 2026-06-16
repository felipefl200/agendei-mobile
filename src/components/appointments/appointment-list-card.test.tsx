import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import AppointmentListCard from './appointment-list-card'

const defaultProps = {
  clinic: 'Clinica Central',
  day: '15',
  doctorName: 'Dra. Clara',
  month: 'JUN',
  specialty: 'Cardiologia',
  status: 'scheduled' as const,
  time: '09:00',
}

describe('AppointmentListCard', () => {
  it('renders appointment details and cancel action', () => {
    const onCancel = vi.fn()

    render(<AppointmentListCard {...defaultProps} onCancel={onCancel} />)
    fireEvent.click(screen.getByText('Cancelar consulta'))

    expect(screen.getByText('Dra. Clara')).toBeTruthy()
    expect(screen.getByText('Cardiologia')).toBeTruthy()
    expect(onCancel).toHaveBeenCalled()
  })

  it('shows canceling state and hides action when callback is missing', () => {
    const { rerender } = render(
      <AppointmentListCard {...defaultProps} isCanceling onCancel={vi.fn()} />,
    )

    expect(screen.getByText('Cancelando...')).toBeTruthy()

    rerender(<AppointmentListCard {...defaultProps} />)

    expect(screen.queryByText('Cancelar consulta')).toBeNull()
  })
})
