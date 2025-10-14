import type { Config } from "jest";

const config: Config = {
    roots: ["./src", "./__tests__"],
    collectCoverageFrom: ["./src/**/*.ts"],
    setupFiles: ["<rootDir>/.jest/set-env-vars.ts"],
    preset: "ts-jest",
    testEnvironment: "node",
    verbose: true,
    collectCoverage: true,
    coverageDirectory: "coverage",
    coverageProvider: "v8",
    moduleDirectories: ["<rootDir>", "node_modules"],
    modulePaths: ["<rootDir>"],
    testTimeout: 30000,
    moduleNameMapper: {
        "^src/(.*)$": "<rootDir>/src/$1",
    },
};

export default config;
