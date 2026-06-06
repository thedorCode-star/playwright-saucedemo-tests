
# QA Playwright Demo

[![Playwright Tests](https://github.com/OWNER/REPO/actions/workflows/playwright.yml/badge.svg)](https://github.com/OWNER/REPO/actions/workflows/playwright.yml)

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
npx playwright test --headed
```

Or run headless:

```bash
npx playwright test
```

**Continuous Integration**
This repo includes a GitHub Actions workflow at `.github/workflows/playwright.yml` that runs the Playwright test suite on push and pull requests. The badge above will show build status once you replace `OWNER/REPO` with your repository path.

**For recruiters**
- What to look for: test clarity, selector strategy, and meaningful assertions.
- I can expand this demo (more scenarios, test reporting, CI matrices, TypeScript conversion) on request.

**Contact**
- Replace with your preferred contact (email or LinkedIn): your-email@example.com

Thank you for reviewing my work.
