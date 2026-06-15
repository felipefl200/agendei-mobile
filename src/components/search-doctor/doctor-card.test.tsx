import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import DoctorCard from './doctor-card'

describe('DoctorCard', () => {
  it('renders doctor information and calls onPress', () => {
    const onPress = vi.fn()

    render(
      <DoctorCard
        availability="Disponível hoje"
        crm="12345"
        name="Dra. Clara"
        onPress={onPress}
        specialty="Cardiologia"
      />,
    )
    fireEvent.click(screen.getByText('Dra. Clara'))

    expect(screen.getByText('Cardiologia')).toBeTruthy()
    expect(screen.getByText('CRM 12345')).toBeTruthy()
    expect(onPress).toHaveBeenCalled()
  })
})
