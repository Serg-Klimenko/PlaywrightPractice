import playwright from 'playwright';
 
describe ('Typescript', () => {
  test('pow function', async () => {
    for (const browserType of ['firefox', 'webkit',/* 'chromium'*/]) {
      const browser = await playwright[browserType].launch();
      const context = await browser.newContext();
      const page = await context.newPage();
      await page.goto('http://whatsmyuseragent.org/');
      await page.screenshot({ path: `example-${browserType}.png` });
      await browser.close();
    }  
  });
})
