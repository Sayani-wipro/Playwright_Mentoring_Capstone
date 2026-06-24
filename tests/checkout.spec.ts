import { expect, test } from '@playwright/test';
import { CheckoutPage } from '../pages/CheckoutPage';
import { LoginPage } from '../pages/LoginPage';

test.describe('Checkout validations', () => {
  test.beforeEach(async ({ page }) => {
    const username = process.env.S_USERNAME;
    const password = process.env.PASSWORD;

    expect(username, 'Missing S_USERNAME in .env').toBeTruthy();
    expect(password, 'Missing PASSWORD in .env').toBeTruthy();

    const loginPage = new LoginPage(page);
    await loginPage.login(username as string, password as string);
    await loginPage.waitForInventoryPage();
  });

  test('Validate Checkout with Empty Fields', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    await checkoutPage.addBackpackToCartFromInventory();
    await checkoutPage.openCart();
    await checkoutPage.clickCheckout();
    await checkoutPage.clickContinue();

    await expect(checkoutPage.getCheckoutError()).toBeVisible();
    await expect(checkoutPage.getCheckoutError()).toContainText('Error: First Name is required');
  });

  test('Complete Successful Checkout', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    const firstName = process.env.CHECKOUT_FIRST_NAME || 'John';
    const lastName = process.env.CHECKOUT_LAST_NAME || 'Doe';
    const postalCode = process.env.CHECKOUT_POSTAL_CODE || '560001';

    await checkoutPage.addBackpackToCartFromInventory();
    await checkoutPage.openCart();
    await checkoutPage.clickCheckout();
    await checkoutPage.fillCheckoutInformation(firstName, lastName, postalCode);
    await checkoutPage.clickContinue();
    await checkoutPage.clickFinish();

    await expect(page).toHaveURL(/.*checkout-complete\.html/);
  });

  test('Verify Order Confirmation Message', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    const firstName = process.env.CHECKOUT_FIRST_NAME || 'John';
    const lastName = process.env.CHECKOUT_LAST_NAME || 'Doe';
    const postalCode = process.env.CHECKOUT_POSTAL_CODE || '560001';

    await checkoutPage.addBackpackToCartFromInventory();
    await checkoutPage.openCart();
    await checkoutPage.clickCheckout();
    await checkoutPage.fillCheckoutInformation(firstName, lastName, postalCode);
    await checkoutPage.clickContinue();
    await checkoutPage.clickFinish();

    await expect(checkoutPage.getCompleteHeader()).toHaveText('Thank you for your order!');
    await expect(checkoutPage.getCompleteText()).toContainText('Your order has been dispatched');
  });
});
