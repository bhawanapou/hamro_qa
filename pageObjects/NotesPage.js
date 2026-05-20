import { expect } from '@playwright/test';

/**
 * NotesPage - Page Object Model for Hamro Patro Notes feature.
 * Handles note navigation, login requirements, and page validation.
 */
export class NotesPage {
  constructor(page) {
    this.page = page;
    this.notesHeading = page.locator('h2').filter({ has: page.locator('a[href="/notes"]') });
    this.notesLink = page.locator('a[href="/notes"]').first();
    this.addNoteLink = page.locator('a:has-text("Add Note"), button:has-text("Add Note"), img[src*="Add_button"]').first();
    this.notesEmptyMessage = page.getByText('You can add your notes here.');
    this.noteForm = page.locator('form, [class*="note-form"], [class*="add-note"]').first();
    this.loginPrompt = page.locator('text=Login, text=Sign In, [class*="auth"], [class*="login"]').first();
  }

  async navigate() {
    await this.page.goto('/notes', { waitUntil: 'domcontentloaded' });
  }

  async navigateFromHomepage() {
    await this.page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(this.notesLink).toBeVisible();
    await this.notesLink.click();
  }

  async clickAddNote() {
    await expect(this.addNoteLink).toBeVisible({ timeout: 8_000 });
    await this.addNoteLink.click();
  }

  async verifyNotesSectionOnHomepage() {
    await this.page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(this.notesHeading).toBeVisible();
  }

  async verifyLoginRequired() {
    await this.navigate();
    const currentUrl = this.page.url();
    const hasLoginRedirect = currentUrl.includes('login') || currentUrl.includes('auth');
    const hasLoginPrompt = await this.loginPrompt.isVisible().catch(() => false);
    return hasLoginRedirect || hasLoginPrompt;
  }

  async verifyAddNotePopup() {
    await this.clickAddNote();
    const formVisible = await this.noteForm.isVisible().catch(() => false);
    const urlChanged = this.page.url().includes('note') || this.page.url().includes('login');
    return formVisible || urlChanged;
  }

  async verifyEmptyNotesMessage() {
    await expect(this.notesEmptyMessage).toBeVisible();
  }
}
