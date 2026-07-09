
import {test, chromium} from '@playwright/test'

test('browser', async () => {
    const browser = await chromium.launch()
    const context = await browser.newContext({
        recordVideo: {
            dir: './screenrecord/'
        }
    })
    const page = await context.newPage()
    await page.goto('https://www.amazon.in/')
    await page.waitForTimeout(5000)
    await browser.close()
})    

