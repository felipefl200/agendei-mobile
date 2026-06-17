import { describe, expect, it, vi } from 'vitest'
import { patientFixture } from '@/test/fixtures'
import { GetPatientProfileUseCase } from './GetPatientProfileUseCase'
import { UpdatePatientPasswordUseCase } from './UpdatePatientPasswordUseCase'
import { UpdatePatientProfileUseCase } from './UpdatePatientProfileUseCase'

function makeGateway() {
  return {
    getMe: vi.fn(),
    updateMe: vi.fn(),
    updatePassword: vi.fn(),
  }
}

describe('profile use cases', () => {
  it('gets current patient profile', async () => {
    const gateway = makeGateway()
    gateway.getMe.mockResolvedValue(patientFixture)

    await expect(new GetPatientProfileUseCase(gateway).execute()).resolves.toBe(patientFixture)
  })

  it('normalizes editable profile fields', async () => {
    const gateway = makeGateway()
    gateway.updateMe.mockResolvedValue(patientFixture)

    await new UpdatePatientProfileUseCase(gateway).execute({
      birthDate: '15/04/1988',
      document: '123.456.789-00',
      email: ' ANA@Example.COM ',
      name: ' Ana Paciente ',
      phone: '(11) 98765-4321',
    })

    expect(gateway.updateMe).toHaveBeenCalledWith({
      birthDate: '1988-04-15',
      document: '12345678900',
      email: 'ana@example.com',
      name: 'Ana Paciente',
      phone: '11987654321',
    })
  })

  it('rejects empty profile updates', async () => {
    await expect(new UpdatePatientProfileUseCase(makeGateway()).execute({})).rejects.toThrow(
      'Informe ao menos um dado para atualizar.',
    )
  })

  it('validates password confirmation and delegates valid password changes', async () => {
    const gateway = makeGateway()
    const useCase = new UpdatePatientPasswordUseCase(gateway)

    await expect(
      useCase.execute({
        currentPassword: 'current123',
        newPassword: 'newpass123',
        passwordConfirmation: 'different',
      }),
    ).rejects.toThrow('As senhas não conferem.')

    await useCase.execute({
      currentPassword: 'current123',
      newPassword: 'newpass123',
      passwordConfirmation: 'newpass123',
    })

    expect(gateway.updatePassword).toHaveBeenCalledWith({
      currentPassword: 'current123',
      newPassword: 'newpass123',
    })
  })
})
