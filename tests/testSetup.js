import { test as base, expect } from '@playwright/test';
import { screenshotHelper } from '../utils/screenshotHelper.js';
import { logger } from '../utils/logger.js';

export const test = base.extend({
  page: async ({ page }, use, testInfo) => {
    await use(page);

    if (testInfo.status !== testInfo.expectedStatus) {
      const filepath = await screenshotHelper.captureOnFailure(page, testInfo);
      logger.error(`Test failed: ${testInfo.title}. Screenshot saved at ${filepath}`);
    }
  },
});

export { expect };
