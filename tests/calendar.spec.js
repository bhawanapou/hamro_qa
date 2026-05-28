import { test, expect } from './testSetup.js';
import { CalendarPage } from '../pageObjects/CalendarPage.js';
import testData from '../fixtures/testData.json' with { type: 'json' };

test.describe('Calendar Tests @regression @ui', () => {
  let calendarPage;

  test.beforeEach(async ({ page }) => {
    calendarPage = new CalendarPage(page);
    await calendarPage.navigate();
  });

  test('should display the Nepali Calendar heading', async () => {
    await calendarPage.verifyCalendarTitle();
  });

  test('should render the calendar grid with weekday headers', async () => {
    await calendarPage.verifyCalendarRendered();
  });

  test('should display Nepali date information', async () => {
    await calendarPage.verifyNepaliDateLoads();
  });

  test('should navigate to the next month', async ({ page }) => {
    const currentUrl = page.url();
    await calendarPage.goToNextMonth();
    await page.waitForLoadState('load');
    expect(page.url()).not.toBe(currentUrl);
  });

  test('should navigate to the previous month', async ({ page }) => {
    // First go to a month page so we have a prev link
    await calendarPage.navigateToMonth(2083, 3);
    const currentUrl = page.url();
    await calendarPage.goToPreviousMonth();
    await page.waitForLoadState('load');
    expect(page.url()).not.toBe(currentUrl);
  });

  test('should have year dropdown with correct options', async () => {
    await expect(calendarPage.yearDropdown).toBeVisible();
    const selectedYear = await calendarPage.getSelectedYear();
    expect(parseInt(selectedYear)).toBeGreaterThanOrEqual(2000);
  });

  test('should have month dropdown with 12 months', async () => {
    await expect(calendarPage.monthDropdown).toBeVisible();
    const options = await calendarPage.monthDropdown.locator('option').count();
    expect(options).toBe(12);
  });

  test('should navigate to a specific calendar month via URL', async ({ page }) => {
    await calendarPage.navigateToMonth(2082, 1);
    await expect(page).toHaveURL(/calendar\/2082\/1/);
  });

  test('should display today button', async () => {
    await expect(calendarPage.todayButton).toBeVisible();
  });

  test('should display prev and next month navigation links', async () => {
    await expect(calendarPage.prevMonthLink.or(calendarPage.nextMonthLink).first()).toBeAttached();
  });

  test('should navigate between months using prev/next links', async ({ page }) => {
    await calendarPage.navigateToMonth(2083, 6);

    await calendarPage.goToPreviousMonth();
    await expect(page).toHaveURL(/calendar\/2083\/5/);

    await calendarPage.goToNextMonth();
    await expect(page).toHaveURL(/calendar\/2083\/6/);
  });
});

