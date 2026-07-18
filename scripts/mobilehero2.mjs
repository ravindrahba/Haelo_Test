// Mobile hero framing check: both slides at 390x844, faces should be in frame.
import { chromium } from 'playwright'

const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, reducedMotion: 'reduce', isMobile: true, hasTouch: true })
const page = await ctx.newPage()
await page.goto('http://localhost:5173/?static=1', { waitUntil: 'load', timeout: 30000 })
await page.waitForSelector('[role="status"][aria-label="HAELO is loading"]', { state: 'detached', timeout: 20000 }).catch(() => {})
await page.waitForTimeout(900)

const pos = await page.evaluate(() => {
  const imgs = [...document.querySelectorAll('.swiper-slide img')]
  return imgs.map((i) => getComputedStyle(i).objectPosition)
})
console.log('object-positions:', JSON.stringify(pos))

await page.screenshot({ path: 'shots/mobile-slide1.png' })
const dots = await page.$$('[role="tablist"] [role="tab"]')
if (dots[1]) {
  await dots[1].click()
  await page.waitForTimeout(1800)
  await page.screenshot({ path: 'shots/mobile-slide2.png' })
}
console.log('slides:', dots.length)
await browser.close()
