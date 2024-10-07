const { test, expect } = require("@playwright/test");

const name = "Jake"
const lastName = "Peralta"
const email = "jakeperalta@example.com"
const password = "Rybaryba123"
const mobile = "3336669990"
const creditCardNumber = "1234 4321 1234 4321"
const cvvCode = "666"

test("Registration Test", async ({ page }) => {
    const occupationDropdown = page.locator("[formcontrolname='occupation']")
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator(".login-wrapper-footer-text").click();
    await page.locator("#firstName").fill(name);
    await page.locator("#lastName").fill(lastName);
    await page.locator("#userEmail").fill(email);
    await page.locator("#userMobile").fill(mobile);
    await occupationDropdown.selectOption("Student");
    await page.locator("input[value='Male']").click();
    await page.locator("#userPassword").fill(password);
    await page.locator("#confirmPassword").fill(password);
    await page.locator("input[type='checkbox']").click();
    await page.locator("#login").click();
    await page.locator(".btn.btn-primary").click();
  });

test("Login Test", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill(password);
    await page.locator("[value='Login']").click();
    // await page.waitForLoadState("networkidle");
    const cardTitles = page.locator(".card-body b")
    await cardTitles.first().waitFor();
    await cardTitles.first().textContent();
    const firstCard = page.locator(".card-body b").first()
    await expect(firstCard).toHaveText("ZARA COAT 3")
});

