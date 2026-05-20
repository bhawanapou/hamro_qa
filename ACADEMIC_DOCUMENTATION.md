# Academic Documentation

## System Architecture

This framework uses a modular design with a focus on separation of concerns.

- **Playwright** provides browser automation and assertions.
- **Page Object Model (POM)** abstracts page locators and interactions into reusable classes.
- **Test data** is stored in `fixtures/testData.json` for easier maintenance.
- **Shared fixtures** in `tests/testSetup.js` handle failure capture and reporting.

## Testing Methodology

- UI tests verify page elements, navigation, and user flows.
- API tests verify backend endpoints and response structure.
- Responsive tests verify the site renders correctly on mobile, tablet, and desktop viewports.
- Performance tests measure page load timings and basic resource health.

## Project Objectives

- Build a maintainable Playwright automation framework.
- Demonstrate clean code suitable for a final-year project.
- Keep the framework lightweight and easy to run on low-end laptops.
- Use real browser automation with professional test practices.

## Project Scope

- UI automation for homepage, login flow, search, news, calendar, notes, and navigation.
- API validation for key website endpoints.
- Responsive and performance observations for academic validation.
- Failure handling, screenshots, and reporting.

## Limitations

- The framework tests the public website and may be affected by layout changes.
- Some flows use login/OTP behavior indirectly because the site depends on authentication.
- Performance measurements are comparative and not a full load-testing suite.

## Future Enhancements

- Add authenticated user login tests.
- Add data-driven test generation from external data sources.
- Add custom test reporting for academic review.
- Add CI integration for automated runs.
- Add mobile touch interaction flows.

## Conclusion

This framework is designed to be easy to explain during a viva, with clear POM structure, meaningful assertions, and academic-ready documentation.

## Viva Questions and Answers

### Q1: What is the Page Object Model?
A1: Page Object Model is a design pattern that represents each page as a class containing locators and methods. It improves readability and reduces duplicate code.

### Q2: Why use Playwright?
A2: Playwright supports modern browsers, strong test assertions, and easy integration with JavaScript. It is also efficient for UI automation.

### Q3: How does the project handle failures?
A3: Failed tests automatically capture screenshots and attach them to the report for debugging.

### Q4: How is this project optimized for low-end laptops?
A4: The framework uses a single worker, headless execution, and disables video recording to reduce resource usage.

### Q5: How can the project be extended?
A5: Add a new page object class, then create matching tests using the shared fixture and existing test conventions.

## Presentation Talking Points

- Simple and student-friendly project architecture
- Separation of page implementation and test scenarios
- Reliable assertions over arbitrary waits
- Built-in failure support for troubleshooting
- Balanced functionality with low system requirements
