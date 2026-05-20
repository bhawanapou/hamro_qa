import { test, expect } from './testSetup.js';
import { HomePage } from '../pageObjects/HomePage.js';

test.describe('Homepage Tests @smoke @ui', () => {
  let homePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigate();
  });

  test('should load the homepage successfully', async ({ page }) => {
    await expect(page).toHaveURL(/hamropatro\.com/);
    await expect(page).toHaveTitle(/Nepali Calendar|Hamro Patro/i);
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

  test('should display important homepage sections', async () => {
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

  test('should display the account icon', async () => {
    await expect(homePage.accountIcon).toBeVisible({ timeout: 10_000 });
  });

  test('should have footer social media links', async () => {
    await expect(homePage.facebookLink).toBeVisible();
    await expect(homePage.instagramLink).toBeVisible();
  });

  test('should display date-related content on the homepage', async ({ page }) => {
    const bodyText = await page.locator('body').textContent();
    expect(bodyText).toMatch(/\d{4}|Calendar|२०|समाचार/);
  });
});
