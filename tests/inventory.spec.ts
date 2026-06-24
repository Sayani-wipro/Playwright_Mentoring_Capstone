import { expect, test } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { LoginPage } from '../pages/LoginPage';

test.describe('Inventory page validations', () => {
  test.beforeEach(async ({ page }) => {
    const username = process.env.S_USERNAME;
    const password = process.env.PASSWORD;

    const loginPage = new LoginPage(page);
    await loginPage.login(username as string, password as string);
  });

  test('Verify Product Listing', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.waitForInventoryPage();

    await expect(inventoryPage.getInventoryContainer()).toBeVisible();
    await expect(inventoryPage.getInventoryItems()).toHaveCount(6);
  });

  test('Verify Product Details', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.waitForInventoryPage();

    const firstItem = inventoryPage.getItemByIndex(0);

    await expect(firstItem).toBeVisible();
    await expect(inventoryPage.getItemNameByIndex(0)).toBeVisible();
    await expect(inventoryPage.getItemPriceByIndex(0)).toBeVisible();
    await expect(inventoryPage.getItemDescriptionByIndex(0)).toBeVisible();
  });

  test('Validate Product Name, Price, and Description', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.waitForInventoryPage();

    const itemCount = await inventoryPage.getInventoryItems().count();
    expect(itemCount).toBeGreaterThan(0);

    for (let i = 0; i < itemCount; i++) {
      const name = (await inventoryPage.getItemNameByIndex(i).innerText()).trim();
      const price = (await inventoryPage.getItemPriceByIndex(i).innerText()).trim();
      const description = (await inventoryPage.getItemDescriptionByIndex(i).innerText()).trim();

      expect(name, `Item ${i + 1} has empty name`).not.toBe('');
      expect(price, `Item ${i + 1} has invalid price`).toMatch(/^\$\d+(\.\d{2})?$/);
      expect(description, `Item ${i + 1} has empty description`).not.toBe('');
    }
  });
});

test.describe('Product Sorting / Filter Validation', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('Sort products Name A to Z', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.waitForInventoryPage();

    await inventoryPage.selectSortOption('az');

    const names = await inventoryPage.getItemNames().allInnerTexts();
    const sorted = [...names].sort((a, b) => a.localeCompare(b));
    expect(names).toEqual(sorted);
  });

  test('Sort products Name Z to A', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.waitForInventoryPage();

    await inventoryPage.selectSortOption('za');

    const names = await inventoryPage.getItemNames().allInnerTexts();
    const sorted = [...names].sort((a, b) => b.localeCompare(a));
    expect(names).toEqual(sorted);
  });

  test('Sort products Price Low to High', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.waitForInventoryPage();

    await inventoryPage.selectSortOption('lohi');

    const priceTexts = await inventoryPage.getItemPrices().allInnerTexts();
    const prices = priceTexts.map(p => parseFloat(p.replace('$', '')));
    for (let i = 0; i < prices.length - 1; i++) {
      expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
    }
  });

  test('Sort products Price High to Low', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.waitForInventoryPage();

    await inventoryPage.selectSortOption('hilo');

    const priceTexts = await inventoryPage.getItemPrices().allInnerTexts();
    const prices = priceTexts.map(p => parseFloat(p.replace('$', '')));
    for (let i = 0; i < prices.length - 1; i++) {
      expect(prices[i]).toBeGreaterThanOrEqual(prices[i + 1]);
    }
  });
});
