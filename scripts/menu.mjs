import { chromium } from 'playwright'
const BASE = 'http://localhost:5173'
const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
const page = await ctx.newPage()
await page.goto(BASE + '/', { waitUntil: 'load' })
await page.waitForTimeout(800)
await page.click('[aria-controls="haelo-menu"]')
await page.waitForTimeout(1400)
await page.screenshot({ path: 'shots/menu-open.png' })
console.log('menu-open.png')
await browser.close()
