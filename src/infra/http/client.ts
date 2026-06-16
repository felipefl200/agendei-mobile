import ky from 'ky'
import { AppError, appErrorPayloadSchema } from '@/domain/errors/AppError'
import { getAuthToken, removeAuthToken } from '@/infra/storage/authTokenStorage'

type UnauthorizedHandler = () => void | Promise<void>

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
    const parsed = appErrorPayloadSchema.safeParse(data)

    if (parsed.success) {
      return AppError.fromPayload(parsed.data, response.status)
    }

    return AppError.fromUnknown(response.status)
  } catch {
    return AppError.fromUnknown(response.status)
  }
}

const httpClient = ky.create({
  prefix: apiUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
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

export { httpClient, setUnauthorizedHandler }
