import { devices } from '@playwright/test';

export const browsers = {
  // All browsers
  all: [
    {
      name: 'chrome',
      use: { ...devices['Desktop Chrome'], browserName: 'chromium', channel: 'chrome' }
    },
    // {
    //   name: 'edge',
    //   use: { ...devices['Desktop Edge'], browserName: 'chromium', channel: 'msedge' }
    // },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'], browserName: 'firefox' }
    // },
  ],

  // Chrome and Edge only (for visual and a11y tests)
  chromeAndEdge: [
    {
      name: 'chrome',
      use: { ...devices['Desktop Chrome'], browserName: 'chromium', channel: 'chrome' }
    },
    {
      name: 'edge',
      use: { ...devices['Desktop Edge'], browserName: 'chromium', channel: 'msedge' }
    },
  ],
};
