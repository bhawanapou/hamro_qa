import { test, expect } from './testSetup.js';
import { NavigationPage } from '../pageObjects/NavigationPage.js';

test.describe('Navigation Tests @smoke @ui', () => {
  let navPage;

  test.beforeEach(async ({ page }) => {
    navPage = new NavigationPage(page);
    await navPage.navigate();
  });

  test('should have all main navbar links present', async () => {
    await navPage.verifyAllNavLinksPresent();
  });

  test('should navigate to News page', async ({ page }) => {
    await navPage.clickNavLink('news');
    await expect(page).toHaveURL(/news/);
  });

  test('should navigate to Gold/Silver page', async ({ page }) => {
    await navPage.clickNavLink('goldSilver');
    await expect(page).toHaveURL(/gold/);
  });

  test('should navigate to Forex page', async ({ page }) => {
    await navPage.clickNavLink('forex');
    await expect(page).toHaveURL(/forex/);
  });

  test('should navigate to Date Converter page', async ({ page }) => {
    await navPage.clickNavLink('converter');
    await expect(page).toHaveURL(/date-converter/);
  });

  test('should navigate to Jyotish page', async ({ page }) => {
    await navPage.clickNavLink('jyotish');
    await expect(page).toHaveURL(/jyotish/);
  });

  test('should navigate to Rashifal page', async ({ page }) => {
    await navPage.clickNavLink('rashifal');
    await expect(page).toHaveURL(/rashifal/);
  });

  test('should navigate to Blog/Posts page', async ({ page }) => {
    await navPage.clickNavLink('blog');
    await expect(page).toHaveURL(/posts/);
  });

  test('should navigate to Remit page', async ({ page }) => {
    await navPage.clickNavLink('remit');
    await expect(page).toHaveURL(/remit/);
  });

  test('should verify footer links are present', async () => {
    await navPage.verifyFooterLinks();
  });

  test('should verify social media links are present', async () => {
    await navPage.verifySocialLinks();
  });

  test('should have valid href attributes on internal nav links', async () => {
    const hrefs = await navPage.getAllNavHrefs();
    for (const [name, href] of Object.entries(hrefs)) {
      expect(href).toBeTruthy();
    }
  });

  test('should return to homepage when clicking site name', async ({ page }) => {
    // Navigate away first
    await navPage.clickNavLink('news');
    await page.waitForLoadState('load');

    // Click the site name / home link
    await page.locator('a[href="/"]').first().click();
    await page.waitForLoadState('load');
    await expect(page.url()).toMatch(/(?:hamropatro\.com|localhost:3000)(?:\/|$)/);
  });
});

