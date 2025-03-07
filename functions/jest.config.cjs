const shelfPreset = require('@shelf/jest-mongodb/jest-preset');
const tsPreset = require('ts-jest/jest-preset')

module.exports = {
  roots: ["<rootDir>/src"],
  ...tsPreset,
  ...shelfPreset,
  collectCoverage: false,
  collectCoverageFrom: [
    "**/*.ts",
    "!**/node_modules/**",
    "!**/tests/**",
  ],
  coverageReporters: ['clover', 'json', 'lcov', ['text', {skipFull: true}]],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 60,
      statements: -10,
    },
  },
  testMatch: [
    '**/tests/**/*.test.ts'
  ],
};
