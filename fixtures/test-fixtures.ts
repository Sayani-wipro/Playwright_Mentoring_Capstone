import { test as base, expect } from '@playwright/test';
import { appHtml } from '../utils/app-template';
import { setupApiMocks } from '../mocking/api-mocks';

type LabFixtures = {
  openLabApp: () => Promise<void>;
  withApiMocks: () => Promise<void>;
};

export const test = base.extend<LabFixtures>({
  openLabApp: async ({ page }, use) => {
    await use(async () => {
      await page.setContent(appHtml);
    });
  },
  withApiMocks: async ({ page }, use) => {
    await use(async () => {
      await setupApiMocks(page);
    });
  }
});

export { expect };