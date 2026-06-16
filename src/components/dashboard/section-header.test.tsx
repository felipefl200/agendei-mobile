import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import SectionHeader from './section-header'

describe('SectionHeader', () => {
  it('renders action only when callback exists', () => {
    const { rerender } = render(<SectionHeader actionLabel="Ver todas" title="Especialidades" />)

    expect(screen.getByText('Especialidades')).toBeTruthy()
    expect(screen.queryByText('Ver todas')).toBeNull()

    const onActionPress = vi.fn()
    rerender(
      <SectionHeader
        actionLabel="Ver todas"
        onActionPress={onActionPress}
        title="Especialidades"
      />,
    )

    fireEvent.click(screen.getByText('Ver todas'))
    expect(onActionPress).toHaveBeenCalled()
  })
})
