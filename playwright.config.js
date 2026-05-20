// @ts-check
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * Playwright configuration optimized for academic use and low-end laptops.
 */
export default defineConfig({
  testDir: './tests',
  outputDir: './test-results',
  timeout: 30_000, // maximum time a single test can run
  expect: {
    timeout: 8_000, // default time for Playwright assertions
  },
  fullyParallel: false, // run tests with a single worker for stability
  forbidOnly: !!process.env.CI, // fail if test.only is left in code
  retries: 1, // one retry to reduce false negatives while keeping execution light
  workers: 1, // single worker to keep CPU and memory use low
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['list'],
  ],
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    headless: true, // run in headless mode by default for faster execution
    screenshot: 'only-on-failure', // capture only failed test screenshots
    video: 'off', // disable video recording to save disk space
    trace: 'on-first-retry', // collect trace only when retrying failures
    navigationTimeout: 25_000, // timeout for page navigation
    actionTimeout: 12_000, // timeout for user actions like click/type
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true, // ignore certificate issues during testing
    acceptDownloads: false, // disable downloads by default for speed
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
