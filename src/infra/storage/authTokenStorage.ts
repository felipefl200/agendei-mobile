import * as SecureStore from 'expo-secure-store'
import { AuthTokenStorage } from '@/domain/ports/AuthTokenStorage'

const AUTH_TOKEN_KEY = 'agendei.authToken'

async function getAuthToken() {
  return SecureStore.getItemAsync(AUTH_TOKEN_KEY)
}

async function setAuthToken(token: string) {
  await SecureStore.setItemAsync(AUTH_TOKEN_KEY, token)
}

async function removeAuthToken() {
  await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY)
}

const secureAuthTokenStorage: AuthTokenStorage = {
  getToken: getAuthToken,
  setToken: setAuthToken,
  removeToken: removeAuthToken,
}

export { getAuthToken, removeAuthToken, secureAuthTokenStorage, setAuthToken }
