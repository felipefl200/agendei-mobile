import { Redirect } from 'expo-router'
import LoginScreen from '@/features/auth/screens/LoginScreen'
import { useAuthStore } from '@/store/useAuthStore'

export default function HomeScreen() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const isRestoring = useAuthStore((state) => state.isRestoring)

  if (isRestoring) {
    return null
  }

  if (isAuthenticated) {
    return <Redirect href="/dashboard" />
  }

  return <LoginScreen />
}
