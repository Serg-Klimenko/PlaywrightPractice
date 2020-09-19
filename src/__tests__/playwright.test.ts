import playwright from "playwright";

let browser;
let context;
let page;

beforeAll(async ()=>{
    browser = await playwright.firefox.launch({ headless: false, slowMo: 1000 });
    context = await browser.newContext();
    page = await context.newPage();
})
afterAll(async () => {
    await browser.close();
});

describe("Test playwright on https://the-internet.herokuapp.com/", () => {
  test("1. Open site", async () => {
    await page.goto("https://the-internet.herokuapp.com/");
  });

  test("2. Add/Remove Elements", async () => {
    await page.goto("https://the-internet.herokuapp.com");
    await page.click("[href='/add_remove_elements/']");
    await page.click(".example > button");
    await page.waitForSelector("#elements");
  });

  test("3. Basic Auth ", async () => {
    context = await browser.newContext({
      httpCredentials: { username: "admin", password: "admin" },
    });
    page = await context.newPage();
    await page.goto("https://the-internet.herokuapp.com/basic_auth");
    await page.waitForSelector("#content");
  });

  test("4. Checkboxes", async () => {
    await page.goto("https://the-internet.herokuapp.com/");
    await page.click("[href='/checkboxes']");
    await page.check("#checkboxes :first-child");
    await page.uncheck("#checkboxes :last-child");
  });
  test.only("5. Context Menu", async () => {
    await page.goto("https://the-internet.herokuapp.com/");
    await page.click("[href='/context_menu']");
    await page.click('#hot-spot', {button: 'right'});
})
  test.skip("Test iFrames", async () => {
    await page.goto("https://the-internet.herokuapp.com/");
    const frames = await page.frames();
    const frame1 = frames[0];
    await page.waitForTimeout(10000);
    await browser.close();
  });
});
