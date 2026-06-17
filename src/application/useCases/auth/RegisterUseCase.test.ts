import { describe, expect, it, vi } from 'vitest'
import { specialtyFixture, userFixture } from '@/test/fixtures'
import { RegisterUseCase } from './RegisterUseCase'

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
  const sut = new RegisterUseCase(authGateway, authTokenStorage)

  return { authGateway, authTokenStorage, sut }
}

describe('RegisterUseCase', () => {
  it('normalizes name and email, stores token and returns the session', async () => {
    const { authGateway, authTokenStorage, sut } = makeSut()
    const session = {
      patient: {
        avatarUrl: null,
        birthDate: null,
        createdAt: specialtyFixture.createdAt,
        document: null,
        id: 'patient-1',
        phone: null,
        updatedAt: specialtyFixture.updatedAt,
        userId: userFixture.id,
      },
      token: 'token-1',
      user: userFixture,
    }
    authGateway.register.mockResolvedValue(session)

    await expect(
      sut.execute({ email: ' ANA@Example.COM ', name: ' Ana Paciente ', password: 'secret' }),
    ).resolves.toBe(session)

    expect(authGateway.register).toHaveBeenCalledWith({
      email: 'ana@example.com',
      name: 'Ana Paciente',
      password: 'secret',
    })
    expect(authTokenStorage.setToken).toHaveBeenCalledWith('token-1')
  })

  it('does not store token when gateway fails', async () => {
    const { authGateway, authTokenStorage, sut } = makeSut()
    const error = new Error('E-mail already registered')
    authGateway.register.mockRejectedValue(error)

    await expect(
      sut.execute({ email: 'ana@example.com', name: 'Ana', password: 'secret' }),
    ).rejects.toBe(error)
    expect(authTokenStorage.setToken).not.toHaveBeenCalled()
  })
})
