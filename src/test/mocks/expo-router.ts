import { vi } from 'vitest'
import { ReactNode } from 'react'

type SearchParams = Record<string, string | string[] | undefined>

let localSearchParams: SearchParams = {}

const routerMock = {
  back: vi.fn(),
  push: vi.fn(),
  replace: vi.fn(),
}

function setLocalSearchParams(params: SearchParams) {
  localSearchParams = params
}

function resetExpoRouterMock() {
  localSearchParams = {}
  routerMock.back.mockReset()
  routerMock.push.mockReset()
  routerMock.replace.mockReset()
}

function useRouter() {
  return routerMock
}

function useLocalSearchParams() {
  return localSearchParams
}

function Redirect() {
  return null
}

function Link({ children }: { children: ReactNode }) {
  return children
}

export {
  Link,
  Redirect,
  resetExpoRouterMock,
  routerMock,
  setLocalSearchParams,
  useLocalSearchParams,
  useRouter,
}
