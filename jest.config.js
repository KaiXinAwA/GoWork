module.exports = {
  // 测试环境为 jsdom，模拟浏览器环境
  // Test environment is jsdom, simulating browser environment
  testEnvironment: 'jsdom',
  
  // 模块名称映射，处理路径别名
  // Module name mappings, handling path aliases
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
  },
  
  // 设置测试覆盖率收集
  // Set up test coverage collection
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/.next/**',
    '!**/coverage/**',
    '!jest.config.js',
    '!next.config.mjs',
  ],
  
  // 设置测试文件匹配模式
  // Set test file matching patterns
  testMatch: [
    '<rootDir>/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/**/*.{spec,test}.{js,jsx,ts,tsx}',
  ],
  
  // 设置需要转换的文件
  // Set files that need transformation
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  
  // 设置需要转换的模块
  // Set modules that need transformation
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  
  // 设置测试环境的设置文件
  // Set up files for test environment
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  // 设置测试环境变量
  // Set test environment variables
  testEnvironmentOptions: {
    url: 'http://localhost:3000',
  },

  // 设置测试覆盖率阈值
  // Set test coverage thresholds
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },

  // 设置测试超时时间
  // Set test timeout
  testTimeout: 10000,
} 