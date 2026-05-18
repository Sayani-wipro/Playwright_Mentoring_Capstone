import { test, expect } from '../../../fixtures/test-fixtures';
import { selectors } from '../../../utils/selectors';

test.describe('Week 2 - Task 4 Cross Browser Matrix @week2 @task4 @crossbrowser @smoke @ci', () => {
  test('runs critical smoke flow across browser projects', async ({ page, browserName, openLabApp, withApiMocks }) => {
    await withApiMocks();
    await openLabApp();

    await page.locator(selectors.usernameInput).fill(`user-${browserName}`);
    await page.locator(selectors.loginButton).click();
    await page.locator(selectors.loadOrdersButton).click();

    await expect(page.locator(selectors.welcomeMessage)).toHaveText(`Welcome, user-${browserName}!`);
    await expect(page.locator(selectors.orderRow)).toHaveCount(2);
  });
});
