import { expect, type Locator, type Page } from '@playwright/test';

export class CareersPage {
  readonly page: Page;
  readonly title: Locator;
  readonly searchButton: Locator;
  readonly countriesDropDown: Locator;
  readonly jobTeamsDropDown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('h1[class*="has-text-align-center"]');
    this.searchButton = page.getByRole('textbox', { name: 'Search' })
    this.countriesDropDown = page.getByRole('combobox', { name: 'Countries' })
    this.jobTeamsDropDown = page.getByRole('combobox', { name: 'Job teams' })
  }

  async selectRandomOptionFromDropdown() {
    // Trigger the dropdown to reveal the options
    await this.countriesDropDown.click();
    // Count the number of options available in the dropdown.
    const numberOfOptions = await this.page.locator('[id="bs-select-1"] a').count()
    // Select a random index within the range of available options.
    const randomIndex = Math.floor(Math.random() * (numberOfOptions - 1))
    // Click the option at the random index to select it.
    await this.page.locator(`[id="bs-select-1-${randomIndex}"]`).click()
  }
} 