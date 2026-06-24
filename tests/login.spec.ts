import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
require('dotenv').config();

test('login with valid credential', async ({ page }) => {
	const username = process.env.S_USERNAME;
	const password = process.env.PASSWORD;

	const loginPage = new LoginPage(page);
	await loginPage.login(username as string, password as string);
	await loginPage.waitForInventoryPage();

	await expect(page).toHaveURL(/.*inventory\.html/);
	await expect(loginPage.getInventoryListLocator()).toBeVisible();
});

test('login with invalid password', async ({ page }) => {
	const loginPage = new LoginPage(page);
	await loginPage.login('standard_user', 'wrong_password');

	await expect(loginPage.getErrorMessageLocator()).toBeVisible();
	await expect(loginPage.getErrorMessageLocator()).toContainText(
		'Epic sadface: Username and password do not match any user in this service'
	);
});

test('login using locked out user', async ({ page }) => {
	const loginPage = new LoginPage(page);
	await loginPage.login('locked_out_user', 'secret_sauce');

	await expect(loginPage.getErrorMessageLocator()).toBeVisible();
	await expect(loginPage.getErrorMessageLocator()).toContainText(
		'Epic sadface: Sorry, this user has been locked out.'
	);
});

test('login using empty fields', async ({ page }) => {
	const loginPage = new LoginPage(page);
	await loginPage.login('', 'secret_sauce');

	await expect(loginPage.getErrorMessageLocator()).toBeVisible();
	await expect(loginPage.getErrorMessageLocator()).toContainText('Epic sadface: Username is required');
});
