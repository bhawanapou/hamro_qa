import { test, expect } from './testSetup.js';
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

  test('should handle valid search queries and show results', async () => {
    for (const keyword of testData.searchKeywords.valid) {
      await searchPage.search(keyword);
      expect(await searchPage.getSearchValue()).toContain(keyword.slice(0, 3));
      await searchPage.clearSearch();
    }
  });

  test('should handle empty search without failure', async () => {
    await searchPage.search(testData.searchKeywords.empty);
    await expect(searchPage.searchInput).toHaveValue('');
  });

  test('should handle invalid search terms without crashing', async () => {
    for (const keyword of testData.searchKeywords.invalid) {
      await searchPage.search(keyword);
      expect(await searchPage.getSearchValue()).toBe(keyword);
      await searchPage.clearSearch();
    }
  });

  test('should handle special characters in search', async () => {
    for (const specialChar of testData.searchKeywords.specialCharacters) {
      const visible = await searchPage.verifySpecialCharacterSearch(specialChar);
      expect(visible).toBe(true);
      await searchPage.clearSearch();
    }
  });

  test('should clear the search input field', async () => {
    await searchPage.search('test');
    await searchPage.clearSearch();
    expect(await searchPage.getSearchValue()).toBe('');
  });

  test('should preserve typed search text', async () => {
    const query = 'Festival';
    await searchPage.verifySearchAcceptsInput(query);
  });
});
