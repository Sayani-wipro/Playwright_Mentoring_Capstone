import { test, expect } from '../../../fixtures/test-fixtures';

test.describe('Week 1 - Task 2 GET API Mocking @week1 @task2 @api @get @ci', () => {
  test('mocks GET https://jsonplaceholder.typicode.com/posts/1', async ({ page }) => {
    await page.route('https://jsonplaceholder.typicode.com/posts/1', async (route) => {
      await route.fulfill({
        status: 200,
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'access-control-allow-origin': '*'
        },
        body: JSON.stringify({ id: 1, title: 'mocked-get-title', body: 'mocked-get-body', userId: 1 })
      });
    });

    await page.goto('data:text/html,<html><body>api mock</body></html>');

    const payload = await page.evaluate(async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
      return response.json();
    });

    expect(payload).toEqual({
      id: 1,
      title: 'mocked-get-title',
      body: 'mocked-get-body',
      userId: 1
    });
  });
});