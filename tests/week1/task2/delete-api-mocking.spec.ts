import { test, expect } from '../../../fixtures/test-fixtures';

test.describe('Week 1 - Task 2 DELETE API Mocking @week1 @task2 @api @delete @ci', () => {
  test('mocks DELETE https://jsonplaceholder.typicode.com/posts/1', async ({ page,withApiMocks }) => {

    await withApiMocks();

    await page.goto('data:text/html,<html><body>api mock</body></html>');

    const result = await page.evaluate(async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
        method: 'DELETE'
      });

      const payload = await response.json();
      return { status: response.status, payload };
    });

    expect(result).toEqual({ status: 200, payload: {} });
  });
});