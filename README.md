# QA Playwright Demo

A Playwright test repository for Sauce Demo with functional, visual, and performance test coverage.

## Project Structure

- `tests/` — Playwright test files
- `tests/visual/` — visual regression tests
- `tests/page-objects/` — page object models
- `playwright.config.js` — Playwright configuration with separate `visual` and `performance` projects
- `package.json` — project scripts and dependencies

## Setup

Install dependencies:

```bash
npm ci
```

Install Playwright browsers:

```bash
npx playwright install --with-deps
```

## Run tests

### Default test suite

```bash
npm test
```

### Visual tests

```bash
npm run test:visual
```

Update visual snapshots:

```bash
npm run test:visual:update
```

Run visual tests with HTML report:

```bash
npm run test:visual:html
```

### Performance tests

```bash
npm run test:perf
```

Run performance tests with HTML report:

```bash
npm run test:perf:html
```

## Notes

- Visual tests are isolated under the `visual` Playwright project.
- Performance tests are isolated under the `performance` Playwright project.
- Use `npx playwright show-report` after running tests with `--reporter=html` to inspect HTML results.
