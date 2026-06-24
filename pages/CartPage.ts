import { Locator, Page } from '@playwright/test';

export class CartPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitForInventoryPage() {
    await this.page.waitForURL(/.*inventory\.html/);
  }

  async waitForCartPage() {
    await this.page.waitForURL(/.*cart\.html/);
  }

  async addProductToCartByName(productName: string) {
    await this.page
      .locator('.inventory_item')
      .filter({ hasText: productName })
      .locator('button:has-text("Add to cart")')
      .click();
  }

  async addMultipleProductsToCart(productNames: string[]) {
    for (const productName of productNames) {
      await this.addProductToCartByName(productName);
    }
  }

  async removeProductFromInventoryByName(productName: string) {
    await this.page
      .locator('.inventory_item')
      .filter({ hasText: productName })
      .locator('button:has-text("Remove")')
      .click();
  }

  async openCart() {
    await this.page.locator('.shopping_cart_link').click();
  }

  async removeProductFromCartByName(productName: string) {
    await this.page
      .locator('.cart_item')
      .filter({ hasText: productName })
      .locator('button:has-text("Remove")')
      .click();
  }

  getCartBadge(): Locator {
    return this.page.locator('.shopping_cart_badge');
  }

  getCartItems(): Locator {
    return this.page.locator('.cart_item');
  }

  getCartItemByName(productName: string): Locator {
    return this.page.locator('.cart_item').filter({ hasText: productName });
  }
}
