import type { Page } from '@playwright/test';

export async function setupApiMocks(page: Page): Promise<void> {
  await page.route('https://jsonplaceholder.typicode.com/todos?userId=1', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        { id: 101, title: 'Keyboard order', completed: false },
        { id: 102, title: 'Monitor order', completed: true }
      ])
    });
  });

  await page.route('https://jsonplaceholder.typicode.com/users/1', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        id: 1,
        name: 'Avery Quinn',
        username: 'qa-engineer'
      })
    });
  });
}