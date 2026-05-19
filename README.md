# Hamro Patro QA Automation Framework

Enterprise-level QA Automation Testing Framework for [Hamro Patro](https://www.hamropatro.com) built with Playwright, JavaScript, and Node.js.

## Project Overview

This framework provides comprehensive automated testing coverage for the Hamro Patro web application — Nepal's most popular calendar and lifestyle platform. It includes functional, UI, smoke, regression, API, responsive, and performance tests.

### Key Features

- **Page Object Model (POM)** architecture for maintainability
- **Cross-browser testing** (Chromium, Firefox, WebKit)
- **Mobile device emulation** (Pixel 5, iPhone 12)
- **Parallel test execution** for faster feedback
- **API testing** with Axios
- **HTML reporting** with screenshots and videos on failure
- **Data-driven testing** with JSON fixtures
- **Configurable** via environment variables
- **Utility helpers** (logger, screenshot, random data generator)

## Framework Structure

```
QA/
├── tests/                    # Test suites
│   ├── homepage.spec.js      # Homepage tests
│   ├── login.spec.js         # Login/authentication tests
│   ├── search.spec.js        # Search functionality tests
│   ├── calendar.spec.js      # Calendar module tests
│   ├── news.spec.js          # News module tests
│   ├── notes.spec.js         # Notes feature tests
│   ├── navigation.spec.js    # Navigation and link tests
│   ├── responsive.spec.js    # Responsive design tests
│   ├── performance.spec.js   # Performance/load time tests
│   └── api.spec.js           # API endpoint tests
├── pageObjects/              # Page Object Model classes
│   ├── HomePage.js
│   ├── LoginPage.js
│   ├── SearchPage.js
│   ├── CalendarPage.js
│   ├── NewsPage.js
│   ├── NotesPage.js
│   └── NavigationPage.js
├── fixtures/                 # Test data and fixtures
│   └── testData.json
├── utils/                    # Utility helpers
│   ├── logger.js
│   ├── screenshotHelper.js
│   └── randomDataGenerator.js
├── helper/                   # Test helpers
│   └── testHelper.js
├── reports/                  # Generated reports
├── screenshots/              # Failure screenshots
├── playwright.config.js      # Playwright configuration
├── package.json              # Dependencies and scripts
├── .env.example              # Environment variable template
└── README.md                 # This file
```

## Prerequisites

- **Node.js** >= 18.x
- **npm** >= 9.x

## Installation

```bash
# Clone the repository
git clone <repo-url>
cd QA

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install --with-deps
```

## Configuration

1. Copy the environment template:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` with your settings:
   ```
   BASE_URL=https://www.hamropatro.com
   ```

## Running Tests

### All Tests
```bash
npm test
```

### Headed Mode (with browser UI)
```bash
npm run test:headed
```

### Debug Mode
```bash
npm run test:debug
```

### Specific Browser
```bash
npm run test:chromium
npm run test:firefox
npm run test:webkit
```

### Mobile Tests
```bash
npm run test:mobile
```

### By Test Type
```bash
npm run test:smoke        # Smoke tests
npm run test:regression   # Regression tests
npm run test:api          # API tests
npm run test:ui           # UI tests
```

### Specific Test File
```bash
npx playwright test tests/homepage.spec.js
npx playwright test tests/api.spec.js
```

## Test Reports

### View HTML Report
```bash
npm run report
```

Reports are generated in `playwright-report/` with:
- Test results summary
- Screenshots on failure
- Video recordings on failure
- Trace files for debugging

## Testing Types

| Type | Tag | Description |
|------|-----|-------------|
| Smoke | `@smoke` | Critical path tests to verify basic functionality |
| Regression | `@regression` | Comprehensive tests for all features |
| UI | `@ui` | User interface and visual tests |
| API | `@api` | Backend API endpoint validation |

## Test Coverage

### Functional Tests
- Homepage loading and content verification
- Navigation between all pages
- Calendar month/year navigation
- News section and articles
- Notes feature (login-gated)
- Search functionality

### Login Tests
- Login flow trigger
- Invalid credentials handling
- Empty field validation
- Session state verification

### API Tests
- HTTP status code validation
- Response time measurement
- Content-type verification
- Error handling for invalid routes

### Responsive Tests
- Mobile viewport (375x667)
- Tablet viewport (768x1024)
- Desktop viewport (1280x720)
- Large desktop viewport (1920x1080)
- Device emulation (Pixel 5, iPhone 12)

### Performance Tests
- Page load time measurement
- Navigation timing
- Resource loading validation

## Best Practices

- **Page Object Model**: All page interactions are encapsulated in POM classes
- **Explicit waits**: Uses `waitForLoadState`, `waitForTimeout` for stability
- **Assertions**: Uses Playwright's built-in `expect` for retry-safe assertions
- **Data-driven**: Test data is externalized in `fixtures/testData.json`
- **Cross-browser**: Tests run on Chromium, Firefox, and WebKit
- **Parallel execution**: Tests run in parallel for faster feedback
- **Screenshots/Videos**: Automatically captured on failure
- **Clean code**: Modular, reusable methods with descriptive names

## Troubleshooting

### Browser not installed
```bash
npx playwright install --with-deps
```

### Tests timing out
Increase timeout in `playwright.config.js`:
```js
timeout: 120_000,
```

### Running on CI
Set the `CI` environment variable:
```bash
CI=true npm test
```
