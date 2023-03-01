// playwright-dev-page.ts
import { expect, Page } from '@playwright/test';
import { LoginPage } from '../LoginPage';

export class LoginPageAssertions extends LoginPage {
    readonly page: Page;
    
    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    async checkInvalidLoginMessage(message: string) {
        expect(this.errorMessageContainer).toHaveClass(/error/);
        expect(this.errorMessageContainer).toContainText(message);
    }

}