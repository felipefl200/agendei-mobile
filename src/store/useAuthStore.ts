import { create } from 'zustand'
import { User } from '@/domain/entities/user'
import { AuthSession } from '@/domain/ports/AuthGateway'
import { restoreSessionUseCase } from '@/infra/factories/authUseCases'
import { secureAuthTokenStorage } from '@/infra/storage/authTokenStorage'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isRestoring: boolean
  signIn(session: AuthSession): void
  signOut(): Promise<void>
  restoreSession(): Promise<void>
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isRestoring: true,
  signIn: ({ user, token }) => {
    set({
      user,
      token,
      isAuthenticated: true,
      isRestoring: false,
    })
  },
  signOut: async () => {
    await secureAuthTokenStorage.removeToken()

    set({
      user: null,
      token: null,
      isAuthenticated: false,
      isRestoring: false,
    })
  },
  restoreSession: async () => {
    set({ isRestoring: true })

    try {
      const session = await restoreSessionUseCase.execute()

      set({
        user: session?.user ?? null,
        token: session?.token ?? null,
        isAuthenticated: Boolean(session),
        isRestoring: false,
      })
    } catch {
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isRestoring: false,
      })
    }
  },
}))

export { useAuthStore }
