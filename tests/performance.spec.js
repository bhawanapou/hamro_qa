import { test, expect } from '@playwright/test';
import testData from '../fixtures/testData.json' with { type: 'json' };

test.describe('Performance Tests @regression', () => {

  test('should load homepage within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const loadTime = Date.now() - startTime;

    expect(loadTime).toBeLessThan(testData.performance.maxPageLoadTime);
  });

  test('should load news page within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/news', { waitUntil: 'domcontentloaded' });
    const loadTime = Date.now() - startTime;

    expect(loadTime).toBeLessThan(testData.performance.maxPageLoadTime);
  });

  test('should load calendar page within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/calendar/2083/2', { waitUntil: 'domcontentloaded' });
    const loadTime = Date.now() - startTime;

    expect(loadTime).toBeLessThan(testData.performance.maxPageLoadTime);
  });

  test('should load gold page within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/gold', { waitUntil: 'domcontentloaded' });
    const loadTime = Date.now() - startTime;

    expect(loadTime).toBeLessThan(testData.performance.maxPageLoadTime);
  });

  test('should load forex page within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/forex', { waitUntil: 'domcontentloaded' });
    const loadTime = Date.now() - startTime;

    expect(loadTime).toBeLessThan(testData.performance.maxPageLoadTime);
  });

  test('should measure page load timing metrics', async ({ page }) => {
    await page.goto('/', { waitUntil: 'load' });

    const performanceMetrics = await page.evaluate(() => {
      const timing = performance.timing;
      return {
        domContentLoaded: timing.domContentLoadedEventEnd - timing.navigationStart,
        fullLoad: timing.loadEventEnd - timing.navigationStart,
        domInteractive: timing.domInteractive - timing.navigationStart,
        responseTime: timing.responseEnd - timing.requestStart,
      };
    });

    expect(performanceMetrics.domContentLoaded).toBeGreaterThan(0);
    expect(performanceMetrics.fullLoad).toBeGreaterThan(0);
    expect(performanceMetrics.responseTime).toBeGreaterThan(0);
  });

  test('should have a reasonable response time for navigation', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const startTime = Date.now();
    await page.goto('/news', { waitUntil: 'domcontentloaded' });
    const navTime = Date.now() - startTime;

    expect(navTime).toBeLessThan(testData.performance.maxPageLoadTime);
  });

  test('should load without excessive resource count', async ({ page }) => {
    const resources = [];
    page.on('response', (response) => {
      resources.push({
        url: response.url(),
        status: response.status(),
      });
    });

    await page.goto('/', { waitUntil: 'load' });

    const failedResources = resources.filter((r) => r.status >= 400);
    // Allow some failures (external resources), but not excessive
    expect(failedResources.length).toBeLessThan(resources.length * 0.2);
  });
});
