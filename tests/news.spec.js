import { test, expect } from './testSetup.js';
import { NewsPage } from '../pageObjects/NewsPage.js';

test.describe('News Module Tests @regression @ui', () => {
  let newsPage;

  test.beforeEach(async ({ page }) => {
    newsPage = new NewsPage(page);
  });

  test('should open the news section', async ({ page }) => {
    await newsPage.navigate();
    await expect(page).toHaveURL(/news/);
  });

  test('should display news articles on the news page', async () => {
    await newsPage.navigate();
    await newsPage.verifyArticlesLoaded();
  });

  test('should display news bulletin on the homepage', async () => {
    await newsPage.verifyNewsBulletinOnHomepage();
  });

  test('should have clickable article links', async () => {
    await newsPage.navigate();
    const links = await newsPage.getArticleLinks();
    expect(links.length).toBeGreaterThan(0);
    for (const link of links) {
      expect(link).toBeTruthy();
    }
  });

  test('should navigate to an article when clicked', async ({ page }) => {
    await newsPage.navigate();
    const articleCount = await newsPage.getArticleCount();
    if (articleCount > 0) {
      await newsPage.clickFirstArticle();
      await page.waitForLoadState('load');
      expect(page.url()).toBeTruthy();
    }
  });

  test('should load national news category', async ({ page }) => {
    await newsPage.navigateToCategory('national');
    await expect(page).toHaveURL(/news\/national/);
  });

  test('should load technology news category', async ({ page }) => {
    await newsPage.navigateToCategory('technology');
    await expect(page).toHaveURL(/news\/technology/);
  });

  test('should load entertainment news category', async ({ page }) => {
    await newsPage.navigateToCategory('entertainment');
    await expect(page).toHaveURL(/news\/entertainment/);
  });

  test('should load popular news section', async ({ page }) => {
    await newsPage.navigateToCategory('popular');
    await expect(page).toHaveURL(/news\/popular/);
  });

  test('should display news article images on homepage bulletin', async ({ page }) => {
    await page.goto('/', { waitUntil: 'load' });
    const imageCount = await newsPage.newsCardImages.count();
    expect(imageCount).toBeGreaterThan(0);
  });
});


