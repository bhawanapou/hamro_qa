import { expect } from '@playwright/test';

/**
 * NavigationPage - Page Object Model for Hamro Patro Navigation
 * Handles all navigation links, menu items, and redirect verification
 */
export class NavigationPage {
  constructor(page) {
    this.page = page;

    // Main navbar links mapped to their expected URLs
    this.navLinks = {
      remit: { locator: page.locator('a[href="/remit"]'), expectedPath: '/remit' },
      mart: { locator: page.locator('a[href*="mart"]').first(), expectedUrl: /mart/ },
      gifts: { locator: page.locator('a[href="/gifts"]'), expectedPath: '/gifts' },
      recharge: { locator: page.locator('a[href*="recharge.hamropatro.com"]'), expectedUrl: /recharge/ },
      health: { locator: page.locator('a[href*="health"]').first(), expectedUrl: /health/ },
      jyotish: { locator: page.locator('a[href="/jyotish"]'), expectedPath: '/jyotish' },
      rashifal: { locator: page.locator('a[href="/rashifal"]').first(), expectedPath: '/rashifal' },
      podcasts: { locator: page.locator('a[href*="podcasts.hamropatro.com"]'), expectedUrl: /podcasts/ },
      news: { locator: page.locator('a[href="/news"]').first(), expectedPath: '/news' },
      blog: { locator: page.locator('a[href="/posts"]').first(), expectedPath: '/posts' },
      goldSilver: { locator: page.locator('a[href="/gold"]').first(), expectedPath: '/gold' },
      forex: { locator: page.locator('a[href="/forex"]').first(), expectedPath: '/forex' },
      converter: { locator: page.locator('a[href="/date-converter"]').first(), expectedPath: '/date-converter' },
    };

    // Footer navigation links
    this.footerLinks = {
      privacy: { locator: page.locator('a[href="privacy"]'), expectedPath: '/privacy' },
      terms: { locator: page.locator('a[href="terms"]'), expectedPath: '/terms' },
    };

    // Feature links in footer
    this.featureLinks = {
      jyotish: page.locator('a[href="jyotish"]'),
      goldSilver: page.locator('a[href="gold"]'),
      forex: page.locator('a[href="forex"]'),
      converter: page.locator('a[href="date-converter"]'),
      notes: page.locator('a[href="notes"]'),
      blog: page.locator('a[href="posts"]'),
    };

    // Social media links
    this.socialLinks = {
      facebook: page.locator('a[href*="facebook.com/hamropatro"]'),
      twitter: page.locator('a[href*="twitter.com/hamropatro"]'),
      instagram: page.locator('a[href*="instagram.com/hamropatro"]'),
      youtube: page.locator('a[href*="youtube.com"]'),
    };
  }

  /**
   * Navigate to homepage
   */
  async navigate() {
    await this.page.goto('/', { waitUntil: 'domcontentloaded' });
    await this.page.waitForLoadState('load');
  }

  /**
   * Click a navigation link and verify navigation
   */
  async clickNavLink(linkName) {
    const link = this.navLinks[linkName];
    if (!link) throw new Error(`Navigation link '${linkName}' not found`);

    await expect(link.locator.first()).toBeVisible({ timeout: 8_000 });
    await link.locator.first().click();
    await this.page.waitForLoadState('domcontentloaded');

    if (link.expectedPath) {
      await expect(this.page).toHaveURL(new RegExp(link.expectedPath));
    }
  }

  /**
   * Verify all navbar links are present
   */
  async verifyAllNavLinksPresent() {
    for (const [name, link] of Object.entries(this.navLinks)) {
      await expect(link.locator.first()).toBeAttached();
    }
  }

  /**
   * Get all href values from navbar
   */
  async getAllNavHrefs() {
    const hrefs = {};
    for (const [name, link] of Object.entries(this.navLinks)) {
      hrefs[name] = await link.locator.first().getAttribute('href');
    }
    return hrefs;
  }

  /**
   * Navigate to an internal link and verify it doesn't return 404
   */
  async verifyLinkNotBroken(url) {
    const response = await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    return response && response.status() < 400;
  }

  /**
   * Verify footer navigation links
   */
  async verifyFooterLinks() {
    for (const [name, link] of Object.entries(this.footerLinks)) {
      await expect(link.locator).toBeAttached();
    }
  }

  /**
   * Verify social media links are present
   */
  async verifySocialLinks() {
    for (const [name, link] of Object.entries(this.socialLinks)) {
      await expect(link).toBeAttached();
    }
  }
}
