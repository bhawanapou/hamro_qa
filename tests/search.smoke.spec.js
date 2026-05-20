import { test, expect } from './testSetup.js';
import { SearchPage } from '../pageObjects/SearchPage.js';
import testData from '../fixtures/testData.json' with { type: 'json' };

test.describe('Search Smoke Tests @smoke @ui', () => {
  let searchPage;

  test.beforeEach(async ({ page }) => {
    searchPage = new SearchPage(page);
    await searchPage.navigate();
  });

  test('should show search input and accept text', async () => {
    await searchPage.verifySearchInputVisible();
    await searchPage.verifySearchAcceptsInput('दशैं');
  });

  test('should return results or show no-results for a valid keyword', async () => {
    const query = testData.searchKeywords.valid[0] || 'दशैं';
    await searchPage.search(query);
    const hasResults = await searchPage.searchResults.first().isVisible().catch(() => false);
    const noResults = await searchPage.noResultsMessage.isVisible().catch(() => false);
    expect(hasResults || noResults).toBe(true);
  });

  test('should handle special character searches without breaking', async () => {
    const special = testData.searchKeywords.specialCharacters[0] || "<script>alert('x')</script>";
    const ok = await searchPage.verifySpecialCharacterSearch(special);
    expect(ok).toBe(true);
  });
});
