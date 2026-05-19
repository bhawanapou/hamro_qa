import { expect } from '@playwright/test';

/**
 * CalendarPage - Page Object Model for Hamro Patro Calendar
 * Handles calendar navigation, date selection, and month/year controls
 */
export class CalendarPage {
  constructor(page) {
    this.page = page;

    // Calendar heading
    this.calendarHeading = page.locator('h1:has-text("Nepali Calendar")');

    // Navigation controls
    this.prevMonthLink = page.locator('a').filter({ hasText: 'Prev' });
    this.nextMonthLink = page.locator('a').filter({ hasText: 'Next' });
    this.todayButton = page.locator('a[href="#"]').filter({ hasText: 'आज' });

    // Year and month dropdowns
    this.yearDropdown = page.locator('select[name="year"]');
    this.monthDropdown = page.locator('select[name="month"]');

    // Calendar grid
    this.weekdayHeaders = page.locator('li:has-text("Sunday")');
    this.calendarDays = page.locator('ul li[class]');

    // Date info display
    this.nepaliDateDisplay = page.getByText(/जेठ|वैशाख|असार|साउन|भदौ|असोज|कार्तिक|मंसिर|पुष|माघ|फागुन|चैत/);
    this.englishDateDisplay = page.getByText(/May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|Jan|Feb|Mar|Apr/);

    // Calendar view toggles
    this.gridViewButton = page.locator('img[src*="calender_icon"]');
  }

  /**
   * Navigate to the homepage (calendar is on the homepage)
   */
  async navigate() {
    await this.page.goto('/', { waitUntil: 'domcontentloaded' });
    await this.page.waitForLoadState('load');
  }

  /**
   * Navigate to the next month
   */
  async goToNextMonth() {
    const currentUrl = this.page.url();
    await this.nextMonthLink.click();
    await this.page.waitForLoadState('domcontentloaded');
    return this.page.url() !== currentUrl;
  }

  /**
   * Navigate to the previous month
   */
  async goToPreviousMonth() {
    const currentUrl = this.page.url();
    await this.prevMonthLink.click();
    await this.page.waitForLoadState('domcontentloaded');
    return this.page.url() !== currentUrl;
  }

  /**
   * Select a specific year from the dropdown
   */
  async selectYear(year) {
    await this.yearDropdown.selectOption(year.toString());
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Select a specific month from the dropdown
   */
  async selectMonth(monthValue) {
    await this.monthDropdown.selectOption(monthValue.toString());
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Navigate to a specific calendar page via URL
   */
  async navigateToMonth(year, month) {
    await this.page.goto(`/calendar/${year}/${month}`, { waitUntil: 'domcontentloaded' });
    await this.page.waitForLoadState('load');
  }

  /**
   * Verify the calendar grid is rendered with day headers
   */
  async verifyCalendarRendered() {
    await expect(this.weekdayHeaders.first()).toBeAttached();
  }

  /**
   * Verify Nepali date information is displayed
   */
  async verifyNepaliDateLoads() {
    const dateText = await this.nepaliDateDisplay.first();
    await expect(dateText).toBeAttached();
  }

  /**
   * Get the currently selected year value
   */
  async getSelectedYear() {
    return await this.yearDropdown.inputValue();
  }

  /**
   * Get the currently selected month value
   */
  async getSelectedMonth() {
    return await this.monthDropdown.inputValue();
  }

  /**
   * Click today button to navigate to current date
   */
  async clickToday() {
    await this.todayButton.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Verify the calendar page title
   */
  async verifyCalendarTitle() {
    await expect(this.calendarHeading).toBeVisible();
  }
}
