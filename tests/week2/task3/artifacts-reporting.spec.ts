import { test, expect } from '../../../fixtures/test-fixtures';
import { selectors } from '../../../utils/selectors';

test.describe('Week 2 - Task 3 Artifacts and Reporting @week2 @task3 @artifacts @ci', () => {
  test('executes flow for trace and video artifact generation', async ({ page, openLabApp, withApiMocks }) => {
    await withApiMocks();
    await openLabApp();

    await page.locator(selectors.loadOrdersButton).click();
    await page.locator(selectors.loadProfileButton).click();

    await expect(page.locator(selectors.orderRow)).toHaveCount(2);
    await expect(page.locator(selectors.profileName)).toContainText('Avery Quinn');
  });
});
