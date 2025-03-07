// 导入测试库
// Import testing libraries
require('@testing-library/jest-dom')

// 导入测试库的扩展方法
// Import testing library extensions
require('@testing-library/jest-dom');

// 模拟matchMedia，用于响应式设计测试
// Mock matchMedia for responsive design testing
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
});

// 模拟ResizeObserver
// Mock ResizeObserver for element size monitoring
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// 模拟Intersection Observer
// Mock Intersection Observer for element visibility detection
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
}

// 模拟fetch API
// Mock fetch API for network requests
global.fetch = jest.fn();

// 设置测试环境变量
// Set test environment variables
process.env.NEXT_PUBLIC_API_URL = 'http://localhost:3000/api' 