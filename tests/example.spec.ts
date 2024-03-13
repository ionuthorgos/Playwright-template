import { test, expect} from '../fixtures/fixtures';

test.describe('Tests with isolated browser contexts', () => {
  test.afterEach(async ({ page }, testInfo) => {
    // If the test fails, take a screenshot.
    if (testInfo.status === 'failed') {
      await page.screenshot({ path: testInfo.outputPath('screenshot.png') });
    }
  });
  
  test('getting started should contain table of contents', async ({ playwrightPage }) => {
    await playwrightPage.goto();
    await playwrightPage.getStarted();
    await expect(playwrightPage.tocList).toHaveText([
      `How to install Playwright`,
      `What's Installed`,
      `How to run the example test`,
      `How to open the HTML test report`,
      `Write tests using web first assertions, page fixtures aaaaand locators`,
      `Run single test, multiple tests, headed mode`,
      `Generate tests with Codegen`,
      `See a trace of your tests`
    ]);
    await playwrightPage.pageClose()
  });

  test('should show Page Object Model article', async ({ playwrightPage, page }) => {
    await playwrightPage.goto();
    await playwrightPage.pageObjectModel();
    await expect(page.locator('article')).toContainText('Page Object Model is a common pattern');
  });
})