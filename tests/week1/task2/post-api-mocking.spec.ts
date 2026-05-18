import { test, expect } from '../../../fixtures/test-fixtures';

test.describe('Week 1 - Task 2 POST API Mocking @week1 @task2 @api @post @ci', () => {
  test('mocks POST https://jsonplaceholder.typicode.com/posts', async ({ page }) => {
    await page.route('https://jsonplaceholder.typicode.com/posts', async (route) => {
      expect(route.request().method()).toBe('POST');

      const requestBody = route.request().postDataJSON() as {
        title: string;
        body: string;
        userId: number;
      };

      await route.fulfill({
        status: 201,
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'access-control-allow-origin': '*'
        },
        body: JSON.stringify({ id: 101, ...requestBody })
      });
    });

    await page.goto('data:text/html,<html><body>api mock</body></html>');

    const payload = await page.evaluate(async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'new title', body: 'new body', userId: 9 })
      });
      return response.json();
    });

    expect(payload).toEqual({
      id: 101,
      title: 'new title',
      body: 'new body',
      userId: 9
    });
  });
});