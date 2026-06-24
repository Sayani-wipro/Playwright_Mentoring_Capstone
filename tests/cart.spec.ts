import { expect, test } from '@playwright/test';
import { CartPage } from '../pages/CartPage';
import { LoginPage } from '../pages/LoginPage';

test.describe('Cart page validations', () => {
  test.beforeEach(async ({ page }) => {
    const username = process.env.S_USERNAME;
    const password = process.env.PASSWORD;

    expect(username, 'Missing S_USERNAME in .env').toBeTruthy();
    expect(password, 'Missing PASSWORD in .env').toBeTruthy();

    const loginPage = new LoginPage(page);
    await loginPage.login(username as string, password as string);
  });

  test('Add Products to Cart', async ({ page }) => {
    const cartPage = new CartPage(page);
    await cartPage.waitForInventoryPage();

    await cartPage.addProductToCartByName('Sauce Labs Backpack');

    await expect(cartPage.getCartBadge()).toHaveText('1');

    await cartPage.openCart();
    await cartPage.waitForCartPage();

    await expect(cartPage.getCartItemByName('Sauce Labs Backpack')).toBeVisible();
  });

  test('Remove Products from Cart', async ({ page }) => {
    const cartPage = new CartPage(page);
    await cartPage.waitForInventoryPage();

    await cartPage.addProductToCartByName('Sauce Labs Bike Light');
    await cartPage.openCart();
    await cartPage.waitForCartPage();

    await cartPage.removeProductFromCartByName('Sauce Labs Bike Light');

    await expect(cartPage.getCartItemByName('Sauce Labs Bike Light')).toHaveCount(0);
    await expect(cartPage.getCartBadge()).toHaveCount(0);
  });

  test('Validate Cart Badge Count', async ({ page }) => {
    const cartPage = new CartPage(page);
    await cartPage.waitForInventoryPage();

    await cartPage.addProductToCartByName('Sauce Labs Backpack');
    await cartPage.addProductToCartByName('Sauce Labs Bike Light');

    await expect(cartPage.getCartBadge()).toHaveText('2');

    await cartPage.removeProductFromInventoryByName('Sauce Labs Backpack');

    await expect(cartPage.getCartBadge()).toHaveText('1');
  });

  test('Add Multiple Products', async ({ page }) => {
    const cartPage = new CartPage(page);
    await cartPage.waitForInventoryPage();

    const productNames = ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt'];

    await cartPage.addMultipleProductsToCart(productNames);

    await expect(cartPage.getCartBadge()).toHaveText('3');

    await cartPage.openCart();
    await cartPage.waitForCartPage();

    await expect(cartPage.getCartItems()).toHaveCount(3);

    for (const productName of productNames) {
      await expect(cartPage.getCartItemByName(productName)).toBeVisible();
    }
  });
});
