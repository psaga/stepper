/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '\\.(css|scss)$': 'jest-css-modules-transform',
  },
  moduleNameMapper: {
    '\\.svg\\?react$': '<rootDir>/declaratives.d.ts',
  },
};
