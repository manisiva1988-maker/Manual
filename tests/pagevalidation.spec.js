import { test, expect } from '@playwright/test';

    test('playwright page methods', async ({ page }) => {
    await page.goto('https://www.amazon.in/')
    await page.waitForTimeout(5000)
    
    const pagetitle = await page.title()
    const url = page.url()
    console.log('Page URL:', url)
    console.log(`The url is: ${url}`);
    await page.goto('https://www.flipkart.com/');

    await page.goBack();
    await page.goForward();
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.screenshot({ path: 'file.png' });    
    await expect(page).toHaveURL(/flipkart/);
});