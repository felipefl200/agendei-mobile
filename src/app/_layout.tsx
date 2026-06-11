import { QueryClientProvider } from '@tanstack/react-query'
import { useEffect } from 'react'
import { KeyboardProvider } from 'react-native-keyboard-controller'
import { Stack } from 'expo-router'
import { queryClient } from '@/infra/query/queryClient'
import { setUnauthorizedHandler } from '@/infra/http/client'
import { useAuthStore } from '@/store/useAuthStore'

export default function RootLayout() {
  const restoreSession = useAuthStore((state) => state.restoreSession)
  const signOut = useAuthStore((state) => state.signOut)

  useEffect(() => {
    setUnauthorizedHandler(signOut)
    void restoreSession()

    return () => {
      setUnauthorizedHandler(null)
    }
  }, [restoreSession, signOut])

  return (
    <QueryClientProvider client={queryClient}>
      <KeyboardProvider enabled preload>
        <Stack screenOptions={{ headerShown: false }} />
      </KeyboardProvider>
    </QueryClientProvider>
  )
}
