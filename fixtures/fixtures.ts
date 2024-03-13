import {test as base} from '@playwright/test';
import { PlaywrightPage } from '../pages/playwright-dev-page';
import { SettingsPage } from '../pages/settings-page';

// Declare the types of your fixtures.

type MyFixtures = {
    playwrightPage: PlaywrightPage;
    settingsPage: SettingsPage;
}

// Extend base test by providing "playwrightPage" and "settingsPage"
// This new "test" can be used in multiple test files and each of them will get the fixtures

export const test = base.extend<MyFixtures>({
    playwrightPage: async({page}, use) =>{
        // Set up the fixture.
        const playwrightPage = new PlaywrightPage(page);
        // Use the fixture value in the test
        await use(playwrightPage)
    },

    settingsPage: async ({ page }, use) => {
        await use(new SettingsPage(page));
      }
})

export { expect } from '@playwright/test';