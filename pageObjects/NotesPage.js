import { expect } from '@playwright/test';

/**
 * NotesPage - Page Object Model for Hamro Patro Notes feature.
 * Handles note navigation, login requirements, and page validation.
 */
export class NotesPage {
  constructor(page) {
    this.page = page;
    this.notesLink = page.locator('a[href="/notes"], a:has-text("मेरो नोट")').first();
    this.notesSection = page.locator('nav, header, section').filter({ has: this.notesLink });
    this.addNoteLink = this.notesLink;
    this.notesEmptyMessage = page.locator('text=VIEW ALL, text=मेरो नोट');
    this.noteForm = page.locator('form, [class*="note-form"], [class*="add-note"]').first();
    this.loginPrompt = page.locator('text=Login, text=Sign In, [class*="auth"], [class*="login"]').first();
  }

  async navigate() {
    await this.page.goto('/notes', { waitUntil: 'load' });
  }

  async navigateFromHomepage() {
    await this.page.goto('/', { waitUntil: 'load' });
    await expect(this.notesLink).toBeVisible();
    await this.notesLink.click();
  }

  async clickAddNote() {
    await expect(this.addNoteLink).toBeVisible({ timeout: 8_000 });
    await this.addNoteLink.click();
  }

  async verifyNotesSectionOnHomepage() {
    await this.page.goto('/', { waitUntil: 'load' });
    await expect(this.notesLink).toBeVisible();
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

