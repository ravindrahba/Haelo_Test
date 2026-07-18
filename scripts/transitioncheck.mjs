// Verify the page-to-page transition:
//   1. While the outgoing page is fading, scrollY must NOT jump to 0
//      (the old bug: snap-to-top visible for a few frames before the fade).
//   2. After the new page fades in, we are at the top.
//   3. The freshly mounted page's images are already complete before any
//      scrolling (eager + background warm), so nothing pops in mid-scroll.
import { chromium } from 'playwright'

const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } }) // real motion
const page = await ctx.newPage()

await page.goto('http://localhost:5173/', { waitUntil: 'load' })
await page.waitForSelector('[role="status"][aria-label="HAELO is loading"]', { state: 'detached', timeout: 25000 })
await page.waitForTimeout(500)

// Scroll deep into the page (footer)
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
await page.waitForTimeout(600)
const startY = await page.evaluate(() => window.scrollY)
console.log('scrolled to footer, scrollY =', startY)

// Click the footer "Talent Advisory" link and sample scrollY during the exit fade
await page.click('footer >> text=Talent Advisory')
const samples = []
for (let i = 0; i < 10; i++) {
  samples.push(await page.evaluate(() => ({ y: window.scrollY, hasMain: !!document.querySelector('main') })))
  await page.waitForTimeout(60)
}
const jumpedDuringExit = samples.slice(0, 6).some((s) => s.y === 0) // first ~360ms = exit fade window
console.log('scrollY samples over first 600ms:', samples.map((s) => s.y).join(', '))
console.log('visible snap-to-top during exit fade:', jumpedDuringExit ? 'YES — BUG' : 'no ✓')

await page.waitForTimeout(1200)
const endY = await page.evaluate(() => window.scrollY)
console.log('after transition, scrollY =', endY, endY === 0 ? '✓ (at top of new page)' : '— NOT at top')

// Image readiness on the new page BEFORE any scrolling
const imgs = await page.evaluate(() =>
  [...document.querySelectorAll('main img')].map((i) => ({ src: i.src.split('/').pop(), complete: i.complete && i.naturalWidth > 0 })),
)
const notReady = imgs.filter((i) => !i.complete)
console.log(`talent-advisory images ready before scroll: ${imgs.length - notReady.length}/${imgs.length}`, notReady.length ? JSON.stringify(notReady) : '✓')

await browser.close()
