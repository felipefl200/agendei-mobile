import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { loginUseCase } from '@/infra/factories/authUseCases'
import { useAuthStore } from '@/store/useAuthStore'
import { getAuthErrorMessage } from '@/utils/getAuthErrorMessage'

/**
 * ViewModel da tela de Login.
 * Centraliza estado do formulario, acao de entrada e sincronizacao da sessao autenticada.
 */
interface LoginViewModel {
  email: string
  password: string
  loading: boolean
  error: string | null
  setEmail: (value: string) => void
  setPassword: (value: string) => void
  handleLogin: () => Promise<void>
}

function useLoginViewModel(): LoginViewModel {
  const router = useRouter()
  const signIn = useAuthStore((state) => state.signIn)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const loginMutation = useMutation({
    mutationFn: () => loginUseCase.execute({ email, password }),
    onSuccess: (session) => {
      signIn(session)
    },
  })

  async function handleLogin() {
    if (!email.trim() || !password) {
      setError('Informe e-mail e senha para entrar.')
      return
    }

    setError(null)

    try {
      await loginMutation.mutateAsync()
      router.replace('/dashboard')
    } catch (mutationError) {
      setError(getAuthErrorMessage(mutationError))
    }
  }

  return {
    email,
    password,
    loading: loginMutation.isPending,
    error,
    setEmail,
    setPassword,
    handleLogin,
  }
}

export type { LoginViewModel }
export { useLoginViewModel }
