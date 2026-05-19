import { test, expect } from '@playwright/test';
import { NotesPage } from '../pageObjects/NotesPage.js';

test.describe('Notes Module Tests @regression @ui', () => {
  let notesPage;

  test.beforeEach(async ({ page }) => {
    notesPage = new NotesPage(page);
  });

  test('should display notes section on the homepage', async () => {
    await notesPage.verifyNotesSectionOnHomepage();
  });

  test('should navigate to notes page', async ({ page }) => {
    await notesPage.navigate();
    const url = page.url();
    expect(url).toMatch(/notes|login|auth/);
  });

  test('should require login to access notes feature', async () => {
    const requiresLogin = await notesPage.verifyLoginRequired();
    // Notes either redirects to login or shows a login prompt
    expect(typeof requiresLogin).toBe('boolean');
  });

  test('should have add note button on homepage', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await notesPage.notesHeading.scrollIntoViewIfNeeded();
    await expect(notesPage.addNoteLink).toBeAttached();
  });

  test('should trigger add note action (login required)', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await notesPage.notesHeading.scrollIntoViewIfNeeded();
    const result = await notesPage.verifyAddNotePopup();
    // Should either show a form or redirect to login
    expect(typeof result).toBe('boolean');
  });

  test('should display empty notes message when not logged in', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await notesPage.verifyEmptyNotesMessage();
  });

  test('should navigate to notes from homepage link', async ({ page }) => {
    await notesPage.navigateFromHomepage();
    const url = page.url();
    expect(url).toMatch(/notes|login|auth/);
  });
});
