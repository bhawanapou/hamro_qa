import { expect } from '@playwright/test';

/**
 * LoginPage - Page Object Model for Hamro Patro Login
 * Hamro Patro uses OTP-based authentication via phone/email.
 * This POM handles the login modal/flow triggered from the account icon.
 */
export class LoginPage {
  constructor(page) {
    this.page = page;

    // Account trigger
    this.accountIcon = page.locator('img[src*="account_circle"]');

    // Login modal/page elements (OTP-based login)
    this.loginModal = page.locator('[class*="modal"], [class*="login"], [class*="auth"], [role="dialog"]').first();
    this.phoneInput = page.locator('input[type="tel"], input[placeholder*="phone"], input[name*="phone"]').first();
    this.emailInput = page.locator('input[type="email"], input[placeholder*="email"], input[name*="email"]').first();
    this.passwordInput = page.locator('input[type="password"]').first();
    this.loginButton = page.locator('button:has-text("Login"), button:has-text("Sign In"), button:has-text("लग-इन"), a:has-text("Login")').first();
    this.signUpLink = page.locator('a:has-text("Sign Up"), a:has-text("Register"), button:has-text("Sign Up")').first();
    this.otpInput = page.locator('input[type="number"], input[placeholder*="OTP"], input[name*="otp"]').first();
    this.submitOtpButton = page.locator('button:has-text("Verify"), button:has-text("Submit")').first();
    this.googleLoginButton = page.locator('button:has-text("Google"), a:has-text("Google"), [class*="google"]').first();

    // Error messages
    this.errorMessage = page.locator('[class*="error"], [class*="alert"], [role="alert"]').first();

    // Logged-in state indicators
    this.profileAvatar = page.locator('[class*="avatar"], [class*="profile-pic"], img[src*="avatar"]').first();
    this.logoutButton = page.locator('button:has-text("Logout"), a:has-text("Logout"), button:has-text("Sign Out")').first();
  }

  /**
   * Open the login flow by clicking the account icon
   */
  async openLoginFlow() {
    await this.accountIcon.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Attempt login with email/phone (Hamro Patro uses OTP, so this is a mock flow)
   */
  async loginWithCredentials(email, password) {
    await this.openLoginFlow();
    await this.page.waitForTimeout(2000);

    if (await this.emailInput.isVisible()) {
      await this.emailInput.fill(email);
    } else if (await this.phoneInput.isVisible()) {
      await this.phoneInput.fill(email);
    }

    if (await this.passwordInput.isVisible()) {
      await this.passwordInput.fill(password);
    }

    if (await this.loginButton.isVisible()) {
      await this.loginButton.click();
    }
  }

  /**
   * Verify login modal/page appears
   */
  async verifyLoginFlowTriggered() {
    await this.page.waitForTimeout(2000);
    const urlChanged = this.page.url().includes('login') ||
                       this.page.url().includes('auth') ||
                       this.page.url().includes('account');
    const modalVisible = await this.loginModal.isVisible().catch(() => false);
    return urlChanged || modalVisible;
  }

  /**
   * Verify error message is displayed for invalid login
   */
  async verifyErrorDisplayed() {
    try {
      await expect(this.errorMessage).toBeVisible({ timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Check if user is logged in
   */
  async isLoggedIn() {
    try {
      await expect(this.profileAvatar).toBeVisible({ timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Verify the login page/modal has required form elements
   */
  async verifyLoginFormElements() {
    await this.openLoginFlow();
    await this.page.waitForTimeout(2000);

    const hasInput =
      (await this.emailInput.isVisible().catch(() => false)) ||
      (await this.phoneInput.isVisible().catch(() => false));

    return hasInput;
  }
}
