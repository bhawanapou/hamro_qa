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
    await this.page.goto('/', { waitUntil: 'load' });
    await this.page.waitForLoadState('load');
  }

  /**
   * Navigate to the next month
   */
  async goToNextMonth() {
    const currentUrl = this.page.url();
    try {
      await this.nextMonthLink.click({ timeout: 5000 });
      await this.page.waitForLoadState('load');
      return this.page.url() !== currentUrl;
    } catch (e) {
      // fallback: compute next month/year and navigate directly if controls are not present
      const year = await this.getSelectedYear().catch(() => null);
      const month = await this.getSelectedMonth().catch(() => null);
      if (!year || !month) return false;
      let nextMonth = Number(month) + 1;
      let nextYear = Number(year);
      if (nextMonth > 12) {
        nextMonth = 1;
        nextYear += 1;
      }
      await this.navigateToMonth(nextYear, nextMonth);
      return this.page.url() !== currentUrl;
    }
  }

  /**
   * Navigate to the previous month
   */
  async goToPreviousMonth() {
    const currentUrl = this.page.url();
    try {
      await this.prevMonthLink.click({ timeout: 5000 });
      await this.page.waitForLoadState('load');
      return this.page.url() !== currentUrl;
    } catch (e) {
      // fallback: compute previous month/year and navigate directly if controls are not present
      const year = await this.getSelectedYear().catch(() => null);
      const month = await this.getSelectedMonth().catch(() => null);
      if (!year || !month) return false;
      let prevMonth = Number(month) - 1;
      let prevYear = Number(year);
      if (prevMonth < 1) {
        prevMonth = 12;
        prevYear -= 1;
      }
      await this.navigateToMonth(prevYear, prevMonth);
      return this.page.url() !== currentUrl;
    }
  }

  /**
   * Select a specific year from the dropdown
   */
  async selectYear(year) {
    await this.yearDropdown.selectOption(year.toString());
    await this.page.waitForLoadState('load');
  }

  /**
   * Select a specific month from the dropdown
   */
  async selectMonth(monthValue) {
    await this.monthDropdown.selectOption(monthValue.toString());
    await this.page.waitForLoadState('load');
  }

  /**
   * Navigate to a specific calendar page via URL
   */
  async navigateToMonth(year, month) {
    await this.page.goto(`/calendar/${year}/${month}`, { waitUntil: 'load' });
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
    try {
      const val = await this.yearDropdown.inputValue();
      if (val) return val;
    } catch (e) {
      // ignore
    }
    // fallback: try to read a year from visible text (e.g. "Year 2083")
    try {
      const text = await this.page.locator('body').innerText();
      const m = text.match(/Year\s*(\d{3,4})/i);
      if (m) return m[1];
    } catch (e) {
      // ignore
    }
    return null;
  }

  /**
   * Get the currently selected month value
   */
  async getSelectedMonth() {
    try {
      const val = await this.monthDropdown.inputValue();
      if (val) return val;
    } catch (e) {
      // ignore
    }
    // fallback: if no dropdown, attempt to infer month from URL (/calendar/2083/6)
    try {
      const m = this.page.url().match(/calendar\/(\d{3,4})\/(\d{1,2})/);
      if (m) return m[2];
    } catch (e) {
      // ignore
    }
    return null;
  }

  /**
   * Click today button to navigate to current date
   */
  async clickToday() {
    await this.todayButton.click();
    await this.page.waitForLoadState('load');
  }

  /**
   * Verify the calendar page title
   */
  async verifyCalendarTitle() {
    await expect(this.calendarHeading).toBeVisible();
  }
}


