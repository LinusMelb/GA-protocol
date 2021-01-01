module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    coverageDirectory: 'coverage',
    collectCoverage: true,
    transform: {
      '^.+\\.ts?$': 'ts-jest'
    },
    testMatch: [
      '**/test/**/*.ts'
    ],
    verbose: true,
    collectCoverageFrom: [
      '**/src/**/*.ts'
    ],
    testPathIgnorePatterns: [
      'dist.*\\.ts$'
    ],
  }