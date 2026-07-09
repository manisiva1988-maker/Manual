// @ts-check
import { test, expect, chromium } from '@playwright/test';

test('Browser', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    recordVideo: { dir: './screen/' }
  });
  const page = await context.newPage();
  await page.goto('https://www.amazon.in/');
  await page.waitForTimeout(4000);
  await page.waitForTimeout(7000);
});

test('Read JSON Response', async ({ request }) => {
  const response = await request.get('https://reqres.in/api/users/2');
  const body = await response.json();
  console.log(body);
});
>>>>>>> 9cb503e (Prepare local changes for push)
