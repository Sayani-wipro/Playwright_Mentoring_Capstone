import { test, expect } from '../../../fixtures/test-fixtures';
import { selectors, LOGIN_URL, CREDENTIALS } from '../../../utils/selectors';

test.describe('Week 2 - Task 3 Artifacts and Reporting @week2 @task3 @artifacts @ci', () => {
  test('login and navigate to generate trace, video and screenshot artifacts', async ({ page }) => {
    test.setTimeout(90000);
    await page.goto(LOGIN_URL, { timeout: 90000 });
    await page.waitForLoadState('networkidle');
    await page.locator(selectors.usernameInput).fill(CREDENTIALS.username);
    await page.locator(selectors.passwordInput).fill(CREDENTIALS.password);
    await page.locator(selectors.loginButton).click();
    await expect(page).toHaveURL(/logged-in-successfully/);
    await expect(page.locator(selectors.dashboardTitle)).toContainText('Logged In Successfully');
    await expect(page.locator(selectors.sidebarMenu)).toBeVisible({ timeout: 30_000 });
    await page.screenshot({ path: 'artifacts/evidence/week2-task3-dashboard.png', fullPage: true });
  });
});
