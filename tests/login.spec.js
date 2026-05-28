import { test, expect } from './testSetup.js';
import { LoginPage } from '../pageObjects/LoginPage.js';
import testData from '../fixtures/testData.json' with { type: 'json' };

test.describe('Login Tests @regression @ui', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto('/', { waitUntil: 'load' });
  });

  test('should display the account icon on homepage', async () => {
    await expect(loginPage.accountIcon).toBeVisible({ timeout: 10_000 });
  });

  test('should open login flow when clicking the account icon', async () => {
    await loginPage.openLoginFlow();
    await expect(loginPage.loginModal).toBeVisible();
  });

  test('should show an error for invalid login credentials', async () => {
    await loginPage.loginWithCredentials(
      testData.invalidCredentials.email,
      testData.invalidCredentials.password
    );
    expect(await loginPage.verifyErrorDisplayed()).toBe(true);
  });

  test('should validate missing email field during login', async () => {
    await loginPage.loginWithCredentials(
      testData.invalidCredentials.emptyEmail,
      testData.invalidCredentials.emptyPassword
    );
    expect(await loginPage.verifyErrorDisplayed()).toBe(true);
  });

  test('should validate invalid email format during login', async () => {
    await loginPage.loginWithCredentials(
      testData.invalidCredentials.invalidEmail,
      testData.validCredentials.password
    );
    expect(await loginPage.verifyErrorDisplayed()).toBe(true);
  });

  test('should validate short password handling', async () => {
    await loginPage.loginWithCredentials(
      testData.validCredentials.email,
      testData.invalidCredentials.shortPassword
    );
    expect(await loginPage.verifyErrorDisplayed()).toBe(true);
  });

  test('should not be logged in by default', async () => {
    expect(await loginPage.isLoggedIn()).toBe(false);
  });

  test('should show login form inputs when login flow starts', async () => {
    const hasFormElements = await loginPage.verifyLoginFormElements();
    expect(hasFormElements).toBe(true);
  });
});

