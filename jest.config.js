module.exports = {
  cacheDirectory: './jest/cache',
  collectCoverage: false,
  collectCoverageFrom: ['src/**/*'],
  coverageDirectory: './jest/coverage',
  preset: 'ts-jest',
  resetMocks: true,
  resetModules: true,
  restoreMocks: true,
  roots: ['<rootDir>/tests'],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  testRegex: '/tests/.+\\.test\\.tsx?$',
  verbose: false,
};
