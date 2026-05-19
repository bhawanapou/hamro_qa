import { expect } from '@playwright/test';

/**
 * NewsPage - Page Object Model for Hamro Patro News Section
 * Handles news listing, article navigation, and news search
 */
export class NewsPage {
  constructor(page) {
    this.page = page;

    // News page elements
    this.newsHeading = page.locator('h1, h2').filter({ hasText: /News|समाचार/ }).first();
    this.newsArticles = page.locator('a[href*="news"], a[href*="newsStory"]');
    this.articleTitles = page.locator('a[href*="newsStory"] div').first();
    this.articleLinks = page.locator('a[href*="newsStory"]');

    // News categories on the news page
    this.latestNewsSection = page.getByText('Latest News');
    this.popularLink = page.locator('a[href*="news/popular"]');
    this.nationalLink = page.locator('a[href*="news/national"]');
    this.technologyLink = page.locator('a[href*="news/technology"]');
    this.entertainmentLink = page.locator('a[href*="news/entertainment"]');
    this.literatureLink = page.locator('a[href*="news/literature"]');

    // News bulletin on homepage
    this.newsBulletinHeading = page.getByText('समाचार बुलेटिन');
    this.newsCardImages = page.locator('a[href*="newsStory"] img');

    // Source attribution
    this.sourceText = page.locator('text=Source:');
  }

  /**
   * Navigate to the News section
   */
  async navigate() {
    await this.page.goto('/news', { waitUntil: 'domcontentloaded' });
    await this.page.waitForLoadState('load');
  }

  /**
   * Navigate via navbar link
   */
  async navigateFromNavbar() {
    await this.page.locator('a[href="/news"]').first().click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Verify news articles are loaded on the page
   */
  async verifyArticlesLoaded() {
    await this.page.waitForLoadState('domcontentloaded');
    const articleCount = await this.newsArticles.count();
    expect(articleCount).toBeGreaterThan(0);
  }

  /**
   * Click on the first news article
   */
  async clickFirstArticle() {
    const firstArticle = this.articleLinks.first();
    await firstArticle.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Navigate to a specific news category
   */
  async navigateToCategory(category) {
    await this.page.goto(`/news/${category}`, { waitUntil: 'domcontentloaded' });
    await this.page.waitForLoadState('load');
  }

  /**
   * Verify news links are valid (not broken)
   */
  async getArticleLinks() {
    const links = [];
    const count = await this.articleLinks.count();
    const limit = Math.min(count, 5);
    for (let i = 0; i < limit; i++) {
      const href = await this.articleLinks.nth(i).getAttribute('href');
      if (href) links.push(href);
    }
    return links;
  }

  /**
   * Verify news section on homepage shows bulletin
   */
  async verifyNewsBulletinOnHomepage() {
    await this.page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(this.newsBulletinHeading).toBeVisible();
    const cardCount = await this.articleLinks.count();
    expect(cardCount).toBeGreaterThan(0);
  }

  /**
   * Get count of loaded articles
   */
  async getArticleCount() {
    return await this.articleLinks.count();
  }
}
