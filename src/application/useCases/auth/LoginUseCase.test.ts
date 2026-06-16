import { describe, expect, it, vi } from 'vitest'
import { userFixture } from '@/test/fixtures'
import { LoginUseCase } from './LoginUseCase'

function makeSut() {
  const authGateway = {
    getCurrentUser: vi.fn(),
    login: vi.fn(),
    register: vi.fn(),
  }
  const authTokenStorage = {
    getToken: vi.fn(),
    removeToken: vi.fn(),
    setToken: vi.fn(),
  }
  const sut = new LoginUseCase(authGateway, authTokenStorage)

  return { authGateway, authTokenStorage, sut }
}

describe('LoginUseCase', () => {
  it('normalizes email, stores token and returns the session', async () => {
    const { authGateway, authTokenStorage, sut } = makeSut()
    const session = { token: 'token-1', user: userFixture }
    authGateway.login.mockResolvedValue(session)

    await expect(
      sut.execute({ email: ' ANA@Example.COM ', password: 'secret' }),
    ).resolves.toBe(session)

    expect(authGateway.login).toHaveBeenCalledWith({
      email: 'ana@example.com',
      password: 'secret',
    })
    expect(authTokenStorage.setToken).toHaveBeenCalledWith('token-1')
  })

  it('does not store token when gateway fails', async () => {
    const { authGateway, authTokenStorage, sut } = makeSut()
    const error = new Error('Invalid credentials')
    authGateway.login.mockRejectedValue(error)

    await expect(sut.execute({ email: 'ana@example.com', password: 'bad' })).rejects.toBe(error)
    expect(authTokenStorage.setToken).not.toHaveBeenCalled()
  })
})
