import { beforeEach, describe, expect, it, vi } from 'vitest'
import { patientFixture } from '@/test/fixtures'
import { ApiPatientProfileAdapter } from './ApiPatientProfileAdapter'

const httpClientMock = vi.hoisted(() => ({
  get: vi.fn(),
  httpMultipartFilePutJson: vi.fn(),
  patch: vi.fn(),
}))

vi.mock('@/infra/http/client', () => ({
  httpClient: httpClientMock,
  httpMultipartFilePutJson: httpClientMock.httpMultipartFilePutJson,
}))

function jsonResponse(data: unknown) {
  return { json: vi.fn().mockResolvedValue(data) }
}

describe('ApiPatientProfileAdapter', () => {
  beforeEach(() => {
    vi.unstubAllGlobals()
  })

  it('uploads avatar using multipart profile endpoint', async () => {
    httpClientMock.httpMultipartFilePutJson.mockResolvedValue({
      profile: {
        avatarUrl: 'https://example.com/avatar.webp',
        type: 'patient',
      },
    })

    await expect(
      new ApiPatientProfileAdapter().updateAvatar({
        name: 'avatar.webp',
        type: 'image/webp',
        uri: 'file://avatar.webp',
      }),
    ).resolves.toEqual({
      avatarUrl: 'https://example.com/avatar.webp',
      type: 'patient',
    })

    expect(httpClientMock.httpMultipartFilePutJson).toHaveBeenCalledWith('profile/avatar', {
      fieldName: 'avatar',
      mimeType: 'image/webp',
      uri: 'file://avatar.webp',
    })
  })

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
