import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import Button from './button'

describe('Button', () => {
  it('renders text prop and calls onPress', () => {
    const onPress = vi.fn()

    render(<Button text="Entrar" onPress={onPress} />)
    fireEvent.click(screen.getByText('Entrar'))

    expect(onPress).toHaveBeenCalled()
  })

  it('renders string children before text prop', () => {
    render(<Button text="Fallback">Confirmar</Button>)

    expect(screen.getByText('Confirmar')).toBeTruthy()
    expect(screen.queryByText('Fallback')).toBeNull()
  })
})
