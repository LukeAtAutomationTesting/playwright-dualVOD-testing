import { test, expect } from '@playwright/test';
import { LoginPage } from '../Support/Pages/LoginPage';
import { LoginCredentials, LoginErrorMessages } from '../Support/enums';
import { LoginPageAssertions } from '../Support/Pages/assertions/LoginPage.assertions';

test.describe('Login tests - Username field', () => {

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goToBaseUrl();
    });

    test.afterEach(async ({ page }) => {
        await page.reload();
    });

    test('Check that the username is present in field', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.typeUsername(LoginCredentials.StandardUser);
    });

    test('Test that username field should not accept no existing username', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const loginPageAssertions = new LoginPageAssertions(page);
        await loginPage.loginUser(
            LoginCredentials.NotExistingUser,
            LoginCredentials.CommonPassword
        );
        await loginPageAssertions.checkInvalidLoginMessage(LoginErrorMessages.InvalidUsernameOrPassword);
    });

    test('Test that username field should not be empty', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const loginPageAssertions = new LoginPageAssertions(page);
        await loginPage.typePassword(LoginCredentials.CommonPassword);
        await loginPage.clickLoginButton();
        await loginPageAssertions.checkInvalidLoginMessage(LoginErrorMessages.UsernameRequired);
    });
});

test.describe('Login tests - Password field', () => {

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goToBaseUrl();
    });

    test.afterEach(async ({ page }) => {
        await page.reload();
    });

    test('Check that the password is present in field', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.typePassword(LoginCredentials.CommonPassword);
    });

    test('Test that incorrect password should not allow to login user', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const loginPageAssertions = new LoginPageAssertions(page);
        await loginPage.loginUser(
            LoginCredentials.StandardUser,
            LoginCredentials.IncorrectPassword
        );
        await loginPageAssertions.checkInvalidLoginMessage(LoginErrorMessages.InvalidUsernameOrPassword);
    });

    test('Test that password field should not be empty', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const loginPageAssertions = new LoginPageAssertions(page);
        await loginPage.typeUsername(LoginCredentials.StandardUser);
        await loginPage.clickLoginButton();
        await loginPageAssertions.checkInvalidLoginMessage(LoginErrorMessages.PasswordRequired);
    });
});