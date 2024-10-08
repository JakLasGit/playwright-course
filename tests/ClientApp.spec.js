const { test, expect } = require("@playwright/test");

const name = "Jake"
const lastName = "Peralta"
const email = "jakeperalta@example.com"
const password = "Rybaryba123"
const mobile = "3336669990"
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

test.only("Adding to card and buying", async ({ page }) => {
await page.goto("https://rahulshettyacademy.com/client");
await page.locator("#userEmail").fill(email);
await page.locator("#userPassword").fill(password);
await page.locator("[value='Login']").click();
const addToCartButtons = page.locator("button.w-10");
await addToCartButtons.first().click();
await page.locator("[routerlink='/dashboard/cart']").click();
const itemName = page.locator("div[class='cartSection'] h3")
await expect(itemName).toHaveText("ZARA COAT 3");
await page.locator("li[class='totalRow'] button[type='button']").click();
const shippingEmail = page.locator("[style='color: lightgray; font-weight: 600;']");
await expect(shippingEmail).toHaveText(email);
await page.locator("[placeholder='Select Country']").fill("Pola");
await page.locator("[placeholder='Select Country']").press('n');
await page.locator("span[class='ng-star-inserted']").click();
await page.locator("div.field input.txt").nth(1).fill(cvvCode);
await page.locator("div.field input.txt").nth(2).fill(name);
await page.locator("div.field input.txt").nth(3).fill("rahulshettyacademy");
await page.locator("[type='submit']").click();
const couponText = page.locator("[style='color: green;']");
await couponText.waitFor();
await expect(couponText).toHaveText("* Coupon Applied");
const confirmation = page.locator("h1.hero-primary");
await page.locator(".action__submit").click();
await expect(confirmation).toHaveText("Thankyou for the order.")
let orderID = await page.locator("label.ng-star-inserted").textContent();
orderID = orderID.replace(/\|/g, '').trim();
await page.locator("label[routerlink='/dashboard/myorders']").click();
await page.waitForSelector("tbody tr.ng-star-inserted");
const allIDs = await page.locator("tbody tr.ng-star-inserted th[scope='row']").allTextContents();
await expect(allIDs).toContain(orderID);
});