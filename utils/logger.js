import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Logger Utility - Provides structured logging for test execution
 * Logs are written to both console and a log file
 */
class Logger {
  constructor() {
    this.logDir = path.resolve(__dirname, '..', 'reports');
    this.logFile = path.join(this.logDir, `test-run-${new Date().toISOString().split('T')[0]}.log`);

    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  /**
   * Format a log message with timestamp and level
   */
  _format(level, message) {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level}] ${message}`;
  }

  /**
   * Write to log file
   */
  _writeToFile(formattedMessage) {
    try {
      fs.appendFileSync(this.logFile, formattedMessage + '\n');
    } catch {
      // Silently handle file write errors
    }
  }

  /**
   * Log an informational message
   */
  info(message) {
    const formatted = this._format('INFO', message);
    console.log(formatted);
    this._writeToFile(formatted);
  }

  /**
   * Log a warning message
   */
  warn(message) {
    const formatted = this._format('WARN', message);
    console.warn(formatted);
    this._writeToFile(formatted);
  }

  /**
   * Log an error message
   */
  error(message) {
    const formatted = this._format('ERROR', message);
    console.error(formatted);
    this._writeToFile(formatted);
  }

  /**
   * Log a debug message
   */
  debug(message) {
    const formatted = this._format('DEBUG', message);
    if (process.env.DEBUG) {
      console.log(formatted);
    }
    this._writeToFile(formatted);
  }

  /**
   * Log the start of a test
   */
  testStart(testName) {
    this.info(`=== TEST START: ${testName} ===`);
  }

  /**
   * Log the end of a test
   */
  testEnd(testName, status) {
    this.info(`=== TEST END: ${testName} - ${status.toUpperCase()} ===`);
  }

  /**
   * Log a step within a test
   */
  step(stepDescription) {
    this.info(`  STEP: ${stepDescription}`);
  }
}

export const logger = new Logger();
