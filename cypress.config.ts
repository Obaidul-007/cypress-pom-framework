import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    specPattern: 'cypress/e2e/**/*.spec.ts',
    supportFile: 'cypress/support/e2e.ts',
  },
  retries: {
    runMode: 1,
    openMode: 0
  },
  video: true,
  screenshotOnRunFailure: true,
});