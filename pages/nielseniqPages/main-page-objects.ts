import { expect, type Locator, type Page } from '@playwright/test';

export class MainPage {
  readonly page: Page;
  readonly careersButton: Locator
  readonly acceptAllCookies: Locator
  readonly searchCareersButton: Locator
  readonly subMenuTitleFromCareers: Locator
  readonly subMenuIsActive: Locator

  constructor(page: Page) {
    this.page = page;
    this.careersButton = page.locator('#header-navbar').getByRole('link', { name: 'Careers' })
    this.acceptAllCookies = page.locator('button[id=onetrust-accept-btn-handler]')
    this.searchCareersButton = page.locator('role=link[name="Search Careers"]')
    this.subMenuTitleFromCareers = page.locator('role=link[name="Work with us"]')
    this.subMenuIsActive = page.locator('ul li[class*="sub-active"]')
  }


}