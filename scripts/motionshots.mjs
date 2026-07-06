import { chromium } from 'playwright'
const BASE = 'http://localhost:5173'
const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
const page = await ctx.newPage()

// Preloader mid-load
await page.goto(BASE + '/', { waitUntil: 'commit' })
await page.waitForTimeout(600)
await page.screenshot({ path: 'shots/preloader.png' })
console.log('preloader.png')

// World map animated — navigate to Insights, scroll to map, let arcs draw + pulses run
await page.goto(BASE + '/insights', { waitUntil: 'load' })
await page.waitForTimeout(2500)
await page.evaluate(() => {
  const el = [...document.querySelectorAll('svg[role="img"]')].pop()
  el?.scrollIntoView({ block: 'center' })
})
await page.waitForTimeout(3200)
const mapEl = await page.$('svg[role="img"]')
if (mapEl) {
  await mapEl.screenshot({ path: 'shots/worldmap.png' })
  console.log('worldmap.png')
}
await browser.close()
