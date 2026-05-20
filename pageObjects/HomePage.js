import { expect } from '@playwright/test';

/**
 * HomePage - Page Object Model for Hamro Patro homepage.
 * Encapsulates homepage navigation, verification, and content checks.
 */
export class HomePage {
  constructor(page) {
    this.page = page;
    this.logo = page.locator('img[alt*="Hamro Patro"], img[src*="hamropatro"], [alt*="Hamro Patro"]').first();
    this.searchInput = page.locator('input[placeholder="Search events"]');
    this.dateDisplay = page.locator('h1:has-text("Nepali Calendar")');
    this.newsBulletinHeading = page.getByText('समाचार बुलेटिन');
    this.remitLink = page.locator('a[href="/remit"]');
    this.newsLink = page.locator('a[href="/news"]');
    this.goldSilverLink = page.locator('a[href="/gold"]');
    this.forexLink = page.locator('a[href="/forex"]');
    this.converterLink = page.locator('a[href="/date-converter"]');
    this.footerText = page.getByText('© Hamro Patro');
    this.privacyLink = page.locator('a[href="privacy"]');
    this.termsLink = page.locator('a[href="terms"]');
    this.accountIcon = page.locator('img[src*="account_circle"], img#user_image, img#user_imagae').first();
    this.facebookLink = page.locator('a[href*="facebook.com/hamropatro"]');
    this.instagramLink = page.locator('a[href*="instagram.com/hamropatro"]');
    this.todayButton = page.locator('a:has-text("आज")').first();
    this.holidaysService = page.locator('a[href="/nepali-public-holidays"]');
    this.notesLink = page.locator('a[href="/notes"]');
  }

  async navigate() {
    await this.page.goto('/', { waitUntil: 'domcontentloaded' });
  }

  async verifyTitle() {
    await expect(this.page).toHaveTitle(/Nepali Calendar|Hamro Patro/i);
  }

  async verifyLogoVisible() {
    await expect(this.logo).toBeVisible();
  }

  async verifyCalendarHeading() {
    await expect(this.dateDisplay).toBeVisible();
  }

  async verifyNavbarLinks() {
    await expect(this.remitLink).toBeVisible();
    await expect(this.newsLink).toBeVisible();
    await expect(this.goldSilverLink).toBeVisible();
    await expect(this.forexLink).toBeVisible();
    await expect(this.converterLink).toBeVisible();
  }

  async verifyFooter() {
    await expect(this.footerText).toBeVisible();
    await expect(this.privacyLink).toBeVisible();
    await expect(this.termsLink).toBeVisible();
  }

  async verifyNewsBulletin() {
    await expect(this.newsBulletinHeading).toBeVisible();
    await expect(this.page.locator('a[href*="newsStory"]').first()).toBeVisible();
  }

  async verifyImportantSections() {
    await expect(this.dateDisplay).toBeVisible();
    await expect(this.newsBulletinHeading).toBeVisible();
    await expect(this.searchInput).toBeVisible();
  }
}
