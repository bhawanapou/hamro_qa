/**
 * Random Data Generator Utility
 * Provides methods for generating random test data
 */
export class RandomDataGenerator {
  /**
   * Generate a random string of specified length
   */
  static randomString(length = 10) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * Generate a random email address
   */
  static randomEmail(domain = 'test.com') {
    const prefix = this.randomString(8).toLowerCase();
    return `${prefix}@${domain}`;
  }

  /**
   * Generate a random phone number (Nepal format)
   */
  static randomPhoneNumber() {
    const prefix = '98';
    let number = prefix;
    for (let i = 0; i < 8; i++) {
      number += Math.floor(Math.random() * 10);
    }
    return number;
  }

  /**
   * Generate a random number within a range
   */
  static randomNumber(min = 1, max = 100) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Generate a random password with complexity requirements
   */
  static randomPassword(length = 12) {
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const digits = '0123456789';
    const special = '!@#$%^&*';
    const all = upper + lower + digits + special;

    let password = '';
    password += upper.charAt(Math.floor(Math.random() * upper.length));
    password += lower.charAt(Math.floor(Math.random() * lower.length));
    password += digits.charAt(Math.floor(Math.random() * digits.length));
    password += special.charAt(Math.floor(Math.random() * special.length));

    for (let i = 4; i < length; i++) {
      password += all.charAt(Math.floor(Math.random() * all.length));
    }

    return password.split('').sort(() => Math.random() - 0.5).join('');
  }

  /**
   * Generate a random note title
   */
  static randomNoteTitle() {
    const titles = [
      'Meeting Notes', 'Todo List', 'Project Ideas',
      'Daily Log', 'Reminder', 'Shopping List',
      'Book Notes', 'Travel Plan', 'Budget Tracker',
    ];
    return `${titles[Math.floor(Math.random() * titles.length)]} ${this.randomNumber(1, 999)}`;
  }

  /**
   * Generate a random note content
   */
  static randomNoteContent() {
    const sentences = [
      'This is a test note for automation.',
      'Remember to follow up on this item.',
      'Important details recorded here.',
      'Action items from the meeting.',
      'Notes for future reference.',
    ];
    return sentences[Math.floor(Math.random() * sentences.length)];
  }

  /**
   * Generate a random search query
   */
  static randomSearchQuery() {
    const queries = [
      'दशैं', 'तिहार', 'होली', 'छठ',
      'Dashain', 'Tihar', 'Festival', 'Holiday',
      'New Year', 'Buddha Jayanti',
    ];
    return queries[Math.floor(Math.random() * queries.length)];
  }

  /**
   * Generate a random Nepali year (BS)
   */
  static randomNepaliYear() {
    return this.randomNumber(2070, 2089).toString();
  }

  /**
   * Generate a random month number (1-12)
   */
  static randomMonth() {
    return this.randomNumber(1, 12).toString();
  }
}
