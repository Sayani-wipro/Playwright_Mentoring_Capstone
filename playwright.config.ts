import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : 2,
  timeout: 45_000,
  expect: {
    timeout: 15_000,
    toHaveScreenshot: { animations: 'disabled', maxDiffPixelRatio: 0.01 }
  },
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['json', { outputFile: 'artifacts/results/results.json' }],
    ['junit', { outputFile: 'artifacts/results/results.xml' }]
  ],
  use: {
    navigationTimeout: 30_000,
    trace: 'on',
    video: 'on',
    screenshot: 'only-on-failure',
    viewport: { width: 1366, height: 768 }
  },
  projects: [
    {
      name: 'chrome',
      use: { ...devices['Desktop Chrome'], browserName: 'chromium', channel: 'chrome' }
    },
    {
      name: 'edge',
      use: { ...devices['Desktop Edge'], browserName: 'chromium', channel: 'msedge' }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'], browserName: 'firefox' }
    },
  ]
});
