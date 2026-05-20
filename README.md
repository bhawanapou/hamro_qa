# Hamro Patro QA Automation Framework

A lightweight, academic-friendly Playwright automation framework for testing the [Hamro Patro](https://www.hamropatro.com) website.

## Project Summary

This project demonstrates a clean JavaScript-based Playwright automation framework using the Page Object Model (POM). It is designed for final-year academic submission, with a focus on readability, stability, and low resource usage.

## What’s Included

- UI and functional tests using Playwright
- API endpoint validation using Playwright request fixtures
- Page Object Model architecture for maintainability
- Shared failure handling with automatic screenshots
- Academic documentation and viva materials
- Simple configuration using `.env`
- Optimized settings for low-end laptops

## Folder Structure

```
.
├── fixtures/                # Test data and configuration
├── pageObjects/             # Page Object Model classes
├── tests/                   # Playwright test suites
├── utils/                   # Helper utilities
├── reports/                 # Test logs and generated files
├── screenshots/             # Failure screenshots
├── playwright.config.js     # Playwright configuration
├── package.json             # Node dependencies and scripts
├── .env.example             # Environment variable template
├── README.md                # Project documentation
└── ACADEMIC_DOCUMENTATION.md # Academic documentation and viva materials
```

## Prerequisites

- Node.js 18.x or later
- npm 9.x or later

## Setup

```bash
cd "C:\\Shankar Adhikari\\QA\\QA_project"
npm install
npx playwright install --with-deps
```

## Configuration

Create your local `.env` file from the template:

```powershell
copy .env.example .env
```

Then update settings if needed:

```env
BASE_URL=https://www.hamropatro.com
```

## Run Tests

### Run all tests

```bash
npm test
```

### Run Chromium only

```bash
npm run test:chromium
```

### Run API tests only

```bash
npm run test:api
```

### Run a single file

```bash
npx playwright test tests/login.spec.js
```

## Test Types

- `@smoke` — basic sanity checks
- `@regression` — broader feature coverage
- `@ui` — visual and element checks
- `@api` — backend endpoint validations

## Reporting

HTML report generation is available via:

```bash
npm run report
```

The report includes:

- test summary
- failure screenshots
- trace files for debugging

## Academic Notes

- Uses **Page Object Model** for clean separation of page behavior and test scenarios
- Uses **Playwright assertions** for retry-safe test stability
- Designed for **low resource consumption** by limiting worker count and disabling video recording
- Includes **failure capture** and **structured logging** for easier debugging

## Troubleshooting

If tests fail with environment or dependency errors:

1. Ensure Node.js is installed
2. Run `npm install`
3. Run `npx playwright install --with-deps`
4. Confirm `.env` exists and contains `BASE_URL`

If a test fails due to UI changes, inspect the failure screenshot in `screenshots/` and update the locator in `pageObjects/`.
