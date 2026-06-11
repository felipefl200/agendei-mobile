interface AuthTokenStorage {
  getToken(): Promise<string | null>
  setToken(token: string): Promise<void>
  removeToken(): Promise<void>
}

export type { AuthTokenStorage }
