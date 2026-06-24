import { Locator, Page } from '@playwright/test';

export class CheckoutPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async addBackpackToCartFromInventory() {
    await this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  }

  async openCart() {
    await this.page.locator('.shopping_cart_link').click();
  }

  async clickCheckout() {
    await this.page.locator('[data-test="checkout"]').click();
  }

  async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
    await this.page.locator('[data-test="firstName"]').fill(firstName);
    await this.page.locator('[data-test="lastName"]').fill(lastName);
    await this.page.locator('[data-test="postalCode"]').fill(postalCode);
  }

  async clickContinue() {
    await this.page.locator('[data-test="continue"]').click();
  }

  async clickFinish() {
    await this.page.locator('[data-test="finish"]').click();
  }

  getCheckoutError(): Locator {
    return this.page.locator('[data-test="error"]');
  }

  getCompleteHeader(): Locator {
    return this.page.locator('[data-test="complete-header"]');
  }

  getCompleteText(): Locator {
    return this.page.locator('[data-test="complete-text"]');
  }
}
