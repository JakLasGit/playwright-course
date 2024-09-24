const { test, expect } = require("@playwright/test");

test.only("Login Test", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("emailbruh@example.com");
    await page.locator("#userPassword").fill("Asdasdasd1");
    await page.locator("[value='Login']").click();
    // await page.waitForLoadState("networkidle");
    await page.locator(".card-body b").first().waitFor();
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
}),

test("Registration Test", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator(".login-wrapper-footer-text").click();
    await page.locator("#firstName").fill("Jake");
    await page.locator("#lastName").fill("Peralta");
    await page.locator("#userEmail").fill("jakeperalta@example.com");
    await page.locator("#userMobile").fill("3336669990");
    await page.locator(".custom-select.ng-pristine.ng-valid.ng-touched").click();
    await page.locator(".custom-select.ng-valid.ng-touched.ng-dirty").selectOption("Doctor");
    await page.locator("input[value='Male']").click();
    await page.locator("#userPassword").fill("Rybaryba123");
    await page.locator("#confirmPassword").fill("Rybaryba123");
    await page.locator("input[type='checkbox']").click();
    await page.locator("#login").click();
    await page.locator(".btn.btn-primary").click();
    await page.locator("#userEmail").fill("jakeperalta@example.com");
    await page.locator("#userPassword").fill("Rybaryba123");
    await page.locator("#login").click();
    console.log(await page.locator(".card-body").nth(1).textContent());
  });