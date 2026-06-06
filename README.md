# QA Playwright Demo

Thank you for reviewing my portfolio demo. This repository contains a small Playwright-based end-to-end test suite I built to demonstrate my QA automation skills.

**What this project shows**
- Uses `@playwright/test` to write reliable end-to-end tests.
- Example test files are in the `tests/` folder (`login.spec.js`, `cart.spec.js`, etc.).
- Focus on clear, maintainable test structure, selectors and assertions.

**Tech stack**
- Node.js
- Playwright (`@playwright/test`)

**How to run the tests (local)**
1. Install dependencies:

```bash
npm install
```

2. Install Playwright browser binaries (recommended):

```bash
npx playwright install
```

If you encounter errors installing WebKit on some macOS versions, install only the browsers you need (e.g. skip WebKit):

```bash
npx playwright install chromium firefox
```

3. Run tests (headed):

```bash
npx playwright test --headed
```

Or run headless (default):

```bash
npx playwright test
```

**Notes for recruiters / reviewers**
- This is a demonstration repository for hiring evaluation and learning. Tests are intentionally compact and focused on showing E2E flows.
- If you want me to expand this (more scenarios, CI config, reports, or refactor to TS), tell me which areas you'd like to see.

**Contact**
- Email: tshims79@gmail.com

Thank you for taking a look!
