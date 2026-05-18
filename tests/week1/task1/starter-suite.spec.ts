import { test, expect } from '../../../fixtures/test-fixtures';
import { selectors, ORANGEHRM_LOGIN_URL, ORANGEHRM_CREDENTIALS } from '../../../utils/selectors';

test.describe('Week 1 - Task 1 Starter Suite @week1 @task1 @smoke @ui @ci', () => {
  test('renders OrangeHRM login page with title', async ({ page }) => {
    await page.goto(ORANGEHRM_LOGIN_URL);
    await page.waitForLoadState('networkidle');
    await expect(page.locator(selectors.loginTitle)).toContainText('Login');
  });

  test('logs in with valid credentials and lands on dashboard', async ({ page }) => {
    await page.goto(ORANGEHRM_LOGIN_URL);
    await page.waitForLoadState('networkidle');
    await page.locator(selectors.usernameInput).fill(ORANGEHRM_CREDENTIALS.username);
    await page.locator(selectors.passwordInput).fill(ORANGEHRM_CREDENTIALS.password);
    await page.locator(selectors.loginButton).click();
    await expect(page.locator(selectors.sidebarMenu)).toBeVisible({ timeout: 30_000 });
  });

  test('login page has stable visible controls', async ({ page }) => {
    await page.goto(ORANGEHRM_LOGIN_URL);
    await page.waitForLoadState('networkidle');
    await expect(page.locator(selectors.usernameInput)).toBeVisible();
    await expect(page.locator(selectors.passwordInput)).toBeVisible();
    await expect(page.locator(selectors.loginButton)).toBeVisible();
  });
});
