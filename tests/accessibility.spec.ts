import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Basic Accessibility Checks', () => {
  test('Login Accessibility test', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo();

    const usernamePlaceholder = await page.locator('#user-name').getAttribute('placeholder');
    const passwordPlaceholder = await page.locator('#password').getAttribute('placeholder');
    expect(usernamePlaceholder).toBeTruthy();
    expect(passwordPlaceholder).toBeTruthy();
  });

  test('Login button accessibility test', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo();

    const loginBtn = page.getByRole('button', { name: /login/i });
    await expect(loginBtn).toBeVisible();
    await expect(loginBtn).toBeEnabled();
  });

  test('Inventory product images - alt attributes', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.waitForInventoryPage();

    const images = page.locator('.inventory_item_img img');
    const count = await images.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute('alt');
      expect(alt, `Image ${i + 1} missing alt attribute`).toBeTruthy();
    }
  });

  test('Cart link accessibility test', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.waitForInventoryPage();

    const cartLink = page.locator('.shopping_cart_link');
    await cartLink.focus();
    await expect(cartLink).toBeFocused();
  });

  test('All product names accessibility test', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.waitForInventoryPage();

    const inventoryPage = new InventoryPage(page);
    const names = inventoryPage.getItemNames();
    const count = await names.count();
    expect(count).toBe(6);

    for (let i = 0; i < count; i++) {
      await expect(names.nth(i)).toBeVisible();
      const text = (await names.nth(i).innerText()).trim();
      expect(text, `Product ${i + 1} has empty name`).not.toBe('');
    }
  });
});
