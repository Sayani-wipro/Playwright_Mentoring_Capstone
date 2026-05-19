import { test, expect } from '../../../fixtures/test-fixtures';

test.describe('Week 1 - Task 2 POST API Mocking @week1 @task2 @api @post @ci', () => {
  test('mocks POST https://jsonplaceholder.typicode.com/posts', async ({ page,withApiMocks }) => {
    await withApiMocks();
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