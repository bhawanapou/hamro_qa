// @ts-check
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * Hamro Patro QA Automation Framework - Playwright Configuration
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  outputDir: './test-results',
  timeout: 60_000, // Maximum time one test can run
  expect: {
    timeout: 15_000, // Expect timeout for assertions
  },
  fullyParallel: true, // Run tests in files in parallel
  forbidOnly: !!process.env.CI, // Fail the build on CI if you accidentally left test.only in the source code
  retries: process.env.CI ? 2 : 1, // Retry failed tests
  workers: 1, // Use single worker to avoid mock server contention
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['list'],
  ],
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    headless: true, // run in headless mode by default for faster execution
    screenshot: 'only-on-failure', // Screenshots on failure
    video: 'retain-on-failure', // Video on failure
    trace: 'on-first-retry', // Collect trace on first retry
    navigationTimeout: 30_000, // Navigation timeout
    actionTimeout: 15_000, // Action timeout
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true, // ignore certificate issues during testing
    acceptDownloads: true, // accept downloads
    locale: 'en-US',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'], hasTouch: true },
    },
  ],
});
