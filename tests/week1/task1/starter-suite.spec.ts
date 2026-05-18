import { test, expect } from '../../../fixtures/test-fixtures';
import { selectors } from '../../../utils/selectors';

test.describe('Week 1 - Task 1 Starter Suite @week1 @task1 @smoke @ui @ci', () => {
  test('renders dashboard title using stable selector', async ({ page, openLabApp }) => {
    await openLabApp();
    await expect(page.locator(selectors.pageTitle)).toHaveText('Playwright Lab Dashboard');
  });

  test('supports login flow with deterministic output', async ({ page, openLabApp }) => {
    await openLabApp();
    await page.locator(selectors.usernameInput).fill('sam');
    await page.locator(selectors.loginButton).click();
    await expect(page.locator(selectors.welcomeMessage)).toHaveText('Welcome, sam!');
  });

  test('keeps core controls visible and stable', async ({ page, openLabApp }) => {
    await openLabApp();
    await expect(page.locator(selectors.loginButton)).toBeVisible();
    await expect(page.locator(selectors.loadOrdersButton)).toBeVisible();
    await expect(page.locator(selectors.loadProfileButton)).toBeVisible();
  });
});
