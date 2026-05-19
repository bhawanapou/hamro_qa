import { expect } from '@playwright/test';

/**
 * NotesPage - Page Object Model for Hamro Patro Notes Feature
 * Handles notes creation, viewing, and login requirement checks
 */
export class NotesPage {
  constructor(page) {
    this.page = page;

    // Notes section on homepage
    this.notesHeading = page.locator('h2').filter({ has: page.locator('a[href="/notes"]') });
    this.notesLink = page.locator('a[href="/notes"]').first();
    this.addNoteButton = page.locator('img[src*="Add_button"]');
    this.addNoteLink = page.locator('a').filter({ hasText: 'Add Note' });
    this.notesEmptyMessage = page.getByText('You can add your notes here.');

    // Note form elements (visible after login)
    this.noteForm = page.locator('form, [class*="note-form"], [class*="add-note"]').first();
    this.noteTitleInput = page.locator('input[name*="title"], input[placeholder*="title"]').first();
    this.noteContentInput = page.locator('textarea, [contenteditable="true"], input[name*="content"]').first();
    this.saveNoteButton = page.locator('button:has-text("Save"), button:has-text("Add"), button:has-text("Submit")').first();
    this.cancelButton = page.locator('button:has-text("Cancel"), button:has-text("Close")').first();

    // Login prompt
    this.loginPrompt = page.locator('[class*="login"], [class*="auth"], text=Login, text=Sign In').first();

    // Notes list
    this.noteItems = page.locator('[class*="note-item"], [class*="note-card"]');
  }

  /**
   * Navigate to the Notes page
   */
  async navigate() {
    await this.page.goto('/notes', { waitUntil: 'domcontentloaded' });
    await this.page.waitForLoadState('load');
  }

  /**
   * Navigate to notes from the homepage section
   */
  async navigateFromHomepage() {
    await this.page.goto('/', { waitUntil: 'domcontentloaded' });
    await this.notesLink.scrollIntoViewIfNeeded();
    await this.notesLink.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Click the Add Note button
   */
  async clickAddNote() {
    await this.addNoteLink.click();
    await this.page.waitForTimeout(2000);
  }

  /**
   * Verify notes section is visible on homepage
   */
  async verifyNotesSectionOnHomepage() {
    await this.page.goto('/', { waitUntil: 'domcontentloaded' });
    await this.notesHeading.scrollIntoViewIfNeeded();
    await expect(this.notesHeading).toBeVisible();
  }

  /**
   * Verify that login is required for notes
   */
  async verifyLoginRequired() {
    await this.navigate();
    await this.page.waitForTimeout(2000);
    const currentUrl = this.page.url();
    const hasLoginRedirect = currentUrl.includes('login') || currentUrl.includes('auth');
    const hasLoginPrompt = await this.loginPrompt.isVisible().catch(() => false);
    return hasLoginRedirect || hasLoginPrompt;
  }

  /**
   * Verify add note popup/form appears
   */
  async verifyAddNotePopup() {
    await this.clickAddNote();
    const formVisible = await this.noteForm.isVisible().catch(() => false);
    const urlChanged = this.page.url().includes('note') || this.page.url().includes('login');
    return formVisible || urlChanged;
  }

  /**
   * Verify the empty notes message
   */
  async verifyEmptyNotesMessage() {
    await expect(this.notesEmptyMessage).toBeAttached();
  }
}
