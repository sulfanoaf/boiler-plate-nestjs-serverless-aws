import type { Config } from 'jest';

const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/{!(main|app.module),}.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  reporters: ['default'],
  coveragePathIgnorePatterns: ['<rootDir>/version.ts'],
};

export default config;
