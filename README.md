
# QA Playwright Demo

[![Playwright Tests](https://github.com/thedorCode-star/playwright-saucedemo-tests/actions/workflows/playwright.yml/badge.svg)](https://github.com/thedorCode-star/playwright-saucedemo-tests/actions/workflows/playwright.yml)
[![Visual Tests](https://github.com/thedorCode-star/playwright-saucedemo-tests/actions/workflows/playwright-visual.yml/badge.svg)](https://github.com/thedorCode-star/playwright-saucedemo-tests/actions/workflows/playwright-visual.yml)
[![Performance Tests](https://github.com/thedorCode-star/playwright-saucedemo-tests/actions/workflows/playwright-performance.yml/badge.svg)](https://github.com/thedorCode-star/playwright-saucedemo-tests/actions/workflows/playwright-performance.yml)

Short demo repository showcasing end-to-end automation using Playwright. Designed for recruiters and reviewers to quickly assess my QA skills.

**Highlights**
- Clear, maintainable test examples using `@playwright/test`.
- Tests located in the `tests/` folder (`login.spec.js`, `cart.spec.js`).
- Focus on actionable E2E scenarios, readable assertions, and simple setup.

**Quick start**
1. Install dependencies:

```bash
npm install
```

2. Install Playwright browsers (recommended):

```bash
npx playwright install
```

If your macOS blocks WebKit, install the browsers you need only:

```bash
npx playwright install chromium firefox
```

3. Run the test suite:

```bash
npm test
```

Or run the HTML report directly:

```bash
npm run test:html
```

Run with trace collection on retry:

```bash
npm run test:trace
```

- `npm test` runs the full Playwright suite in the default headless mode.
- `npm run test:html` generates an HTML report in `playwright-report/`.
- `npm run test:trace` collects retry traces for failed runs, which helps debug flaky tests.

Run only visual tests locally:

```bash
npx playwright test tests/visual
```

Run only performance tests locally:

```bash
npx playwright test tests/performance.spec.js
```

**Continuous Integration**
This repo includes three GitHub Actions workflows:

- `.github/workflows/playwright.yml` runs the full Playwright suite on push/PR to `main`, plus daily schedule and manual workflow dispatch.
- `.github/workflows/playwright-visual.yml` runs only the visual suite on PRs, manual dispatch, and push to `main`.
- `.github/workflows/playwright-performance.yml` runs only the performance spec on PRs, manual dispatch, and push to `main`.

The workflows install dependencies, install Playwright browsers, run tests, and upload reports/traces on failure.

Your visual test lives in `tests/visual/`, with snapshots stored under `tests/visual/visual.spec.js-snapshots/`.
Your performance test is `tests/performance.spec.js`.

**For recruiters**
- What to look for: test clarity, selector strategy, and meaningful assertions.
- I can expand this demo (more scenarios, test reporting, CI matrices, TypeScript conversion) on request.

**Contact**
- Tresor Tshimanga Kazadi 
- tshims79@gmail.com

Thank you for reviewing my work.
