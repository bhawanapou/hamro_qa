import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
  });
  const page = await context.newPage();
  await page.goto('https://www.hamropatro.com', { waitUntil: 'load', timeout: 30000 });

  console.log('notesCount', await page.locator('a[href="/notes"]').count());
  console.log('notesText', await page.locator('a[href="/notes"]').allTextContents());
  console.log('notesOuterHTML', await page.locator('a[href="/notes"]').first().evaluate(el => el.outerHTML));
  await browser.close();
})();
