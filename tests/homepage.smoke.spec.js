import { test, expect } from './testSetup.js';
import { HomePage } from '../pageObjects/HomePage.js';

test.describe('Homepage Smoke Tests @smoke @ui', () => {
  let home;

  test.beforeEach(async ({ page }) => {
    home = new HomePage(page);
    await page.goto('/', { waitUntil: 'domcontentloaded' });
  });

  test('should load homepage and display logo', async () => {
    await home.verifyLogoVisible();
  });

  test('should display main navigation links', async () => {
    await home.verifyNavbarLinks();
  });

  test('should display Nepali Calendar heading', async () => {
    await home.verifyCalendarHeading();
  });
});
