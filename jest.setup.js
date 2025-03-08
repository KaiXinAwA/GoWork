// 导入测试工具库
// Import testing utilities
import '@testing-library/jest-dom'

// 模拟 next/navigation
// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
      pathname: '/',
      query: {},
    }
  },
  useSearchParams() {
    return {
      get: jest.fn(),
      getAll: jest.fn(),
      has: jest.fn(),
      forEach: jest.fn(),
      entries: jest.fn(),
      values: jest.fn(),
      keys: jest.fn(),
      toString: jest.fn(),
    }
  },
  usePathname() {
    return '/'
  },
}))

// 模拟 next-auth
// Mock next-auth
jest.mock('next-auth', () => ({
  getServerSession: jest.fn(),
}))

// 模拟 next/server
// Mock next/server
jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((data) => ({
      json: () => Promise.resolve(data),
    })),
    redirect: jest.fn(),
  },
}))

// 设置全局的 fetch mock
// Set up global fetch mock
global.fetch = jest.fn()

// 模拟 window.matchMedia
// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// 清除所有模拟
// Clear all mocks after each test
afterEach(() => {
  jest.clearAllMocks()
}) 