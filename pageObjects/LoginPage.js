import { expect } from '@playwright/test';

/**
 * LoginPage - Page Object Model for Hamro Patro Login
 * This class handles login flow triggers, form interaction, and validation.
 */
export class LoginPage {
  constructor(page) {
    this.page = page;

    this.accountIcon = page.locator('img#user_image, img#user_imagae').first();
    this.loginModal = page.locator('[role="dialog"], [class*="modal"], [class*="login"], [class*="auth"]').first();
    this.emailInput = page.locator('input[type="email"], input[name*="email"], input[placeholder*="email"]').first();
    this.phoneInput = page.locator('input[type="tel"], input[name*="phone"], input[placeholder*="phone"]').first();
    this.passwordInput = page.locator('input[type="password"]').first();
    this.loginButton = page.locator('button:has-text("Login"), button:has-text("Sign In"), button:has-text("लग-इन")').first();
    this.errorMessage = page.locator('[role="alert"], [class*="error"], [class*="alert"]');
    this.profileAvatar = page.locator('img[src*="avatar"], [class*="avatar"], [class*="profile-pic"]');
    this.logoutButton = page.locator('button:has-text("Logout"), a:has-text("Logout"), button:has-text("Sign Out")').first();
  }

  async openLoginFlow() {
    await expect(this.accountIcon).toBeVisible({ timeout: 10_000 });
    await this.accountIcon.click();
    await expect(this.loginModal).toBeVisible({ timeout: 10_000 });
  }

  async loginWithCredentials(email, password) {
    await this.openLoginFlow();

    if (await this.emailInput.isVisible().catch(() => false)) {
      await this.emailInput.fill(email);
    } else if (await this.phoneInput.isVisible().catch(() => false)) {
      await this.phoneInput.fill(email);
    }

    if (await this.passwordInput.isVisible().catch(() => false)) {
      await this.passwordInput.fill(password);
    }

    await expect(this.loginButton).toBeVisible({ timeout: 8_000 });
    await this.loginButton.click();
  }

  async verifyLoginFlowTriggered() {
    return await this.loginModal.isVisible().catch(() => false);
  }

  async verifyErrorDisplayed() {
    return await this.errorMessage.isVisible().catch(() => false);
  }

  async isLoggedIn() {
    return await this.profileAvatar.isVisible().catch(() => false);
  }

  async verifyLoginFormElements() {
    await this.openLoginFlow();
    return (await this.emailInput.isVisible().catch(() => false)) ||
           (await this.phoneInput.isVisible().catch(() => false));
  }
}
