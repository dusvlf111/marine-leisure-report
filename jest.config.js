const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Next.js 앱의 루트 디렉토리 경로
  dir: './',
})

// Jest 설정 객체
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/index.ts',
    '!src/app/layout.tsx',
    '!src/app/globals.css',
  ],
  moduleNameMapper: {
    // path mapping 설정 (tsconfig.json과 동일)
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    // TypeScript 파일 변환
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.(test|spec).{js,jsx,ts,tsx}',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
}

// createJestConfig는 비동기 함수이므로 이렇게 export 해야 합니다
module.exports = createJestConfig(customJestConfig)
