const {test, expect} = require ('@playwright/test');

//toBeVisible, toBeHidden, page.on, hover, framelocator, :visible
test("Popup validations", async ({page})=> {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await await expect(page.locator("#displayed-text")).toBeHidden();
    page.on('dialog', dialog => dialog.accept())
    // page.on('dialog', dialog => dialog.dismiss())
    await page.locator("#confirmbtn").click();
    await page.locator("#mousehover").hover();
    const framesPage = page.frameLocator("#courses-iframe");
    await framesPage.locator("li a[href='lifetime-access']:visible").click();
    const textCheck = await framesPage.locator(".text h2").textContent();
    console.log(textCheck.split(" ")[1]);


})