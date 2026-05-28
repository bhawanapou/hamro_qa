import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
  });
  const page = await context.newPage();
  await page.goto('https://www.hamropatro.com/calendar/2083/1', {
    waitUntil: 'networkidle',
    timeout: 30000,
  });

  const selectors = [
    ['calendarHeading', 'h1:has-text("Nepali Calendar")'],
    ['prevLink', 'a:has-text("Prev")'],
    ['nextLink', 'a:has-text("Next")'],
    ['todayButton', 'a:has-text("आज")'],
    ['yearDropdown', 'select[name="year"]'],
    ['monthDropdown', 'select[name="month"]'],
    ['weekdayHeader', 'li:has-text("Sunday")'],
    ['newsBulletin', 'text=समाचार बुलेटिन'],
    ['notesLink', 'a[href="/notes"], a[href*="/notes"]'],
  ];

  for (const [name, sel] of selectors) {
    const locator = page.locator(sel);
    const count = await locator.count().catch(() => -1);
    const text = count > 0 ? await locator.first().textContent().catch(() => '') : '';
    console.log(name, count, text ? text.trim().slice(0, 120) : '');
  }

  const anchors = await page.locator('a').allTextContents();
  console.log('aCount', anchors.length, 'first20', anchors.slice(0, 20));
  await browser.close();
})();
