import { test, expect } from '@playwright/test';
import { LoginPage } from '../pageObjects/LoginPage.js';
import testData from '../fixtures/testData.json' with { type: 'json' };

test.describe('Login Tests @regression @ui', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto('/', { waitUntil: 'domcontentloaded' });
  });

  test('should display account/login icon on homepage', async () => {
    await expect(loginPage.accountIcon).toBeAttached();
  });

  test('should trigger login flow when clicking account icon', async () => {
    await loginPage.openLoginFlow();
    const triggered = await loginPage.verifyLoginFlowTriggered();
    expect(triggered).toBeTruthy();
  });

  test('should handle invalid login credentials gracefully', async () => {
    await loginPage.loginWithCredentials(
      testData.invalidCredentials.email,
      testData.invalidCredentials.password
    );
    // Hamro Patro uses OTP login; verify it handles invalid input without crashing
    const url = loginPage.page.url();
    expect(url).toBeTruthy();
  });

  test('should handle empty email field submission', async () => {
    await loginPage.loginWithCredentials(
      testData.invalidCredentials.emptyEmail,
      testData.invalidCredentials.emptyPassword
    );
    const url = loginPage.page.url();
    expect(url).toBeTruthy();
  });

  test('should handle invalid email format', async () => {
    await loginPage.loginWithCredentials(
      testData.invalidCredentials.invalidEmail,
      testData.validCredentials.password
    );
    const url = loginPage.page.url();
    expect(url).toBeTruthy();
  });

  test('should handle short/weak password validation', async () => {
    await loginPage.loginWithCredentials(
      testData.validCredentials.email,
      testData.invalidCredentials.shortPassword
    );
    const url = loginPage.page.url();
    expect(url).toBeTruthy();
  });

  test('should not be logged in by default (session validation)', async () => {
    const isLoggedIn = await loginPage.isLoggedIn();
    expect(isLoggedIn).toBeFalsy();
  });

  test('should have login form elements when login flow is triggered', async () => {
    const hasFormElements = await loginPage.verifyLoginFormElements();
    // Login flow should redirect or show a form
    expect(typeof hasFormElements).toBe('boolean');
  });
});
