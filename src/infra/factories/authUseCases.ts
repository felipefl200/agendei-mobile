import { LoginUseCase, LogoutUseCase, RegisterUseCase, RestoreSessionUseCase } from '@/application/useCases/auth'
import { ApiAuthAdapter } from '@/infra/adapters/ApiAuthAdapter'
import { secureAuthTokenStorage } from '@/infra/storage/authTokenStorage'

const apiAuthAdapter = new ApiAuthAdapter()

const loginUseCase = new LoginUseCase(apiAuthAdapter, secureAuthTokenStorage)
const registerUseCase = new RegisterUseCase(apiAuthAdapter, secureAuthTokenStorage)
const restoreSessionUseCase = new RestoreSessionUseCase(apiAuthAdapter, secureAuthTokenStorage)
const logoutUseCase = new LogoutUseCase(apiAuthAdapter)

export { loginUseCase, logoutUseCase, registerUseCase, restoreSessionUseCase }
