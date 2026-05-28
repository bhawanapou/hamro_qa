import { expect } from '@playwright/test';
import { logger } from '../utils/logger.js';

/**
 * Test Helper - Reusable helper methods for test suites
 */
export class TestHelper {
  /**
   * Wait for network idle state
   */
  static async waitForPageReady(page) {
    await page.waitForLoadState('load');
    await page.waitForLoadState('load');
  }

  /**
   * Scroll to the bottom of the page
   */
  static async scrollToBottom(page) {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);
  }

  /**
   * Scroll to a specific element
   */
  static async scrollToElement(locator) {
    await locator.scrollIntoViewIfNeeded();
    await locator.page().waitForTimeout(300);
  }

  /**
   * Check if an element is visible within a timeout
   */
  static async isElementVisible(locator, timeout = 5000) {
    try {
      await expect(locator).toBeVisible({ timeout });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get all links from a page
   */
  static async getAllLinks(page) {
    return await page.evaluate(() =>
      Array.from(document.querySelectorAll('a[href]'))
        .map((a) => ({
          text: a.textContent?.trim(),
          href: a.href,
        }))
        .filter((link) => link.href)
    );
  }

  /**
   * Check HTTP status of a URL
   */
  static async checkUrlStatus(page, url) {
    try {
      const response = await page.goto(url, { waitUntil: 'load', timeout: 10000 });
      return response ? response.status() : 0;
    } catch {
      return 0;
    }
  }

  /**
   * Take a screenshot with a descriptive name
   */
  static async takeScreenshot(page, name) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const path = `screenshots/${name}-${timestamp}.png`;
    await page.screenshot({ path, fullPage: true });
    logger.info(`Screenshot saved: ${path}`);
    return path;
  }

  /**
   * Measure page load time
   */
  static async measureLoadTime(page, url) {
    const startTime = Date.now();
    await page.goto(url, { waitUntil: 'load' });
    return Date.now() - startTime;
  }

  /**
   * Verify no console errors on page
   */
  static async checkNoConsoleErrors(page) {
    const errors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    return errors;
  }

  /**
   * Extract meta tags from a page
   */
  static async getMetaTags(page) {
    return await page.evaluate(() => {
      const metas = document.querySelectorAll('meta');
      const tags = {};
      metas.forEach((meta) => {
        const name = meta.getAttribute('name') || meta.getAttribute('property');
        if (name) {
          tags[name] = meta.getAttribute('content');
        }
      });
      return tags;
    });
  }
}


