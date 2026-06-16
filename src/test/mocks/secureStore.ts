import { vi } from 'vitest'

const secureStoreMock = {
  deleteItemAsync: vi.fn(),
  getItemAsync: vi.fn(),
  setItemAsync: vi.fn(),
}

export { secureStoreMock }
