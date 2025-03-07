/** @type {import('jest').Config} */
module.exports = {
  // 设置测试环境为jsdom，用于模拟浏览器环境
  // Set test environment to jsdom to simulate browser environment
  testEnvironment: 'jsdom',
  
  // 定义测试文件的匹配规则
  // Define patterns to match test files
  testMatch: [
    "**/__tests__/**/*.ts?(x)",  // 匹配 __tests__ 目录下的所有测试文件
    "**/?(*.)+(spec|test).ts?(x)" // 匹配以 .spec.ts(x) 或 .test.ts(x) 结尾的文件
  ],
  
  // 配置测试覆盖率收集范围
  // Configure test coverage collection scope
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
    "!**/.next/**",
    "!**/coverage/**"
  ],
  
  // 设置模块别名，与tsconfig.json保持一致
  // Set module aliases to match tsconfig.json
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    // 处理样式文件和静态资源
    // Handle style files and static assets
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js"
  },
  
  // 在每个测试文件之前运行的设置文件
  // Setup files to run before each test file
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  
  // 配置转换器
  // Configure transformers
  transform: {
    "^.+\\.(ts|tsx)$": "babel-jest"
  },
  
  // 配置覆盖率阈值
  // Configure coverage thresholds
  coverageThreshold: {
    global: {
      branches: 60, // 降低初始阈值
      functions: 70,
      lines: 70,
      statements: 70
    }
  },
  
  // 测试超时设置（毫秒）
  // Test timeout setting (in milliseconds)
  testTimeout: 10000
}