import { test, expect } from '../../../fixtures/test-fixtures';
import { selectors, LOGIN_URL, CREDENTIALS } from '../../../utils/selectors';

test.describe('Practice Test Automation Login Suite @week1 @task1 @smoke @ui @ci', () => {
  test('renders Practice Test Automation login page with title', async ({ page }) => {
    test.setTimeout(90000);
    await page.goto(LOGIN_URL, { timeout: 90000 });
    await page.waitForLoadState('networkidle');
    await expect(page.locator(selectors.loginTitle)).toContainText('Test login');
  });

  test('logs in with valid credentials and lands on dashboard', async ({ page }) => {
    test.setTimeout(90000);
    await page.goto(LOGIN_URL, { timeout: 90000 });
    await page.waitForLoadState('networkidle');
    await page.locator(selectors.usernameInput).fill(CREDENTIALS.username);
    await page.locator(selectors.passwordInput).fill(CREDENTIALS.password);
    await page.locator(selectors.loginButton).click();
    await expect(page).toHaveURL(/logged-in-successfully/);
    await expect(page.locator(selectors.dashboardTitle)).toContainText('Logged In Successfully');
    await expect(page.locator(selectors.sidebarMenu)).toBeVisible();
  });

  test('shows error with invalid credentials', async ({ page }) => {
    test.setTimeout(90000);
    await page.goto(LOGIN_URL, { timeout: 90000 });
    await page.waitForLoadState('networkidle');
    await page.locator(selectors.usernameInput).fill('wronguser');
    await page.locator(selectors.passwordInput).fill('wrongpass');
    await page.locator(selectors.loginButton).click();
    await expect(page.locator(selectors.loginError)).toBeVisible();
    await expect(page.locator(selectors.loginError)).toContainText('Your username is invalid!');
  });

  test('login page has stable visible controls', async ({ page }) => {
    test.setTimeout(90000);
    await page.goto(LOGIN_URL, { timeout: 90000 });
    await page.waitForLoadState('networkidle');
    await expect(page.locator(selectors.usernameInput)).toBeVisible();
    await expect(page.locator(selectors.passwordInput)).toBeVisible();
    await expect(page.locator(selectors.loginButton)).toBeVisible();
  });
});
