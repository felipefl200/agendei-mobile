import ky from 'ky'
import { File, UploadType } from 'expo-file-system'
import { AppError, appErrorPayloadSchema } from '@/domain/errors/AppError'
import { getAuthToken, removeAuthToken } from '@/infra/storage/authTokenStorage'

type UnauthorizedHandler = () => void | Promise<void>

interface MultipartFilePutInput {
  fieldName: string
  mimeType: string
  uri: string
}

const apiUrl = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3333'

let unauthorizedHandler: UnauthorizedHandler | null = null

function setUnauthorizedHandler(handler: UnauthorizedHandler | null) {
  unauthorizedHandler = handler
}

async function handleUnauthorized() {
  await removeAuthToken()
  await unauthorizedHandler?.()
}

async function parseErrorResponse(response: Response) {
  try {
    const data = await response.clone().json()
    return parseErrorData(data, response.status)
  } catch {
    return AppError.fromUnknown(response.status)
  }
}

function parseErrorData(data: unknown, status: number) {
  const parsed = appErrorPayloadSchema.safeParse(data)

  if (parsed.success) {
    return AppError.fromPayload(parsed.data, status)
  }

  return AppError.fromUnknown(status)
}

function getHeader(headers: Record<string, string>, name: string) {
  const header = Object.entries(headers).find(
    ([key]) => key.toLowerCase() === name.toLowerCase(),
  )

  return header?.[1] ?? ''
}

const httpClient = ky.create({
  prefix: apiUrl,
  headers: {
    Accept: 'application/json',
  },
  hooks: {
    beforeRequest: [
      async ({ request }) => {
        const token = await getAuthToken()

        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`)
        }
      },
    ],
    afterResponse: [
      async ({ request, response }) => {
        const contentType = response.headers.get('Content-Type') ?? ''
        const isJson = contentType.includes('application/json')

        if (response.ok && !isJson) {
          throw AppError.fromUnknown(response.status)
        }

        if (response.ok) {
          return response
        }

        const error = await parseErrorResponse(response)

        if (response.status === 401) {
          await handleUnauthorized()
        }

        throw error
      },
    ],
  },
})

async function httpMultipartPut(path: string, body: FormData) {
  const token = await getAuthToken()
  const headers = new Headers({ Accept: 'application/json' })

  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  const baseUrl = apiUrl.replace(/\/$/, '')
  const response = await fetch(`${baseUrl}/${path.replace(/^\//, '')}`, {
    body,
    headers,
    method: 'PUT',
  })
  const contentType = response.headers.get('Content-Type') ?? ''
  const isJson = contentType.includes('application/json')

  if (response.ok && !isJson) {
    throw AppError.fromUnknown(response.status)
  }

  if (response.ok) {
    return response
  }

  const error = await parseErrorResponse(response)

  if (response.status === 401) {
    await handleUnauthorized()
  }

  throw error
}

async function httpMultipartFilePutJson(path: string, input: MultipartFilePutInput) {
  const token = await getAuthToken()
  const headers: Record<string, string> = { Accept: 'application/json' }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const baseUrl = apiUrl.replace(/\/$/, '')
  const result = await new File(input.uri).upload(`${baseUrl}/${path.replace(/^\//, '')}`, {
    fieldName: input.fieldName,
    headers,
    httpMethod: 'PUT',
    mimeType: input.mimeType,
    uploadType: UploadType.MULTIPART,
  })

  const contentType = getHeader(result.headers, 'Content-Type')
  const isJson = contentType.includes('application/json')

  if (result.status >= 200 && result.status < 300) {
    if (!isJson) {
      throw AppError.fromUnknown(result.status)
    }

    return JSON.parse(result.body)
  }

  let data: unknown
  try {
    data = JSON.parse(result.body)
  } catch {
    data = null
  }

  const error = parseErrorData(data, result.status)

  if (result.status === 401) {
    await handleUnauthorized()
  }

  throw error
}

export { httpClient, httpMultipartFilePutJson, httpMultipartPut, setUnauthorizedHandler }
