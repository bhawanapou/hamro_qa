import { test, expect } from './testSetup.js';
import { NotesPage } from '../pageObjects/NotesPage.js';

test.describe('Notes Module Tests @regression @ui', () => {
  let notesPage;

  test.beforeEach(async ({ page }) => {
    notesPage = new NotesPage(page);
  });

  test('should display the notes section on the homepage', async () => {
    await notesPage.verifyNotesSectionOnHomepage();
  });

  test('should navigate to notes page', async ({ page }) => {
    await notesPage.navigate();
    await expect(page).toHaveURL(/notes|login|auth/);
  });

  test('should require login to access the notes feature', async () => {
    expect(await notesPage.verifyLoginRequired()).toBe(true);
  });

  test('should show add note button on the homepage', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(notesPage.addNoteLink).toBeVisible();
  });

  test('should trigger add note action and show login or form', async () => {
    await notesPage.navigateFromHomepage();
    expect(await notesPage.verifyAddNotePopup()).toBe(true);
  });

  test('should display empty notes message when not logged in', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await notesPage.verifyEmptyNotesMessage();
  });
});
