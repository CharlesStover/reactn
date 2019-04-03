module.exports = {
  cacheDirectory: './jest/cache',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*',
  ],
  coverageDirectory: './jest/coverage',
  preset: 'ts-jest',
  resetMocks: true,
  resetModules: true,
  restoreMocks: true,
  roots: [ "<rootDir>/tests" ],
  testRegex: '/tests/.*\\.test\\.tsx?$',
  verbose: true,
};
