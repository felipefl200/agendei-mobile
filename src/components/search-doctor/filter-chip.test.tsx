import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import FilterChip from './filter-chip'

describe('FilterChip', () => {
  it('renders label and calls onPress', () => {
    const onPress = vi.fn()

    render(<FilterChip active label="Cardiologia" onPress={onPress} />)
    fireEvent.click(screen.getByText('Cardiologia'))

    expect(onPress).toHaveBeenCalled()
  })
})
