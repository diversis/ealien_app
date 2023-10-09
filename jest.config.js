const nextJest = require("next/jest");

const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
    dir: "./",
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
    // Add more setup options before each test is run
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
    roots: ["<rootDir>"],
    testEnvironment: "jest-environment-jsdom",
    modulePaths: ["<rootDir>"],
    moduleDirectories: ["node_modules", "lib", "src"],
    moduleNameMapper: {
        "swiper/css/bundle": "swiper/swiper-bundle.min.css",
    },
};

// createJestConfig is exported in this way to ensure that next/jest can load the Next.js configuration, which is async
module.exports = createJestConfig(customJestConfig);
