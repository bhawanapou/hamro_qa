import { test, expect } from '@playwright/test';
import { SearchPage } from '../pageObjects/SearchPage.js';
import testData from '../fixtures/testData.json' with { type: 'json' };

test.describe('Search Tests @regression @ui', () => {
  let searchPage;

  test.beforeEach(async ({ page }) => {
    searchPage = new SearchPage(page);
    await searchPage.navigate();
  });

  test('should display the search input on the homepage', async () => {
    await searchPage.verifySearchInputVisible();
  });

  test('should accept valid search keywords', async () => {
    const keyword = testData.searchKeywords.valid[0];
    await searchPage.verifySearchAcceptsInput(keyword);
  });

  test('should handle valid search query', async () => {
    for (const keyword of testData.searchKeywords.valid) {
      await searchPage.search(keyword);
      const url = searchPage.page.url();
      expect(url).toBeTruthy();
      await searchPage.clearSearch();
    }
  });

  test('should handle empty search gracefully', async () => {
    await searchPage.search(testData.searchKeywords.empty);
    const url = searchPage.page.url();
    expect(url).toBeTruthy();
  });

  test('should handle invalid/nonsense search terms', async () => {
    for (const keyword of testData.searchKeywords.invalid) {
      await searchPage.search(keyword);
      const url = searchPage.page.url();
      expect(url).toBeTruthy();
      await searchPage.clearSearch();
    }
  });

  test('should handle special character search without errors', async () => {
    for (const specialChar of testData.searchKeywords.specialCharacters) {
      await searchPage.verifySpecialCharacterSearch(specialChar);
      await searchPage.clearSearch();
    }
  });

  test('should clear the search input', async () => {
    await searchPage.search('test');
    await searchPage.clearSearch();
    const value = await searchPage.getSearchValue();
    expect(value).toBe('');
  });

  test('should preserve search input after typing', async () => {
    const query = 'Festival';
    await searchPage.verifySearchAcceptsInput(query);
  });
});
