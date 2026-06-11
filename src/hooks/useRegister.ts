import { useMutation } from '@tanstack/react-query'
import { RegisterPatientInput } from '@/domain/ports/AuthGateway'
import { registerUseCase } from '@/infra/factories/authUseCases'
import { useAuthStore } from '@/store/useAuthStore'

function useRegister() {
  const signIn = useAuthStore((state) => state.signIn)

  return useMutation({
    mutationFn: (input: RegisterPatientInput) => registerUseCase.execute(input),
    onSuccess: (session) => {
      signIn(session)
    },
  })
}

export { useRegister }
