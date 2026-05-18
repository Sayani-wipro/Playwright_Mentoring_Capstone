import { test, expect } from '../../../fixtures/test-fixtures';
import { selectors, ORANGEHRM_LOGIN_URL, ORANGEHRM_CREDENTIALS } from '../../../utils/selectors';

test.describe('Week 2 - Task 3 Artifacts and Reporting @week2 @task3 @artifacts @ci', () => {
  test('login and navigate to generate trace, video and screenshot artifacts', async ({ page }) => {
    await page.goto(ORANGEHRM_LOGIN_URL);
    await page.waitForLoadState('networkidle');
    await page.locator(selectors.usernameInput).fill(ORANGEHRM_CREDENTIALS.username);
    await page.locator(selectors.passwordInput).fill(ORANGEHRM_CREDENTIALS.password);
    await page.locator(selectors.loginButton).click();
    await expect(page.locator(selectors.sidebarMenu)).toBeVisible({ timeout: 30_000 });
    await page.screenshot({ path: 'artifacts/evidence/week2-task3-dashboard.png', fullPage: true });
  });
});
