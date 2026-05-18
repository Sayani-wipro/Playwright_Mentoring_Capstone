import { test, expect } from '../../../fixtures/test-fixtures';

test.describe('Week 1 - Task 2 PUT API Mocking @week1 @task2 @api @put @ci', () => {
  test('mocks PUT https://jsonplaceholder.typicode.com/posts/1', async ({ page }) => {
    await page.route('https://jsonplaceholder.typicode.com/posts/1', async (route) => {
      expect(route.request().method()).toBe('PUT');

      const requestBody = route.request().postDataJSON() as {
        id: number;
        title: string;
        body: string;
        userId: number;
      };

      await route.fulfill({
        status: 200,
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'access-control-allow-origin': '*'
        },
        body: JSON.stringify(requestBody)
      });
    });

    await page.goto('data:text/html,<html><body>api mock</body></html>');

    const payload = await page.evaluate(async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: 1, title: 'updated title', body: 'updated body', userId: 1 })
      });
      return response.json();
    });

    expect(payload).toEqual({
      id: 1,
      title: 'updated title',
      body: 'updated body',
      userId: 1
    });
  });
});