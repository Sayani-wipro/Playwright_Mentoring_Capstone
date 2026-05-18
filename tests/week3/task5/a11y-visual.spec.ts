import { test, expect } from '../../../fixtures/test-fixtures';
import AxeBuilder from '@axe-core/playwright';
import { ORANGEHRM_LOGIN_URL } from '../../../utils/selectors';

test.describe('Week 3 - Task 5 Accessibility and Visual Regression @week3 @task5 @a11y @visual @ci', () => {
  test('OrangeHRM login page passes a11y rules and stores visual baseline', async ({ page }) => {
    await page.goto(ORANGEHRM_LOGIN_URL);
    await page.waitForLoadState('networkidle');

    const a11y = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      // Disable rules that are known third-party site defects we cannot fix:
      //   color-contrast  – branding colour choices
      //   html-has-lang   – OrangeHRM demo site missing lang attribute on <html>
      //   link-name       – OrangeHRM has empty anchor elements (site defect)
      .disableRules(['color-contrast', 'html-has-lang', 'link-name'])
      .analyze();

    const highImpact = a11y.violations.filter(
      (v) => v.impact === 'serious' || v.impact === 'critical'
    );

    await test.info().attach('a11y-report.json', {
      body: JSON.stringify(a11y, null, 2),
      contentType: 'application/json'
    });

    expect(
      highImpact,
      `Serious/critical a11y violations found:\n${highImpact.map((v) => `  [${v.impact}] ${v.id}: ${v.help}`).join('\n')}`
    ).toEqual([]);

    await expect(page).toHaveScreenshot('week3-orangehrm-login.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });
});
