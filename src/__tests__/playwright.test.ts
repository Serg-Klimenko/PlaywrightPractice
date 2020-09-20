import playwright from "playwright";

let browser;
let context;
let page;

beforeAll(async () => {
  browser = await playwright.firefox.launch({ headless: false, slowMo: 1000 });
  context = await browser.newContext();
  page = await context.newPage();
});
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
  test("5. Context Menu", async () => {
    await page.goto("https://the-internet.herokuapp.com/");
    await page.click("[href='/context_menu']");
    await page.click("#hot-spot", { button: "right" });
  });
  test("6. Digest Authentication", async () => {
    context = await browser.newContext({
        httpCredentials: { username: "admin", password: "admin" },
      });
      page = await context.newPage();
      await page.goto("https://the-internet.herokuapp.com/digest_auth");
      await page.waitForSelector("#content");
  });
  test("7. Dropdown List", async () => {
    await page.goto("https://the-internet.herokuapp.com/");
    await page.click("[href='/dropdown']");
    await page.selectOption('select#dropdown', '1');
    await page.selectOption('select#dropdown', '2');
  })
  test("8. Enable Input Field", async () => {
    await page.goto("https://the-internet.herokuapp.com/");
    await page.click("[href='/dynamic_controls']");
    await page.click("form#input-example>button");
    await page.waitForTimeout(3000);
    const result = await page.$eval("form#input-example>input", el => el.disabled);
    // Input field is enabled
    expect(result).toBeFalsy();
  })
  test.only("9. Login Page", async () => {
    await page.goto("https://the-internet.herokuapp.com/");
    await page.click("[href='/login']");
    await page.fill('#username', 'tomsmith');
    await page.fill('#password', 'SuperSecretPassword!');
    await page.click("button.radius");
    await page.waitForSelector("#flash-messages");
  })
  test.skip("Test iFrames", async () => {
    await page.goto("https://the-internet.herokuapp.com/");
    const frames = await page.frames();
    const frame1 = frames[0];
    await page.waitForTimeout(10000);
    await browser.close();
  });
});
