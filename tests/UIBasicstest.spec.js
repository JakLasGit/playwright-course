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
