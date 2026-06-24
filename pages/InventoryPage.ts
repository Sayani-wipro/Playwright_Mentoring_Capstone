import { Locator, Page } from '@playwright/test';

export class InventoryPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitForInventoryPage() {
    await this.page.waitForURL(/.*inventory\.html/);
  }

  getInventoryContainer(): Locator {
    return this.page.locator('.inventory_list');
  }

  getInventoryItems(): Locator {
    return this.page.locator('.inventory_item');
  }

  getItemNames(): Locator {
    return this.page.locator('.inventory_item_name');
  }

  getItemPrices(): Locator {
    return this.page.locator('.inventory_item_price');
  }

  getItemDescriptions(): Locator {
    return this.page.locator('.inventory_item_desc');
  }

  getItemByIndex(index: number): Locator {
    return this.getInventoryItems().nth(index);
  }

  getItemNameByIndex(index: number): Locator {
    return this.getItemByIndex(index).locator('.inventory_item_name');
  }

  getItemPriceByIndex(index: number): Locator {
    return this.getItemByIndex(index).locator('.inventory_item_price');
  }

  getItemDescriptionByIndex(index: number): Locator {
    return this.getItemByIndex(index).locator('.inventory_item_desc');
  }

  getSortDropdown(): Locator {
    return this.page.locator('[data-test="product-sort-container"]');
  }

  async selectSortOption(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.page.selectOption('[data-test="product-sort-container"]', option);
  }
}
