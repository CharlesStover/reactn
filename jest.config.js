module.exports = {
  cacheDirectory: './jest/cache',
  collectCoverage: false,
  collectCoverageFrom: [
    'src/**/*',
  ],
  coverageDirectory: './jest/coverage',
  preset: 'ts-jest',
  resetMocks: true,
  resetModules: true,
  restoreMocks: true,
  roots: [ "<rootDir>/tests" ],
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect',
    '@testing-library/react/cleanup-after-each',
  ],
  testRegex: '/tests/.+\\.test\\.tsx?$',
  verbose: false,
};
