import { test as base } from '@playwright/test';
import { PlaywrightPage } from '../pages/playwrightExample/playwright-dev-page';
import { SettingsPage } from '../pages/playwrightExample/settings-page';
import { MainPage } from '../pages/nielseniqPages/main-page';
import { UtilityFunctions } from '../helpers/utility-functions';

// Define custom fixture types for the test context.
type MyFixtures = {
    playwrightPage: PlaywrightPage;
    settingsPage: SettingsPage;
    mainPage: MainPage;
    utilityFunctions: UtilityFunctions;
}

// Extend base test by providing "playwrightPage" and "settingsPage"
// This new "test" can be used in multiple test files and each of them will get the fixtures
export const test = base.extend<MyFixtures>({
    playwrightPage: async ({ page }, use) => {
        // Instantiate PlaywrightPage with the current page context and pass it to the test.
        const playwrightPage = new PlaywrightPage(page);
        await use(playwrightPage)
    },

    settingsPage: async ({ page }, use) => {
        // Instantiate SettingsPage with the current page context and pass it to the test.
        await use(new SettingsPage(page));
    },

    mainPage: async ({ page }, use) => {
        // Instantiate MainPage with the current page context and pass it to the test.
        await use(new MainPage(page));
    },

    utilityFunctions: async ({ page }, use) => {
        // Instantiate GenericPage with the current page context and pass it to the test.
        await use(new UtilityFunctions(page));
    },
})

export { expect } from '@playwright/test';