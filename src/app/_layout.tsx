import { KeyboardProvider } from 'react-native-keyboard-controller'
import { Stack } from 'expo-router'

export default function RootLayout() {
  return (
    <KeyboardProvider
      enabled
      navigationBarTranslucent={false}
      preload
      preserveEdgeToEdge={false}
      statusBarTranslucent={false}
    >
      <Stack screenOptions={{ headerShown: false }} />
    </KeyboardProvider>
  )
}
