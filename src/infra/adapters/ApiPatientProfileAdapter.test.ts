import { describe, expect, it, vi } from 'vitest'
import { patientFixture } from '@/test/fixtures'
import { ApiPatientProfileAdapter } from './ApiPatientProfileAdapter'

const httpClientMock = vi.hoisted(() => ({
  get: vi.fn(),
  patch: vi.fn(),
}))

vi.mock('@/infra/http/client', () => ({
  httpClient: httpClientMock,
}))

function jsonResponse(data: unknown) {
  return { json: vi.fn().mockResolvedValue(data) }
}

describe('ApiPatientProfileAdapter', () => {
  it('parses current patient profile responses', async () => {
    httpClientMock.get.mockReturnValue(jsonResponse({ patient: patientFixture }))

    await expect(new ApiPatientProfileAdapter().getMe()).resolves.toEqual(patientFixture)
    expect(httpClientMock.get).toHaveBeenCalledWith('patients/me')
  })

  it('updates patient profile with partial payload', async () => {
    const input = { name: 'Ana Martins', phone: null }
    httpClientMock.patch.mockReturnValue(jsonResponse({ patient: patientFixture }))

    await expect(new ApiPatientProfileAdapter().updateMe(input)).resolves.toEqual(patientFixture)
    expect(httpClientMock.patch).toHaveBeenCalledWith('patients/me', { json: input })
  })

  it('updates password on auth endpoint', async () => {
    httpClientMock.patch.mockReturnValue({})

    await expect(
      new ApiPatientProfileAdapter().updatePassword({
        currentPassword: 'current123',
        newPassword: 'newpass123',
      }),
    ).resolves.toBeUndefined()
    expect(httpClientMock.patch).toHaveBeenCalledWith('auth/me/password', {
      json: { currentPassword: 'current123', newPassword: 'newpass123' },
    })
  })

  it('rejects invalid profile payloads', async () => {
    httpClientMock.get.mockReturnValue(jsonResponse({ patient: { id: 1 } }))

    await expect(new ApiPatientProfileAdapter().getMe()).rejects.toThrow()
  })
})
