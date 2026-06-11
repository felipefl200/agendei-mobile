import { QueryClientProvider } from '@tanstack/react-query'
import { KeyboardProvider } from 'react-native-keyboard-controller'
import { Stack } from 'expo-router'
import { queryClient } from '@/infra/query/queryClient'

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <KeyboardProvider enabled preload>
        <Stack screenOptions={{ headerShown: false }} />
      </KeyboardProvider>
    </QueryClientProvider>
  )
}
