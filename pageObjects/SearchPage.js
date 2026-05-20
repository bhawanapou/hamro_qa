import { expect } from '@playwright/test';

/**
 * SearchPage - Page Object Model for Hamro Patro Search functionality.
 * Encapsulates search input behavior and result validation.
 */
export class SearchPage {
  constructor(page) {
    this.page = page;
    this.searchInput = page.locator('input[placeholder="Search events"]');
    this.searchResults = page.locator('[class*="search-result"], [class*="result"], [class*="suggestion"]');
    this.noResultsMessage = page.locator('text=No results, text=not found, text=no events').first();
  }

  async navigate() {
    await this.page.goto('/', { waitUntil: 'domcontentloaded' });
  }

  async search(query) {
    await expect(this.searchInput).toBeVisible({ timeout: 8_000 });
    await this.searchInput.fill(query);
    await this.searchInput.press('Enter');
    await this.page.waitForLoadState('networkidle');
  }

  async clearSearch() {
    await this.searchInput.fill('');
    await expect(this.searchInput).toHaveValue('');
  }

  async verifySearchInputVisible() {
    await expect(this.searchInput).toBeVisible();
    await expect(this.searchInput).toBeEnabled();
  }

  async getSearchValue() {
    return await this.searchInput.inputValue();
  }

  async verifySearchAcceptsInput(text) {
    await expect(this.searchInput).toBeVisible();
    await this.searchInput.fill(text);
    await expect(this.searchInput).toHaveValue(text);
  }

  async verifySpecialCharacterSearch(specialChars) {
    await this.searchInput.fill(specialChars);
    await this.searchInput.press('Enter');
    await this.page.waitForLoadState('networkidle');
    return await this.page.locator('body').isVisible();
  }
}
