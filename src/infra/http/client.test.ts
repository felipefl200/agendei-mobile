import { beforeEach, describe, expect, it, vi } from 'vitest'
import { secureStoreMock } from '@/test/mocks/secureStore'
import { httpClient, setUnauthorizedHandler } from './client'

describe('httpClient', () => {
  beforeEach(() => {
    setUnauthorizedHandler(null)
    vi.unstubAllGlobals()
  })

  it('injects Authorization header when token exists', async () => {
    secureStoreMock.getItemAsync.mockResolvedValue('token-1')
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      }),
    )
    vi.stubGlobal('fetch', fetchMock)

    await httpClient.get('profile').json()

    const request = fetchMock.mock.calls[0][0] as Request
    expect(request.headers.get('Authorization')).toBe('Bearer token-1')
  })

  it('removes token and calls unauthorized handler on 401', async () => {
    secureStoreMock.getItemAsync.mockResolvedValue('token-1')
    const unauthorizedHandler = vi.fn()
    setUnauthorizedHandler(unauthorizedHandler)
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ message: 'Expired token' }), {
          headers: { 'Content-Type': 'application/json' },
          status: 401,
        }),
      ),
    )

    await expect(httpClient.get('private').json()).rejects.toMatchObject({
      message: 'Expired token',
      statusCode: 401,
    })
    expect(secureStoreMock.deleteItemAsync).toHaveBeenCalledWith('agendei.authToken')
    expect(unauthorizedHandler).toHaveBeenCalled()
  })

  it('throws AppError unknown for invalid error payloads', async () => {
    secureStoreMock.getItemAsync.mockResolvedValue(null)
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ message: 123 }), {
          headers: { 'Content-Type': 'application/json' },
          status: 500,
        }),
      ),
    )

    await expect(httpClient.get('broken').json()).rejects.toMatchObject({
      message: 'Unexpected error. Please try again.',
      statusCode: 500,
    })
  })
})
