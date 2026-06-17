import { beforeEach, describe, expect, it, vi } from 'vitest'
import { LogoutUseCase } from './LogoutUseCase'
import { AuthGateway } from '@/domain/ports/AuthGateway'

describe('LogoutUseCase', () => {
  let authGatewayMock: AuthGateway
  let logoutUseCase: LogoutUseCase

  beforeEach(() => {
    authGatewayMock = {
      login: vi.fn(),
      register: vi.fn(),
      getCurrentUser: vi.fn(),
      logout: vi.fn(),
    }
    logoutUseCase = new LogoutUseCase(authGatewayMock)
  })

  it('deve chamar o metodo logout do authGateway', async () => {
    await logoutUseCase.execute()
    
    expect(authGatewayMock.logout).toHaveBeenCalledTimes(1)
  })
})
