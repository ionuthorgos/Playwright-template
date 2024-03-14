import { test} from '../fixtures/fixtures';

test.describe('Tests with isolated browser contexts', () => {
  test.afterEach(async ({ page }, testInfo) => {
    // If the test fails, take a screenshot.
    if (testInfo.status === 'failed') {
      await page.screenshot({ path: testInfo.outputPath('screenshot.png') });
    }
  });
  
  test('Search for a career', async ({ mainPage, genericPage }) => {
    await genericPage.goto();
    await genericPage.selectElement(mainPage.acceptAllCookies)
    await mainPage.hoverOver(mainPage.careersButton)
    await mainPage.checkSubMenuVisibility()
    await genericPage.elementContainText(mainPage.subMenuTitleFromCareers,"Work with us")
    await genericPage.selectElement(mainPage.searchCareersButton)
  });

})