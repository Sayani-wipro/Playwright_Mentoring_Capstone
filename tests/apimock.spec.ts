import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('API Mocking using route.fulfill()', () => {
  test('verifies interception on inventory page', async ({ page }) => {
    let intercepted = false;

    await page.route('**/inventory.html', async route => {
      intercepted = true;
      const response = await route.fetch();
      await route.fulfill({ response });
    });

    const loginPage = new LoginPage(page);
    await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.waitForInventoryPage();

    expect(intercepted).toBe(true);
    const inventoryPage = new InventoryPage(page);
    await expect(inventoryPage.getInventoryContainer()).toBeVisible();
    await expect(inventoryPage.getInventoryItems()).toHaveCount(6);
  });

  test('checking product image requests with mocking', async ({ page }) => {
    const mockSvg =
      '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">' +
      '<rect width="100" height="100" fill="#e0e0e0"/>' +
      '<text x="50" y="55" text-anchor="middle" fill="#999" font-size="12">Mock</text>' +
      '</svg>';

    await page.route('**/*.{png,jpg,jpeg,gif,webp}', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'image/svg+xml',
        body: mockSvg,
      });
    });

    const loginPage = new LoginPage(page);
    await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.waitForInventoryPage();

    const inventoryPage = new InventoryPage(page);
    await expect(inventoryPage.getInventoryContainer()).toBeVisible();
    await expect(inventoryPage.getInventoryItems()).toHaveCount(6);
  });

  test('Intercept cart page response', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.waitForInventoryPage();

    await page.route('**/cart.html', async route => {
      const response = await route.fetch();
      await route.fulfill({ response });
    });

    await page.locator('.shopping_cart_link').click();
    await page.waitForURL(/.*cart\.html/);
    await expect(page.locator('.cart_contents_container')).toBeVisible();
  });
});
