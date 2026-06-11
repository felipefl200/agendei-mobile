import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { registerUseCase } from '@/infra/factories/authUseCases'
import { useAuthStore } from '@/store/useAuthStore'
import { getAuthErrorMessage } from '@/utils/getAuthErrorMessage'

/**
 * ViewModel da tela de Cadastro.
 * Centraliza estado do formulario, validacoes de UI e criacao da sessao autenticada.
 */
interface RegisterViewModel {
  name: string
  email: string
  phone: string
  password: string
  passwordConfirmation: string
  hasAcceptedTerms: boolean
  loading: boolean
  error: string | null
  setName: (value: string) => void
  setEmail: (value: string) => void
  setPhone: (value: string) => void
  setPassword: (value: string) => void
  setPasswordConfirmation: (value: string) => void
  toggleAcceptedTerms: () => void
  handleRegister: () => Promise<void>
}

function useRegisterViewModel(): RegisterViewModel {
  const router = useRouter()
  const signIn = useAuthStore((state) => state.signIn)
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [error, setError] = useState<string | null>(null)
  const registerMutation = useMutation({
    mutationFn: () => {
      const digitsOnlyPhone = phone.replace(/\D/g, '')

      return registerUseCase.execute({
        name,
        email,
        password,
        ...(digitsOnlyPhone ? { phone: digitsOnlyPhone } : {}),
      })
    },
    onSuccess: (session) => {
      signIn(session)
    },
  })

  function toggleAcceptedTerms() {
    setHasAcceptedTerms((currentValue) => !currentValue)
  }

  async function handleRegister() {
    if (!name.trim() || !email.trim() || !password) {
      setError('Informe nome, e-mail e senha para criar sua conta.')
      return
    }

    if (password !== passwordConfirmation) {
      setError('As senhas não conferem.')
      return
    }

    if (!hasAcceptedTerms) {
      setError('Aceite os termos para continuar.')
      return
    }

    setError(null)

    try {
      await registerMutation.mutateAsync()
      router.replace('/dashboard')
    } catch (mutationError) {
      setError(getAuthErrorMessage(mutationError))
    }
  }

  return {
    name,
    email,
    phone,
    password,
    passwordConfirmation,
    hasAcceptedTerms,
    loading: registerMutation.isPending,
    error,
    setName,
    setEmail,
    setPhone,
    setPassword,
    setPasswordConfirmation,
    toggleAcceptedTerms,
    handleRegister,
  }
}

export type { RegisterViewModel }
export { useRegisterViewModel }
