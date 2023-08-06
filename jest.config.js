module.exports = {
  testMatch: ['<rootDir>/tests/**/*.test.js'],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
};

// module.exports = {
//   moduleFileExtensions: ['js', 'jsx'],
//   moduleDirectories: ['node_modules', 'bower_components', 'shared'],
// };