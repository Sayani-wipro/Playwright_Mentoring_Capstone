# Playwright Weekly Suite

Week-wise Playwright automation suite for 6 tasks with stable selectors, fixture-driven setup, endpoint mocking, evidence artifacts, CI matrix, accessibility checks, and coding exercises.

## Structure

- tests/week1/task1: Starter suite (3 tests)
- tests/week1/task2: Intercept-based mocking for 2 endpoints
- tests/week2/task3: Trace/video/reporting checks
- tests/week2/task4: Cross-browser matrix smoke flow
- tests/week3/task5: Accessibility + visual regression
- tests/week3/task6: Async/await + array/object transform coding set
- fixtures: shared fixtures
- mocking: reusable route mocks
- utils: selectors, app template, transforms
- artifacts/evidence: screenshot evidence
- artifacts/results: JSON/JUnit/summary outputs
- .github/workflows/playwright.yml: CI matrix + artifact publishing

## Install

```bash
npm install
npx playwright install chromium firefox msedge
```

## Run

```bash
npm test
```

Update visual baseline:

```bash
npm run test:update-snapshots
```

Build summary from JSON reporter:

```bash
npm run results:summary
```

