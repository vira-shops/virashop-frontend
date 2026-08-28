import nextJest from 'next/jest.js';
import type { Config } from 'jest';

const createJestConfig = nextJest();

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/', '/.next/', '/.storybook/', '/e2e/'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  modulePathIgnorePatterns: ['node_modules', '.jest-test-results.json'],
  testMatch: ['**/*.test.ts', '**/*.test.tsx'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@icons$': '<rootDir>/src/components/shared/icons/index.ts',
    '^@icons/(.*)$': '<rootDir>/src/components/shared/icons/$1',
    '^~/(.*)$': '<rootDir>/$1',
  },
};

export default createJestConfig(config);
