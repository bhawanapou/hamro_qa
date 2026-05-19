import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Screenshot Helper Utility
 * Provides methods for taking and managing screenshots during test execution
 */
export class ScreenshotHelper {
  constructor() {
    this.screenshotDir = path.resolve(__dirname, '..', 'screenshots');
    if (!fs.existsSync(this.screenshotDir)) {
      fs.mkdirSync(this.screenshotDir, { recursive: true });
    }
  }

  /**
   * Generate a unique screenshot filename
   */
  _generateFilename(prefix) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    return `${prefix}-${timestamp}.png`;
  }

  /**
   * Take a full page screenshot
   */
  async takeFullPageScreenshot(page, prefix = 'fullpage') {
    const filename = this._generateFilename(prefix);
    const filepath = path.join(this.screenshotDir, filename);
    await page.screenshot({ path: filepath, fullPage: true });
    return filepath;
  }

  /**
   * Take a viewport screenshot
   */
  async takeViewportScreenshot(page, prefix = 'viewport') {
    const filename = this._generateFilename(prefix);
    const filepath = path.join(this.screenshotDir, filename);
    await page.screenshot({ path: filepath });
    return filepath;
  }

  /**
   * Take a screenshot of a specific element
   */
  async takeElementScreenshot(locator, prefix = 'element') {
    const filename = this._generateFilename(prefix);
    const filepath = path.join(this.screenshotDir, filename);
    await locator.screenshot({ path: filepath });
    return filepath;
  }

  /**
   * Take a screenshot on test failure (use in afterEach hooks)
   */
  async captureOnFailure(page, testInfo) {
    if (testInfo.status !== testInfo.expectedStatus) {
      const sanitizedTitle = testInfo.title.replace(/[^a-zA-Z0-9]/g, '_');
      const filename = this._generateFilename(`FAIL-${sanitizedTitle}`);
      const filepath = path.join(this.screenshotDir, filename);
      await page.screenshot({ path: filepath, fullPage: true });
      await testInfo.attach('failure-screenshot', {
        path: filepath,
        contentType: 'image/png',
      });
      return filepath;
    }
    return null;
  }

  /**
   * Clean up old screenshots (older than specified days)
   */
  cleanOldScreenshots(days = 7) {
    const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
    const files = fs.readdirSync(this.screenshotDir);
    for (const file of files) {
      const filepath = path.join(this.screenshotDir, file);
      const stats = fs.statSync(filepath);
      if (stats.mtimeMs < cutoff) {
        fs.unlinkSync(filepath);
      }
    }
  }
}

export const screenshotHelper = new ScreenshotHelper();
