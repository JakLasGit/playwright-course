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

//Mój test
test("Adding to card and buying", async ({ page }) => {
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

//Test zrobiony na kursie
test.only("Test with dinamic iteration", async ({ page }) => 
{
  const productName = 'ZARA COAT 3'
  const products = page.locator(".card-body");
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill(email);
  await page.locator("#userPassword").fill(password);
  await page.locator("[value='Login']").click();
  await page.waitForLoadState("networkidle");
//For loop na dole bierze wszystkie produkty wytawione na stronie, leci i sprawdza po każdym czy któryś z nich ma productName - Zara Coat 3 ktorego szukamy
  const count = await products.count();
  for(let i = 0; i < count; i++) 
  {
   if(await products.nth(i).locator("b").textContent() === productName) 
  {
    //add to card
    await products.nth(i).locator("text= Add To Cart").click();
    break;
   }
  }
  await page.locator("[routerlink*='cart']").click();
  await expect(page.locator("h3:has-text('ZARA COAT 3')")).toBeVisible();
  await page.locator("text=Checkout").click();
  await page.locator("div.field input.txt").nth(1).fill(cvvCode);
  await page.locator("div.field input.txt").nth(2).fill(name);
  await page.locator("div.field input.txt").nth(3).fill("rahulshettyacademy");
  await page.locator("[type='submit']").click();
  const couponText = page.locator("[style='color: green;']");
  await couponText.waitFor();
  await expect(couponText).toHaveText("* Coupon Applied");
  await page.locator("[placeholder='Select Country']").pressSequentially("Pol");
  const dropdown = page.locator(".ta-results");
  await dropdown.waitFor();
  const optionsCount = await dropdown.locator("button").count();
  for(let i = 0; i < optionsCount; i++) {
    const text = await dropdown.locator("button").nth(i).textContent();
    if(text.trim() === "Poland") {
      dropdown.locator("button").nth(i).click();
      break;
    }
  }
  await expect(page.locator("[style*='gray']")).toHaveText(email);
  await page.locator(".action__submit").click();
  await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
  let orderID = await page.locator("td.em-spacer-1 .ng-star-inserted").textContent();
  orderID = orderID.replace(/\|/g, '').trim();
  await page.locator("label[routerlink='/dashboard/myorders']").click();
  await page.locator("tbody").waitFor();
  const rows = page.locator("tbody tr");
  for(let i = 0; i < await rows.count(); i++) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    if(rowOrderId.includes(orderID)) {
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }
  const orderIdDetails = page.locator(".title");
  await expect(orderIdDetails).toHaveText(" ZARA COAT 3 ");
})