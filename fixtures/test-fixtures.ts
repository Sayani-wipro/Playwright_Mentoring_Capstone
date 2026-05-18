import { test as base, expect } from '@playwright/test';
import { setupApiMocks } from '../mocking/api-mocks';

type LabFixtures = {
  withApiMocks: () => Promise<void>;
};

export const test = base.extend<LabFixtures>({
  withApiMocks: async ({ page }, use) => {
    await use(async () => {
      await setupApiMocks(page);
    });
  }
});

export { expect };