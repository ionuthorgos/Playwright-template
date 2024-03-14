import { expect, type Locator, type Page } from '@playwright/test';

export class MainPage {
  readonly page: Page;
  readonly careersButton: Locator
  readonly acceptAllCookies: Locator
  readonly searchCareersButton: Locator
  readonly subMenuTitleFromCareers: Locator

  constructor(page: Page) {
    this.page = page;
    this.careersButton = page.locator('#header-navbar').getByRole('link', { name: 'Careers' })
    this.acceptAllCookies = page.locator('button[id=onetrust-accept-btn-handler]')
    this.searchCareersButton = page.locator('role=link[name="Search Careers"]')
    this.subMenuTitleFromCareers = page.locator('role=link[name="Work with us"]')
  }

  /**
 * Hovers over the given menu element.
 * @param element The locator of the menu element to hover over.
 */
  async hoverOver(element: Locator) {
    await element.hover();
  }

  /**
 * Checks if the sub-menu is visible after hovering over a menu item.
 * Assumes the sub-menu has 'sub-active' class when active.
 */
  async checkSubMenuVisibility() {
    await expect(this.page.locator('ul li[class*="sub-active"]')).toBeVisible();
  }
} 