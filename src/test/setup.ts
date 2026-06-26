import '@testing-library/jest-dom/vitest'
import { afterAll, afterEach, beforeAll, beforeEach } from 'vitest'
import { server } from './msw/server'

function createStorageMock() {
  const store = new Map<string, string>()

  return {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => {
      store.set(key, value)
    },
    removeItem: (key: string) => {
      store.delete(key)
    },
    clear: () => {
      store.clear()
    },
    get length() {
      return store.size
    },
    key: (index: number) => Array.from(store.keys())[index] ?? null,
  }
}

Object.defineProperty(window, 'localStorage', {
  value: createStorageMock(),
  writable: true,
})

Object.defineProperty(window, 'sessionStorage', {
  value: createStorageMock(),
  writable: true,
})

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
beforeEach(() => {
  window.localStorage.clear()
  window.sessionStorage.clear()
})
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
