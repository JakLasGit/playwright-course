const { test, expect } = require("@playwright/test");

test("Browser Context Playwright test", async ({ browser }) => {
  //chrome - plugins/cookies
  const context = await browser.newContext();
  const page = await context.newPage();
  const userName = page.locator("#username")
  const signIn = page.locator("#signInBtn")
  const cardTitles = page.locator(".card-body a")
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());
  //css, xpath
  await userName.fill("rahulshetty");
  await page.locator("#password").fill("learning");
  await signIn.click();
  await page.locator("[style*='block']").textContent();
  await expect(page.locator("[style*='none']")).toContainText('Incorrect');
  await userName.fill("");
  await userName.fill("rahulshettyacademy");
  await signIn.click();
  await cardTitles.first().textContent()
  await cardTitles.nth(1).textContent()
  await cardTitles.allTextContents()
  const allTitles = await cardTitles.allTextContents()
});

test("Page Playwright test", async ({ page }) => {
  await page.goto("https://google.com");
  //get title - assertion
  console.log(await page.title());
  await expect(page).toHaveTitle("Google");
});

test('UI Controls', async ({ page }) =>
{
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const userName = page.locator("#username");
  const signIn = page.locator("#signInBtn");
  const dropDown = page.locator("select.form-control");
  const documentLink = page.locator("[href*='documents-request']")
  dropDown.selectOption("consult");
  await page.locator(".radiotextsty").nth(1).click();
  await page.locator("#okayBtn").click();
  //assertion
  await expect(page.locator(".radiotextsty").nth(1)).toBeChecked()
  console.log(await page.locator(".radiotextsty").nth(1).isChecked());
  //await page.pause();
  await page.locator("#terms").click();
  await expect(page.locator("#terms")).toBeChecked()
  await page.locator("#terms").uncheck();
  expect(await page.locator("#terms").isChecked()).toBeFalsy();
  await expect(documentLink).toHaveAttribute('class', 'blinkingText');

});

test.only ('Child windows handling', async ({ browser }) =>
{
  const context = await browser.newContext();
  const page = await context.newPage();
  const userName = page.locator("#username");
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const documentLink = page.locator("[href*='documents-request']")
  
  const [newPage] = await Promise.all(
[
  context.waitForEvent('page'), // czeka na strone
  documentLink.click() // klika i otwiera nową stronę
])
  // wyciąga kontent po lokatorze, potem dzieli tekst żeby wyciagnąć to co chcemy
  const text = await newPage.locator(".red").textContent();
  const arrayText = text.split("@");
  const domain = arrayText[1].split(" ") [0]
  console.log(domain);
  await userName.fill(domain);
  await page.pause();
  
});