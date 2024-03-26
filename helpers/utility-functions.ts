import { expect, type Locator, type Page } from '@playwright/test';

export class UtilityFunctions {
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
        if (await element.isVisible() && await element.isEnabled()) {
            await element.click();
        } else {
            throw new Error('Element is not visible or not enabled')
        }
    }

    async verifyElement(element: Locator, check: string, ...args: any[]) {
        switch (check) {
            /** Asserts that the specified element is visible.*/
            case 'elementToBeVisible':
                await expect(element).toBeVisible();
                break;

            /** Asserts that the specified element contains the given text.*/
            case 'elementContainsText':
                const [expectedText] = args
                if (typeof expectedText !== 'string') {
                    throw new Error('Expected text must be provided for toContainText check.');
                }
                await expect(element).toContainText(expectedText)
                break;

            /** Asserts that the specified element is hidden.*/
            case 'elementIsHidden':
                await expect(element).toBeHidden();
                break;
            default:
        }
    }

    /**
* Hovers over the given menu element.
* @param element The locator of the menu element to hover over.
*/
    async hoverOver(element: Locator) {
        if (await element.isVisible() && await element.isEnabled()) {
            await element.hover();
        } else {
            throw new Error('Element is not visible or not enabled')
        }
    }
}