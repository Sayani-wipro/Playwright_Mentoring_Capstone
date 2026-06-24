import { Page } from '@playwright/test';

export class LoginPage {
        private page: Page;

        private  usernameInput = '#user-name';
        private  passwordInput = '#password';
        private  loginButton = '#login-button';

        constructor(page: Page) {
            this.page = page;
        }

        async navigateTo() {
            await this.page.goto('/');
    }

        async enterUsername(username: string) {
            await this.page.fill(this.usernameInput, username);
    }

        async enterPassword(password: string) {
            await this.page.fill(this.passwordInput, password);
    }

        async clickLogin() {
            await this.page.click(this.loginButton);
    }

        async login(username: string, password: string) {
            await this.navigateTo();
            await this.enterUsername(username);
            await this.enterPassword(password);
            await this.clickLogin();
        }

        async waitForInventoryPage() {
            await this.page.waitForURL(/.*inventory\.html/);
    }

        getErrorMessageLocator() {
            return this.page.locator('[data-test="error"]');
    }

        getInventoryListLocator() {
            return this.page.locator('.inventory_list');
    }

}

