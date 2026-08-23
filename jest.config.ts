import nextJest from 'next/jest.js';
import type { Config } from 'jest';

const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/', '/.next/', '/.storybook/', '/e2e/'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  modulePathIgnorePatterns: ['node_modules', '.jest-test-results.json'],
  testMatch: ['**/*.test.ts', '**/*.test.tsx'],
};

export default createJestConfig(config);
