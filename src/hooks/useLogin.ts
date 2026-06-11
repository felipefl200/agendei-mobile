import { useMutation } from '@tanstack/react-query'
import { LoginCredentials } from '@/domain/ports/AuthGateway'
import { loginUseCase } from '@/infra/factories/authUseCases'
import { useAuthStore } from '@/store/useAuthStore'

function useLogin() {
  const signIn = useAuthStore((state) => state.signIn)

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => loginUseCase.execute(credentials),
    onSuccess: (session) => {
      signIn(session)
    },
  })
}

export { useLogin }
