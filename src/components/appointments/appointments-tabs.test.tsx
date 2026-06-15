import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import AppointmentsTabs from './appointments-tabs'

describe('AppointmentsTabs', () => {
  it('renders tabs and emits selected tab', () => {
    const onChangeTab = vi.fn()

    render(<AppointmentsTabs activeTab="upcoming" onChangeTab={onChangeTab} />)
    fireEvent.click(screen.getByText('Histórico'))

    expect(screen.getByText('Próximas')).toBeTruthy()
    expect(onChangeTab).toHaveBeenCalledWith('history')
  })
})
