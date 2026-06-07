const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: 'tests',
  use: {
    baseURL: 'https://www.saucedemo.com',
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'default',
      testMatch: ['**/*.spec.js', '!visual/**/*.spec.js'],
    },
    {
      name: 'visual',
      testMatch: 'visual/**/*.spec.js',
    },
    {
      name: 'performance',
      testMatch: 'performance.spec.js',
    },
  ],
});
