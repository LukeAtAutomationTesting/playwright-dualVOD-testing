// playwright-dev-page.ts
import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
    readonly page: Page;
    readonly userNameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessageContainer: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.userNameInput = page.getByPlaceholder('Username');
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginButton = page.locator('#login-button');
        this.errorMessageContainer = page.locator('.error-message-container');
    }

    async typeUsername(username: string) {
        await this.userNameInput.fill(username);
        expect(this.userNameInput, 'should contain correct username').toHaveValue(username);
    }

    async typePassword(password: string) {
        expect(this.passwordInput).toHaveAttribute('type', 'password');
        await this.passwordInput.fill(password);
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    async loginUser(username: string, password: string) {
        await this.typeUsername(username);
        await this.typePassword(password);
        await this.clickLoginButton();
    }

    
}