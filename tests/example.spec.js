// // @ts-check
import { test, expect, chromium } from '@playwright/test';

// test('has title', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });



test('Browser',async()=>{
    const browser =await chromium.launch()
    const context =await browser.newContext({
      recordVideo:{
        dir:'./screen/'
      }
    });
    const page =await context.newPage()
    await page.goto('https://www.amazon.in/')
    await page.waitForTimeout(6000)
    
})
