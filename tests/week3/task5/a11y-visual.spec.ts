import { test, expect } from '../../../fixtures/test-fixtures';
import AxeBuilder from '@axe-core/playwright';
import { selectors } from '../../../utils/selectors';

test.describe('Week 3 - Task 5 Accessibility and Visual Regression @week3 @task5 @a11y @visual @ci', () => {
  test('passes serious/critical a11y and stores baseline screenshot', async ({ page, openLabApp, withApiMocks }) => {
    await withApiMocks();
    await openLabApp();

    await page.locator(selectors.usernameInput).fill('critical-user');
    await page.locator(selectors.loginButton).click();
    await page.locator(selectors.loadOrdersButton).click();

    const a11y = await new AxeBuilder({ page }).analyze();
    const highImpact = a11y.violations.filter(
      (v) => v.impact === 'serious' || v.impact === 'critical'
    );

    await test.info().attach('a11y-report.json', {
      body: JSON.stringify(a11y, null, 2),
      contentType: 'application/json'
    });

    expect(highImpact).toEqual([]);

    await expect(page).toHaveScreenshot('week3-critical-flow.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });
});
