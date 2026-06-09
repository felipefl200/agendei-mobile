import { KeyboardProvider } from 'react-native-keyboard-controller'
import { Stack } from 'expo-router'

export default function RootLayout() {
  return (
    <KeyboardProvider enabled preload>
      <Stack screenOptions={{ headerShown: false }} />
    </KeyboardProvider>
  )
}
