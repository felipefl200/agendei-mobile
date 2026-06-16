import { describe, expect, it, vi } from 'vitest'
import { userFixture } from '@/test/fixtures'
import { ApiAuthAdapter } from './ApiAuthAdapter'

const httpClientMock = vi.hoisted(() => ({
  get: vi.fn(),
  post: vi.fn(),
}))

vi.mock('@/infra/http/client', () => ({
  httpClient: httpClientMock,
}))

function jsonResponse(data: unknown) {
  return { json: vi.fn().mockResolvedValue(data) }
}

describe('ApiAuthAdapter', () => {
  it('parses login responses', async () => {
    httpClientMock.post.mockReturnValue(jsonResponse({ token: 'token-1', user: userFixture }))

    await expect(
      new ApiAuthAdapter().login({ email: 'ana@example.com', password: 'secret' }),
    ).resolves.toEqual({ token: 'token-1', user: userFixture })
    expect(httpClientMock.post).toHaveBeenCalledWith('auth/login', {
      json: { email: 'ana@example.com', password: 'secret' },
    })
  })

  it('rejects invalid login payloads', async () => {
    httpClientMock.post.mockReturnValue(jsonResponse({ token: 123 }))

    await expect(
      new ApiAuthAdapter().login({ email: 'ana@example.com', password: 'secret' }),
    ).rejects.toThrow()
  })

  it('parses current user responses', async () => {
    httpClientMock.get.mockReturnValue(jsonResponse({ user: userFixture }))

    await expect(new ApiAuthAdapter().getCurrentUser()).resolves.toEqual(userFixture)
  })
})
