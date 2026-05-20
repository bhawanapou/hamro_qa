import { test, expect } from './testSetup.js';
import testData from '../fixtures/testData.json' with { type: 'json' };

test.describe('Responsive Design Tests @regression @ui', () => {

  test('should render correctly on mobile viewport', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: testData.viewports.mobile,
    });
    const page = await context.newPage();
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // Page should load without errors
    await expect(page).toHaveTitle(/Nepali Calendar|Hamro Patro/i);

    // Content should be accessible
    const bodyText = await page.locator('body').textContent();
    expect(bodyText.length).toBeGreaterThan(100);

    // Calendar heading should still be present
    await expect(page.locator('h1:has-text("Nepali Calendar")')).toBeAttached();

    await context.close();
  });

  test('should render correctly on tablet viewport', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: testData.viewports.tablet,
    });
    const page = await context.newPage();
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    await expect(page).toHaveTitle(/Nepali Calendar|Hamro Patro/i);

    const bodyText = await page.locator('body').textContent();
    expect(bodyText.length).toBeGreaterThan(100);

    // Navigation should be accessible
    const navLink = page.locator('a[href="/news"]').first();
    await expect(navLink).toBeAttached();

    await context.close();
  });

  test('should render correctly on desktop viewport', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: testData.viewports.desktop,
    });
    const page = await context.newPage();
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    await expect(page).toHaveTitle(/Nepali Calendar|Hamro Patro/i);

    // All main sections should be visible on desktop
    await expect(page.locator('h1:has-text("Nepali Calendar")')).toBeVisible();
    await expect(page.locator('input[placeholder="Search events"]')).toBeVisible();

    // Logo should be visible
    await expect(page.locator('img[src*="hamropatro.png"]').first()).toBeVisible();

    await context.close();
  });

  test('should render correctly on large desktop viewport', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: testData.viewports.largeDesktop,
    });
    const page = await context.newPage();
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    await expect(page).toHaveTitle(/Nepali Calendar|Hamro Patro/i);

    const bodyText = await page.locator('body').textContent();
    expect(bodyText.length).toBeGreaterThan(100);

    await context.close();
  });

  test('should handle viewport resize without breaking layout', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: testData.viewports.desktop,
    });
    const page = await context.newPage();
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // Resize to mobile
    await page.setViewportSize(testData.viewports.mobile);
    await expect(page.locator('body')).toBeVisible();
    let title = await page.title();
    expect(title).toBeTruthy();

    // Resize to tablet
    await page.setViewportSize(testData.viewports.tablet);
    await expect(page.locator('body')).toBeVisible();
    title = await page.title();
    expect(title).toBeTruthy();

    // Resize back to desktop
    await page.setViewportSize(testData.viewports.desktop);
    await expect(page.locator('body')).toBeVisible();
    title = await page.title();
    expect(title).toBeTruthy();

    await context.close();
  });

  test('should load correctly with Pixel 5 device emulation', async ({ browser }) => {
    const { devices } = await import('@playwright/test');
    const pixel5 = devices['Pixel 5'];
    const context = await browser.newContext({ ...pixel5 });
    const page = await context.newPage();
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    await expect(page).toHaveTitle(/Nepali Calendar|Hamro Patro/i);

    await context.close();
  });

  test('should load correctly with iPhone 12 device emulation', async ({ browser }) => {
    const { devices } = await import('@playwright/test');
    const iphone12 = devices['iPhone 12'];
    const context = await browser.newContext({ ...iphone12 });
    const page = await context.newPage();
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    await expect(page).toHaveTitle(/Nepali Calendar|Hamro Patro/i);

    await context.close();
  });
});
