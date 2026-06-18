import { beforeEach, describe, expect, it, vi } from 'vitest'
import { secureStoreMock } from '@/test/mocks/secureStore'
import {
  httpClient,
  httpMultipartFilePutJson,
  httpMultipartPut,
  setUnauthorizedHandler,
} from './client'

const fileSystemMock = vi.hoisted(() => ({
  upload: vi.fn(),
  uris: [] as string[],
}))

vi.mock('expo-file-system', () => ({
  File: class FileMock {
    constructor(uri: string) {
      fileSystemMock.uris.push(uri)
    }

    upload(url: string, options: unknown) {
      return fileSystemMock.upload(url, options)
    }
  },
  UploadType: { MULTIPART: 1 },
}))

describe('httpClient', () => {
  beforeEach(() => {
    setUnauthorizedHandler(null)
    fileSystemMock.upload.mockReset()
    fileSystemMock.uris = []
    vi.unstubAllGlobals()
  })

  it('injects Authorization header when token exists', async () => {
    secureStoreMock.getItemAsync.mockResolvedValue('token-1')
    const fetchMock = vi.fn().mockImplementation(() =>
      Promise.resolve(new Response(JSON.stringify({ ok: true }), {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      })),
    )
    vi.stubGlobal('fetch', fetchMock)

    await httpClient.get('profile').json()

    const request = fetchMock.mock.calls[0][0] as Request
    expect(request.headers.get('Authorization')).toBe('Bearer token-1')
  })

  it('lets ky set content type for json and multipart requests', async () => {
    secureStoreMock.getItemAsync.mockResolvedValue(null)
    const fetchMock = vi.fn().mockImplementation(() =>
      Promise.resolve(new Response(JSON.stringify({ ok: true }), {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      })),
    )
    vi.stubGlobal('fetch', fetchMock)

    await httpClient.post('profile', { json: { name: 'Ana' } }).json()

    const jsonRequest = fetchMock.mock.calls[0][0] as Request
    expect(jsonRequest.headers.get('Content-Type')).toContain('application/json')

    const formData = new FormData()
    formData.append('avatar', new Blob(['avatar'], { type: 'image/png' }), 'avatar.png')

    await httpClient.put('profile/avatar', { body: formData }).json()

    const multipartRequest = fetchMock.mock.calls[1][0] as Request
    expect(multipartRequest.headers.get('Content-Type')).not.toBe('application/json')
  })

  it('uploads multipart directly without forcing content type', async () => {
    secureStoreMock.getItemAsync.mockResolvedValue('token-1')
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ profile: { avatarUrl: 'url', type: 'patient' } }), {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      }),
    )
    vi.stubGlobal('fetch', fetchMock)

    const formData = new FormData()
    await httpMultipartPut('profile/avatar', formData)

    const [, init] = fetchMock.mock.calls[0] as [string, RequestInit]
    const headers = init.headers as Headers

    expect(init.body).toBe(formData)
    expect(init.method).toBe('PUT')
    expect(headers.get('Authorization')).toBe('Bearer token-1')
    expect(headers.get('Accept')).toBe('application/json')
    expect(headers.get('Content-Type')).toBeNull()
  })

  it('uploads multipart files using expo file upload', async () => {
    secureStoreMock.getItemAsync.mockResolvedValue('token-1')
    fileSystemMock.upload.mockResolvedValue({
      body: JSON.stringify({ profile: { avatarUrl: 'url', type: 'patient' } }),
      headers: { 'content-type': 'application/json' },
      status: 200,
    })

    await expect(
      httpMultipartFilePutJson('profile/avatar', {
        fieldName: 'avatar',
        mimeType: 'image/jpeg',
        uri: 'file://avatar.jpg',
      }),
    ).resolves.toEqual({ profile: { avatarUrl: 'url', type: 'patient' } })

    expect(fileSystemMock.uris).toEqual(['file://avatar.jpg'])
    expect(fileSystemMock.upload).toHaveBeenCalledWith('http://localhost:3333/profile/avatar', {
      fieldName: 'avatar',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer token-1',
      },
      httpMethod: 'PUT',
      mimeType: 'image/jpeg',
      uploadType: 1,
    })
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
