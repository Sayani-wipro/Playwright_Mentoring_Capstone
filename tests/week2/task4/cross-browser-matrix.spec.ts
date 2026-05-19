import { test, expect } from '../../../fixtures/test-fixtures';
import { selectors, LOGIN_URL, ORANGEHRM_CREDENTIALS } from '../../../utils/selectors';

test.describe('Week 2 - Task 4 Cross Browser Matrix @week2 @task4 @crossbrowser @smoke @ci', () => {
  test('OrangeHRM login page loads and accepts input across browsers', async ({ page, browserName }) => {
    test.setTimeout(90000);
    await page.goto(LOGIN_URL, { timeout: 90000 });
    await page.waitForLoadState('networkidle');
    await expect(page.locator(selectors.loginTitle)).toContainText('Test login');
    await page.locator(selectors.usernameInput).fill(ORANGEHRM_CREDENTIALS.username);
    await page.locator(selectors.passwordInput).fill(ORANGEHRM_CREDENTIALS.password);
    await expect(page.locator(selectors.loginButton)).toBeEnabled();
    test.info().annotations.push({ type: 'browser', description: browserName });
  });

  test('successful login reaches dashboard across browsers', async ({ page }) => {
    test.setTimeout(90000);
    await page.goto(LOGIN_URL, { timeout: 90000 });
    await page.waitForLoadState('networkidle');
    await page.locator(selectors.usernameInput).fill(ORANGEHRM_CREDENTIALS.username);
    await page.locator(selectors.passwordInput).fill(ORANGEHRM_CREDENTIALS.password);
    await page.locator(selectors.loginButton).click();
    await expect(page).toHaveURL(/logged-in-successfully/);
    await expect(page.locator(selectors.dashboardTitle)).toContainText('Logged In Successfully');
    await expect(page.locator(selectors.sidebarMenu)).toBeVisible({ timeout: 30_000 });
  });
});
