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

//End2End test w inny sposób
test.only("Test with dinamic iteration", async ({ page }) => 
{
  const productName = 'ZARA COAT 3'
  const products = page.locator(".card-body");
  await page.goto("https://rahulshettyacademy.com/client");
  await page.getByPlaceholder("email@example.com").fill(email);
  await page.getByPlaceholder("enter your passsword").fill(password);
  await page.getByRole("button", {name:"Login"}).click();
  await page.waitForLoadState("networkidle");
  await page.locator(".card-body b").first().waitFor();
//Inny sposób na zrobienie tego bez loopa, a przy użyciu filtrów
  await page.locator(".card-body").filter({hasText:"ZARA COAT 3"}).getByRole("button", {name:"Add To Cart"}).click();
  await page.getByRole("listitem").getByRole("button", {name:"Cart"}).click();
  await page.locator("div li").first().waitFor();
  await expect(page.getByText("ZARA COAT 3")).toBeVisible();
  await page.getByRole("button", {name:"Checkout"}).click();
  await page.getByPlaceholder("Select Country").pressSequentially("Pol");
  await page.getByRole("button", {name:"Poland"}).click();
  await page.getByText("PLACE ORDER").click();
  await expect(page.getByText("Thankyou for the order.")).toBeVisible();
  let orderID = await page.locator("label.ng-star-inserted").textContent();
  orderID = orderID.replace(/\|/g, '').trim();
  await page.locator("label[routerlink*='myorders']").click();
  await page.locator("tbody").waitFor();
  await page.locator("tbody tr").filter({hasText:orderID}).getByRole("button", {name:"View"}).click();
  await expect(page.getByText(" ZARA COAT 3 ")).toBeVisible();
})