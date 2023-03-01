// playwright-dev-page.ts
import { expect, Locator, Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goToBaseUrl() {
    await this.page.goto('https://www.saucedemo.com/');
  }
}