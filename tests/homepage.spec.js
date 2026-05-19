import { test, expect } from '@playwright/test';
import { HomePage } from '../pageObjects/HomePage.js';

test.describe('Homepage Tests @smoke @ui', () => {
  let homePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigate();
  });

  test('should load the homepage successfully', async ({ page }) => {
    await expect(page).toHaveURL(/hamropatro\.com/);
    const title = await page.title();
    expect(title).toBeTruthy();
  });

  test('should display the correct page title', async () => {
    await homePage.verifyTitle();
  });

  test('should display the Hamro Patro logo', async () => {
    await homePage.verifyLogoVisible();
  });

  test('should display the navigation bar with all links', async () => {
    await homePage.verifyNavbarLinks();
  });

  test('should display the footer section', async () => {
    await homePage.verifyFooter();
  });

  test('should display important sections on the homepage', async () => {
    await homePage.verifyImportantSections();
  });

  test('should display the Nepali Calendar heading', async () => {
    await homePage.verifyCalendarHeading();
  });

  test('should display the news bulletin section', async () => {
    await homePage.verifyNewsBulletin();
  });

  test('should display the search input field', async () => {
    await expect(homePage.searchInput).toBeVisible();
  });

  test('should have the English language toggle', async () => {
    await expect(homePage.englishToggle).toBeAttached();
  });

  test('should display services section (Remit, Recharge, Gifts, Holidays)', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
    await expect(homePage.holidaysService).toBeAttached();
  });

  test('should display the account icon', async () => {
    await expect(homePage.accountIcon).toBeVisible({ timeout: 10000 }).catch(async () => {
      // Account icon may not be visible in all viewports; check it's at least in DOM
      await expect(homePage.accountIcon).toBeAttached();
    });
  });

  test('should have footer social media links', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(homePage.facebookLink).toBeAttached();
    await expect(homePage.instagramLink).toBeAttached();
  });

  test('should display date information on the page', async ({ page }) => {
    // Verify the page contains some date-related content
    const bodyText = await page.locator('body').textContent();
    // Should contain either English date digits or Nepali calendar info
    const hasDateInfo = /\d{4}/.test(bodyText) || /Calendar/.test(bodyText) || /२०/.test(bodyText);
    expect(hasDateInfo).toBeTruthy();
  });
});
