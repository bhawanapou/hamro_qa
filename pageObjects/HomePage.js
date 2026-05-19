import { expect } from '@playwright/test';

/**
 * HomePage - Page Object Model for Hamro Patro Homepage
 * Contains locators and reusable methods for homepage interactions
 */
export class HomePage {
  constructor(page) {
    this.page = page;

    // Logo and branding
    this.logo = page.locator('img[src*="hamropatro.png"]').first();
    this.siteName = page.locator('a[href="/"]').filter({ hasText: 'Hamro Patro' });

    // Navbar links
    this.navbar = page.locator('ul').first();
    this.remitLink = page.locator('a[href="/remit"]');
    this.martLink = page.locator('a[href*="mart"]');
    this.giftsLink = page.locator('a[href="/gifts"]');
    this.rechargeLink = page.locator('a[href*="recharge.hamropatro.com"]');
    this.healthLink = page.locator('a[href*="health"]').first();
    this.jyotishLink = page.locator('a[href="/jyotish"]');
    this.rashifalLink = page.locator('a[href="/rashifal"]').first();
    this.podcastsLink = page.locator('a[href*="podcasts.hamropatro.com"]');
    this.newsLink = page.locator('a[href="/news"]').first();
    this.blogLink = page.locator('a[href="/posts"]').first();
    this.goldSilverLink = page.locator('a[href="/gold"]').first();
    this.forexLink = page.locator('a[href="/forex"]').first();
    this.converterLink = page.locator('a[href="/date-converter"]').first();
    this.englishToggle = page.locator('a[href*="english.hamropatro.com"]').first();

    // Hero section - date display
    this.dateDisplay = page.locator('h1:has-text("Nepali Calendar")');

    // Search
    this.searchInput = page.locator('input[placeholder="Search events"]');

    // News bulletin
    this.newsBulletinHeading = page.getByText('समाचार बुलेटिन');
    this.newsCards = page.locator('a[href*="newsStory"]');

    // Calendar section
    this.calendarGrid = page.locator('ul').filter({ has: page.locator('li:has-text("Sunday")') });
    this.prevMonthLink = page.locator('a').filter({ hasText: 'Prev' });
    this.nextMonthLink = page.locator('a').filter({ hasText: 'Next' });
    this.todayButton = page.locator('a[href="#"]').filter({ hasText: 'आज' });
    this.yearDropdown = page.locator('select[name="year"]');
    this.monthDropdown = page.locator('select[name="month"]');

    // Upcoming events
    this.upcomingEventsSection = page.locator('h2').filter({ has: page.locator('a[href="/posts"]') });

    // Notes section
    this.notesLink = page.locator('a[href="/notes"]');
    this.addNoteButton = page.locator('img[src*="Add_button"]');

    // Rashifal section
    this.rashifalSection = page.locator('h2').filter({ has: page.locator('a[href="/rashifal"]') });

    // Footer
    this.footerText = page.getByText('© Hamro Patro');
    this.privacyLink = page.locator('a[href="privacy"]');
    this.termsLink = page.locator('a[href="terms"]');
    this.facebookLink = page.locator('a[href*="facebook.com/hamropatro"]');
    this.twitterLink = page.locator('a[href*="twitter.com/hamropatro"]');
    this.instagramLink = page.locator('a[href*="instagram.com/hamropatro"]');
    this.youtubeLink = page.locator('a[href*="youtube.com"]');

    // Services section
    this.remitService = page.locator('a[href*="remit.hamropatro.com"]');
    this.rechargeService = page.locator('a[href*="recharge.hamropatro.com"]').first();
    this.giftsService = page.locator('a[href*="gifts.hamropatro.com"]');
    this.holidaysService = page.locator('a[href="/nepali-public-holidays"]');

    // Account
    this.accountIcon = page.locator('img[src*="account_circle"]');

    // Downloads section
    this.androidLink = page.locator('a[href*="play.google.com"]');
    this.iosLink = page.locator('a[href*="itunes.apple.com"]');
  }

  /**
   * Navigate to the homepage
   */
  async navigate() {
    await this.page.goto('/', { waitUntil: 'domcontentloaded' });
    await this.page.waitForLoadState('load');
  }

  /**
   * Verify the page title contains expected text
   */
  async verifyTitle() {
    await expect(this.page).toHaveTitle(/Nepali Calendar|Hamro Patro/i);
  }

  /**
   * Verify logo is visible on the page
   */
  async verifyLogoVisible() {
    await expect(this.logo).toBeVisible();
  }

  /**
   * Verify the main calendar heading is displayed
   */
  async verifyCalendarHeading() {
    await expect(this.dateDisplay).toBeVisible();
  }

  /**
   * Verify the navbar contains all expected links
   */
  async verifyNavbarLinks() {
    await expect(this.remitLink.first()).toBeAttached();
    await expect(this.newsLink).toBeAttached();
    await expect(this.goldSilverLink).toBeAttached();
    await expect(this.forexLink).toBeAttached();
    await expect(this.converterLink).toBeAttached();
  }

  /**
   * Verify footer section is present
   */
  async verifyFooter() {
    await this.footerText.scrollIntoViewIfNeeded();
    await expect(this.footerText).toBeVisible();
    await expect(this.privacyLink).toBeAttached();
    await expect(this.termsLink).toBeAttached();
  }

  /**
   * Verify news bulletin section loads
   */
  async verifyNewsBulletin() {
    await expect(this.newsBulletinHeading).toBeVisible();
    const newsCount = await this.newsCards.count();
    expect(newsCount).toBeGreaterThan(0);
  }

  /**
   * Search for events using the search input
   */
  async searchEvents(query) {
    await this.searchInput.fill(query);
    await this.searchInput.press('Enter');
  }

  /**
   * Get the current page URL
   */
  async getCurrentUrl() {
    return this.page.url();
  }

  /**
   * Click on account icon to trigger login/profile
   */
  async clickAccountIcon() {
    await this.accountIcon.click();
  }

  /**
   * Verify important homepage sections are present
   */
  async verifyImportantSections() {
    await expect(this.dateDisplay).toBeVisible();
    await expect(this.newsBulletinHeading).toBeVisible();
    await expect(this.searchInput).toBeVisible();
  }
}
