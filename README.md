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

## Task Coverage

1. Task 1 (Week 1)
- File: tests/week1/task1/starter-suite.spec.ts
- Includes 3 tests with stable selectors and fixture usage.

2. Task 2 (Week 1)
- Files:
  - tests/week1/task2/get-api-mocking.spec.ts
  - tests/week1/task2/post-api-mocking.spec.ts
  - tests/week1/task2/put-api-mocking.spec.ts
  - tests/week1/task2/delete-api-mocking.spec.ts
- Mocks:
  - https://jsonplaceholder.typicode.com/posts/1 (GET/PUT/DELETE)
  - https://jsonplaceholder.typicode.com/posts (POST)
- Stores screenshots in artifacts/evidence.

3. Task 3 (Week 2)
- Config: playwright.config.ts
- Uses trace, video, screenshots, and multi-reporter output.
- CI uploads generated artifacts.

4. Task 4 (Week 2)
- Workflow: .github/workflows/playwright.yml
- Browser matrix:
  - chrome
  - edge
  - firefox
- Generates per-browser artifact bundles.

5. Task 5 (Week 3)
- File: tests/week3/task5/a11y-visual.spec.ts
- Produces a11y report attachment and baseline screenshot.
- Baseline image path after snapshot run:
  - tests/week3/task5/a11y-visual.spec.ts-snapshots/week3-critical-flow-chrome-win32.png

6. Task 6 (Week 3)
- File: tests/week3/task6/coding-set.spec.ts
- Demonstrates async/await and array/object transforms with assertions.

## Evidence Quality

- Mock stability evidence: artifacts/evidence screenshots.
- Reporting evidence: artifacts/results/results.json, artifacts/results/results.xml, and artifacts/results/summary.md.
- Accessibility evidence: attached a11y-report.json in test-results.
- Visual regression evidence: baseline snapshot and generated diff artifacts on mismatch.
