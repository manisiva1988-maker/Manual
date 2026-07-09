import {test} from '@playwright/test'

test('screen shot', async ({page})=>{
    await page.goto('https://www.amazon.in/')
    await page.screenshot({path:'./screenshot/amazon_page.png'})
})
