module.exports = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], // Setup for testing-library
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest", // Transform JS/JSX files
  },
  testEnvironment: "jsdom", // Required for React component testing
  moduleNameMapper: {
    "\\.(css|scss|sass)$": "identity-obj-proxy", // Mock CSS imports
  },
  transformIgnorePatterns: ["/node_modules/"], // Ensure Jest ignores node_modules
};
