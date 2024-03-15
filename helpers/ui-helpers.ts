import { expect, type Locator, type Page } from '@playwright/test';

export class HelpersUi {
    readonly page: Page;

    /**
    * Constructs a generic page object.
    * @param page The Playwright Page object.
    */
    constructor(page: Page,) {
        this.page = page;
    }

    /**
     * Navigates to the root URL of the configured site.
     */
    async goto() {
        await this.page.goto('/');
    }

    /**
     * Clicks on the specified element.
     * @param element The locator of the element to click on.
     */
    async selectElement(element: Locator) {
        await element.click();
    }

    /**
     * Asserts that the specified element contains the given text.
     * @param element The locator of the element.
     * @param text The expected text content to validate.
     */
    async elementContainText(element: Locator, text: string) {
        await expect(element).toContainText(text)
    }

} 