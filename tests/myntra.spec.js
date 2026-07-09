
// import { test} from '@playwright/test';

// test('Get product count', async ({ page }) => {
//     await page.goto('https://www.myntra.com/boy-tshirts/');

//     const ProductcountList = await page.locator('//*[@class="product-base"]').count();

//     console.log('Total products found:', ProductcountList);
// });


// import { test } from '@playwright/test';

// test('Find minimum price in Myntra Boys T-Shirts', async ({ page }) => {

//     await page.goto('https://www.myntra.com/tshirts-boys');

//     await page.waitForSelector('.product-discountedPrice');

//     const prices = await page
//         .locator('.product-discountedPrice')
//         .allTextContents();

//     console.log('Prices:', prices);

//     const numericPrices = prices.map(price =>
//         parseInt(price.replace('Rs. ', '').replace(',', ''))
//     );

//     const minPrice = Math.max(...numericPrices);

//     console.log('Minimum Price:', minPrice);
// });


// import { test } from '@playwright/test';

// test.setTimeout(120000);

// test('Find product name with minimum price on Myntra kids t-shirts', async ({ page }) => {
//     const url = 'https://www.myntra.com/tshirts-boys';
//     await page.goto(url, { waitUntil: 'domcontentloaded' });
//     await page.waitForSelector('.product-base', { timeout: 30000 });

//     const products = page.locator('.product-base');
//     const count = await products.count();

//     let minPrice = Infinity;
//     let minProductName = '';

//     for (let i = 0; i < count; i++) {
//         const product = products.nth(i);

//         const priceText =
//             (await product.locator('.product-discountedPrice').first().innerText().catch(() => '')) ||
//             (await product.locator('.product-price').first().innerText().catch(() => '')) ||
//             (await product.locator('.product-strike').first().innerText().catch(() => ''));

//         if (!priceText) continue;

//         const price = parseInt(priceText.replace(/[^0-9]/g, ''), 10);
//         if (Number.isNaN(price)) continue;

//         if (price < minPrice) {
//             minPrice = price;
//             const name = await product.locator('.product-product').first().innerText().catch(() => '');
//             const brand = await product.locator('.product-brand').first().innerText().catch(() => '');
//             minProductName = (brand ? brand + ' ' : '') + name;
//         }
//     }

//     console.log('Minimum Price:', minPrice);
//     console.log('Product with minimum price:', minProductName);
// });

// import { test } from '@playwright/test';

// test('Find minimum price product in Myntra Kids T-Shirts', async ({ page }) => {

//     // Open Myntra Kids T-Shirts page
//     await page.goto('https://www.myntra.com/tshirts-boys');

//     // Wait for products to load
//     await page.waitForSelector('.product-base');

//     // Get all products
//     const products = page.locator('.product-base');

//     const count = await products.count();

//     let minPrice = Number.MAX_VALUE;
//     let minProduct = '';

//     // Loop through all products
//     for (let i = 0; i < count; i++) {

//         const product = products.nth(i);

//         // Get product name
//         const brand = await product.locator('.product-brand').textContent();
//         const name = await product.locator('.product-product').textContent();

//         // Get product price
//         const priceText = await product
//             .locator('.product-discountedPrice')
//             .textContent();

//         // Convert "Rs. 299" to 299
//         const price = parseInt(
//             priceText.replace(/[^0-9]/g, '')
//         );

//         // Check minimum price
//         if (price < minPrice) {
//             minPrice = price;
//             minProduct = `${brand} ${name}`;
//         }
//     }

//     console.log('Minimum Price = ', minPrice);
//     console.log('Product Name = ', minProduct);
// });



// for (let i = 0; i < count; i++) {

//     const product = products.nth(i);

//     try {

//         const brand = await product.locator('.product-brand').textContent();
//         const name = await product.locator('.product-product').textContent();

//         let priceText = '';

//         if (await product.locator('.product-discountedPrice').count() > 0) {
//             priceText = await product.locator('.product-discountedPrice').textContent();
//         } else {
//             priceText = await product.locator('.product-price').textContent();
//         }

//         const price = parseInt(
//             priceText.replace(/[^0-9]/g, '')
//         );

//         if (price < minPrice) {
//             minPrice = price;
//             minProduct = `${brand} ${name}`;
//         }

//     } catch (error) {
//         console.log(`Skipping Product ${i}`);
//     }
// }

// import { test } from '@playwright/test';

// test('get minimum price product', async ({ page }) => {
//   await page.goto('https://www.myntra.com/boy-tshirts?sort=recommended');

//   // Get all product names
//   const productNames = await page
//     .locator('.product-product')
//     .allTextContents();

//   // Get all discounted prices
//   const pricesText = await page
//     .locator('.product-discountedPrice')
//     .allTextContents();

//   const prices = pricesText.map(price =>
//     Number(price.replace(/[^0-9]/g, ''))
//   );

//   // Find minimum price and its index
//   const minPrice = Math.min(...prices);
//   const minPriceIndex = prices.indexOf(minPrice);

//   // Get corresponding product name
//   const minPriceProduct = productNames[minPriceIndex];

//   console.log('Minimum Price:', minPrice);
//   console.log('Product Name:', minPriceProduct);
// });

// const tabs = page.locator("//div[@role='navigation']//a");

// const count = await tabs.count();

// for (let i = 0; i < count; i++) {
//     console.log(await tabs.nth(i).textContent());
// }

// import { test } from '@playwright/test';

// test('log Myntra navigation tabs', async ({ page }) => {
//   await page.goto('https://www.myntra.com/tshirts-boys', { waitUntil: 'domcontentloaded' });
//   await page.waitForSelector("//div[@role='navigation']//a");

//   const tabs = page.locator("//div[@role='navigation']//a");
//   const count = await tabs.count();

//   for (let i = 0; i < count; i++) {
//     const text = await tabs.nth(i).textContent();
//     console.log(text?.trim());
//   }
// });

import { test, expect } from '@playwright/test';

test('Click Images tab in Google Search', async ({ page }) => {

    await page.goto('https://www.google.com');

    // Search for Playwright
    await page.locator('textarea[name="q"]').fill('Playwright');

    // Press Enter
    await page.keyboard.press('Enter');

    // Wait for search results
    await page.waitForLoadState('domcontentloaded');

    // Click Images tab
    await page.locator("//a[.//span[normalize-space()='Images']]").click();

    // Verify URL contains tbm=isch
    await expect(page).toHaveURL(/tbm=isch/);
});

