import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Network Failure Simulation using route.abort()', () => {
  test('Abort image requests ', async ({ page }) => {
    await page.route('**/*.{png,jpg,jpeg,gif,webp,svg}', route => route.abort());

    const loginPage = new LoginPage(page);
    await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.waitForInventoryPage();

    const inventoryPage = new InventoryPage(page);
    await expect(inventoryPage.getInventoryContainer()).toBeVisible();
    await expect(inventoryPage.getInventoryItems()).toHaveCount(6);
  });

  test('Abort CSS requests', async ({ page }) => {
    await page.route('**/*.css', route => route.abort());

    const loginPage = new LoginPage(page);
    await loginPage.navigateTo();

    await expect(page.locator('#user-name')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    await expect(page.locator('#login-button')).toBeVisible();
  });

  test('Abort navigation to cart and verify failure', async ({ page }) => {
    await page.route('**/cart.html', route => route.abort());

    const loginPage = new LoginPage(page);
    await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.waitForInventoryPage();

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    let navigationFailed = false;
    try {
      await page.goto('/cart.html', { timeout: 5000 });
    } catch {
      navigationFailed = true;
    }
    expect(navigationFailed).toBe(true);
  });
});
