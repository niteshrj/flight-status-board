module.exports = {
  "rootDir": "../",
  "testEnvironment": "jsdom",
  "moduleNameMapper": {
    "^.+\\.svg$": "jest-svg-transformer",
    "^.+\\.(css|less|scss)$": "identity-obj-proxy",
    '\^.+\.(png|jpg|webp|ttf|woff|woff2|svg|mp4)$': 'jest-transform-stub'
  },
  "setupFilesAfterEnv": [
    "<rootDir>/config/setupTests.ts",
    "@testing-library/jest-dom/extend-expect"
  ],
  reporters: [
    "default",
    [
      "jest-html-reporters",
      {
        publicPath: "./coverage/html-report",
        filename: "report.html",
      },
    ],
  ],
  collectCoverageFrom: [
    '!*.d.ts',
    "src/**/*.{js,ts,jsx,tsx}",
    "!src/main.tsx",
    "!src/vite-env.d.ts",
  ],
  coverageReporters: ["text"],

  coverageThreshold: {
    global: {
      branches: 80,
      functions: 70,
      lines: 80,
      statements: 80,
    },
  },
};
