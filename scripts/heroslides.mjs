import { chromium } from 'playwright'
const BASE = 'http://localhost:5173'
const browser = await chromium.launch()
// reducedMotion so autoplay/preloader settle fast and frames are stable
const ctx = await browser.newContext({ viewport: { width: 1440, height: 810 }, reducedMotion: 'reduce' })
const page = await ctx.newPage()
await page.goto(BASE + '/?static=1', { waitUntil: 'load' })
await page.waitForTimeout(1200)

const dots = await page.$$('[role="tab"]')
for (let i = 0; i < dots.length; i++) {
  await dots[i].click()
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForTimeout(900)
  await page.screenshot({ path: `shots/hero-slide-${i + 1}.png`, clip: { x: 0, y: 0, width: 1440, height: 810 } })
  console.log(`hero-slide-${i + 1}.png`)
}
await browser.close()
