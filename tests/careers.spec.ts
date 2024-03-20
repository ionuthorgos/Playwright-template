import { test} from '../fixtures/fixtures';

test.describe('Tests with isolated browser contexts', () => {
  test.afterEach(async ({ page }, testInfo) => {
    // If the test fails, take a screenshot.
    if (testInfo.status === 'failed') {
      await page.screenshot({ path: testInfo.outputPath('screenshot.png') });
    }
  });
  
  test('Searching career opportunities', async ({ mainPage, helpersUi }) => {
    // Navigate to the base URL defined in the config file
    await helpersUi.goto();
    // Interact with the page to accept all cookies, ensuring compliance with privacy regulations
    await helpersUi.selectElement(mainPage.acceptAllCookies)
    // Hover over the careers button to reveal any potential sub-menus.
    await mainPage.hoverOver(mainPage.careersButton)
    // Verify that the sub-menu related to careers is visible after the hover action.
    await mainPage.checkSubMenuVisibility()
    // Assert that the sub-menu title contains the expected text "Work with us".
    await helpersUi.elementContainText(mainPage.subMenuTitleFromCareers,"Work with us")
    // Select the button to search for careers.
    await helpersUi.selectElement(mainPage.searchCareersButton)
  });
})