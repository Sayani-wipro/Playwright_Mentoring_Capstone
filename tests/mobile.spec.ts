import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Mobile Viewport Testing', () => {
  test('Login page - mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo();

    await expect(page.locator('#user-name')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    await expect(page.locator('#login-button')).toBeVisible();
  });

  test('Inventory page - mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    const loginPage = new LoginPage(page);
    await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.waitForInventoryPage();

    const inventoryPage = new InventoryPage(page);
    await expect(inventoryPage.getInventoryContainer()).toBeVisible();
    await expect(inventoryPage.getInventoryItems().first()).toBeVisible();
    const count = await inventoryPage.getInventoryItems().count();
    expect(count).toBe(6);
  });

  test('Add to cart - mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    const loginPage = new LoginPage(page);
    await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.waitForInventoryPage();

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    await page.locator('.shopping_cart_link').click();
    await page.waitForURL(/.*cart\.html/);
    await expect(page.locator('.cart_item')).toHaveCount(1);
  });
});
