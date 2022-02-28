/* eslint-disable */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    globals: {
      // we must specify a custom tsconfig for tests because we need the typescript transform
      // to transform jsx into js rather than leaving it jsx such as the next build requires.  you
      // can see this setting in tsconfig.jest.json -> "jsx": "react"
      "ts-jest": {
        tsconfig: "tsconfig.json"
      }
    },
    snapshotSerializers: ["enzyme-to-json/serializer"],

    // Problem: Jest is hitting these CSS imports and 
    // trying to parse them as if they were JavaScript.
    // Solution: whenver parse .css/less files, parse styleMock.js file instead
    moduleNameMapper: {
      '\\.(css|less)$': '<rootDir>/test/jest/__mocks__/styleMock.js',
    }
  };