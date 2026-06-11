import * as SecureStore from 'expo-secure-store'

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

export { getAuthToken, removeAuthToken, setAuthToken }
