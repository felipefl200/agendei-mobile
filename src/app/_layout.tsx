import { QueryClientProvider } from '@tanstack/react-query'
import { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import * as SystemUI from 'expo-system-ui'
import { StyleSheet, View } from 'react-native'
import { KeyboardProvider } from 'react-native-keyboard-controller'
import { Stack } from 'expo-router'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { COLORS } from '@/constants/theme'
import { queryClient } from '@/infra/query/queryClient'
import { setUnauthorizedHandler } from '@/infra/http/client'
import { useAuthStore } from '@/store/useAuthStore'

export default function RootLayout() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const isRestoring = useAuthStore((state) => state.isRestoring)
  const restoreSession = useAuthStore((state) => state.restoreSession)
  const signOut = useAuthStore((state) => state.signOut)

  useEffect(() => {
    void SystemUI.setBackgroundColorAsync(COLORS.background)
    setUnauthorizedHandler(signOut)
    void restoreSession()

    return () => {
      setUnauthorizedHandler(null)
    }
  }, [restoreSession, signOut])

  return (
    <View style={styles.root}>
      <SafeAreaProvider style={styles.root}>
        <QueryClientProvider client={queryClient}>
          <KeyboardProvider enabled preload>
            <StatusBar style="dark" />
            {isRestoring ? (
              <View style={styles.loadingScreen} />
            ) : (
              <Stack
                screenOptions={{
                  contentStyle: { backgroundColor: COLORS.background },
                  headerShown: false,
                }}
              >
                <Stack.Protected guard={!isAuthenticated}>
                  <Stack.Screen name="index" />
                  <Stack.Screen name="register" />
                </Stack.Protected>

                <Stack.Protected guard={isAuthenticated}>
                  <Stack.Screen name="(tabs)" />
                </Stack.Protected>
              </Stack>
            )}
          </KeyboardProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingScreen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
})
