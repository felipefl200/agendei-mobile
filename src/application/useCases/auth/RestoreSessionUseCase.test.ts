import { describe, expect, it, vi } from 'vitest'
import { userFixture } from '@/test/fixtures'
import { RestoreSessionUseCase } from './RestoreSessionUseCase'

function makeSut() {
  const authGateway = {
    getCurrentUser: vi.fn(),
    login: vi.fn(),
    logout: vi.fn(),
    register: vi.fn(),
  }
  const authTokenStorage = {
    getToken: vi.fn(),
    removeToken: vi.fn(),
    setToken: vi.fn(),
  }
  const sut = new RestoreSessionUseCase(authGateway, authTokenStorage)

  return { authGateway, authTokenStorage, sut }
}

describe('RestoreSessionUseCase', () => {
  it('returns null when there is no stored token', async () => {
    const { authGateway, authTokenStorage, sut } = makeSut()
    authTokenStorage.getToken.mockResolvedValue(null)

    await expect(sut.execute()).resolves.toBeNull()
    expect(authGateway.getCurrentUser).not.toHaveBeenCalled()
  })

  it('returns user and token when session is valid', async () => {
    const { authGateway, authTokenStorage, sut } = makeSut()
    authTokenStorage.getToken.mockResolvedValue('token-1')
    authGateway.getCurrentUser.mockResolvedValue(userFixture)

    await expect(sut.execute()).resolves.toEqual({ token: 'token-1', user: userFixture })
  })

  it('removes token and propagates error when current user fails', async () => {
    const { authGateway, authTokenStorage, sut } = makeSut()
    const error = new Error('Unauthorized')
    authTokenStorage.getToken.mockResolvedValue('token-1')
    authGateway.getCurrentUser.mockRejectedValue(error)

    await expect(sut.execute()).rejects.toBe(error)
    expect(authTokenStorage.removeToken).toHaveBeenCalled()
  })
})
