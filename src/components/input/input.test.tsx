import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import Input from './input'

describe('Input', () => {
  it('renders label, helper text and forwards text changes', () => {
    const onChangeText = vi.fn()

    render(
      <Input
        helperText="Use seu melhor e-mail"
        label="E-mail"
        onChangeText={onChangeText}
        placeholder="email@example.com"
      />,
    )

    fireEvent.change(screen.getByPlaceholderText('email@example.com'), {
      target: { value: 'ana@example.com' },
    })

    expect(screen.getByText('E-mail')).toBeTruthy()
    expect(screen.getByText('Use seu melhor e-mail')).toBeTruthy()
    expect(onChangeText).toHaveBeenCalledWith('ana@example.com')
  })

  it('prioritizes error text and toggles secure text visibility', () => {
    render(
      <Input
        error="Senha obrigatória"
        helperText="Mínimo 8 caracteres"
        placeholder="Senha"
        secureTextEntry
      />,
    )

    const input = screen.getByPlaceholderText('Senha')
    expect(input.getAttribute('type')).toBe('password')
    expect(screen.getByText('Senha obrigatória')).toBeTruthy()
    expect(screen.queryByText('Mínimo 8 caracteres')).toBeNull()

    fireEvent.click(screen.getByLabelText('Mostrar senha'))

    expect(screen.getByPlaceholderText('Senha').getAttribute('type')).toBe('text')
  })
})
