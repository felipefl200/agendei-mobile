import { beforeEach, describe, expect, it, vi } from 'vitest'
import { userFixture } from '@/test/fixtures'
import { secureStoreMock } from '@/test/mocks/secureStore'
import { useAuthStore } from './useAuthStore'

const restoreSessionUseCaseMock = vi.hoisted(() => ({
  execute: vi.fn(),
}))

vi.mock('@/infra/factories/authUseCases', () => ({
  restoreSessionUseCase: restoreSessionUseCaseMock,
}))

describe('useAuthStore', () => {
  beforeEach(() => {
    useAuthStore.setState({
      isAuthenticated: false,
      isRestoring: true,
      token: null,
      user: null,
    })
  })

  it('signIn defines user, token and authenticated state', () => {
    useAuthStore.getState().signIn({ token: 'token-1', user: userFixture })

    expect(useAuthStore.getState()).toMatchObject({
      isAuthenticated: true,
      isRestoring: false,
      token: 'token-1',
      user: userFixture,
    })
  })

  it('signOut removes token and clears session state', async () => {
    useAuthStore.getState().signIn({ token: 'token-1', user: userFixture })

    await useAuthStore.getState().signOut()

    expect(secureStoreMock.deleteItemAsync).toHaveBeenCalledWith('agendei.authToken')
    expect(useAuthStore.getState()).toMatchObject({
      isAuthenticated: false,
      isRestoring: false,
      token: null,
      user: null,
    })
  })

  it('restoreSession syncs a valid session', async () => {
    restoreSessionUseCaseMock.execute.mockResolvedValue({ token: 'token-1', user: userFixture })

    await useAuthStore.getState().restoreSession()

    expect(useAuthStore.getState()).toMatchObject({
      isAuthenticated: true,
      isRestoring: false,
      token: 'token-1',
      user: userFixture,
    })
  })

  it('restoreSession clears state when restore fails', async () => {
    useAuthStore.getState().signIn({ token: 'token-1', user: userFixture })
    restoreSessionUseCaseMock.execute.mockRejectedValue(new Error('Unauthorized'))

    await useAuthStore.getState().restoreSession()

    expect(useAuthStore.getState()).toMatchObject({
      isAuthenticated: false,
      isRestoring: false,
      token: null,
      user: null,
    })
  })
})
