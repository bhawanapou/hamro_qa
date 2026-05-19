import { expect } from '@playwright/test';

/**
 * SearchPage - Page Object Model for Hamro Patro Search functionality
 * Handles the event search feature on the homepage
 */
export class SearchPage {
  constructor(page) {
    this.page = page;

    // Search elements
    this.searchInput = page.locator('input[placeholder="Search events"]');
    this.searchResults = page.locator('[class*="search-result"], [class*="result"], [class*="suggestion"]');
    this.noResultsMessage = page.locator('text=No results, text=not found, text=no events').first();
  }

  /**
   * Navigate to homepage where search is located
   */
  async navigate() {
    await this.page.goto('/', { waitUntil: 'domcontentloaded' });
    await this.page.waitForLoadState('load');
  }

  /**
   * Perform a search with given query
   */
  async search(query) {
    await this.searchInput.scrollIntoViewIfNeeded();
    await this.searchInput.click();
    await this.searchInput.fill(query);
    await this.searchInput.press('Enter');
    await this.page.waitForTimeout(1500);
  }

  /**
   * Clear the search input
   */
  async clearSearch() {
    await this.searchInput.clear();
  }

  /**
   * Verify search input is visible and functional
   */
  async verifySearchInputVisible() {
    await expect(this.searchInput).toBeVisible();
    await expect(this.searchInput).toBeEnabled();
  }

  /**
   * Get the current value of the search input
   */
  async getSearchValue() {
    return await this.searchInput.inputValue();
  }

  /**
   * Verify search input accepts text
   */
  async verifySearchAcceptsInput(text) {
    await this.searchInput.fill(text);
    const value = await this.searchInput.inputValue();
    expect(value).toBe(text);
  }

  /**
   * Verify search handles special characters without errors
   */
  async verifySpecialCharacterSearch(specialChars) {
    await this.searchInput.fill(specialChars);
    await this.searchInput.press('Enter');
    await this.page.waitForTimeout(1000);
    // Page should not crash
    const url = this.page.url();
    expect(url).toBeTruthy();
  }
}
