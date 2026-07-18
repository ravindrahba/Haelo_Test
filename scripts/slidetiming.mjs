// Measure slide 1's REAL on-screen time: from the preloader fully dissolving
// to the carousel advancing. Should be ~6s (the autoplay delay). Before the
// fix it was ~6s minus the preloader time (~1.5-3s visible).
import { chromium } from 'playwright'

const args = process.argv.slice(2)
const mobile = args.includes('--mobile')

const browser = await chromium.launch()
const ctx = await browser.newContext(
  mobile
    ? { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true }
    : { viewport: { width: 1440, height: 900 } },
)
const page = await ctx.newPage()
await page.goto('http://localhost:5173/', { waitUntil: 'commit' }) // real motion — timing is the point

// Wait for the preloader to be COMPLETELY gone (detached = dissolve finished)
await page.waitForSelector('[role="status"][aria-label="HAELO is loading"]', { timeout: 10000 }).catch(() => {})
await page.waitForSelector('[role="status"][aria-label="HAELO is loading"]', { state: 'detached', timeout: 25000 })
const t0 = Date.now()

// Wait for slide 2 to become active
await page.waitForFunction(
  () => {
    const dots = [...document.querySelectorAll('[role="tablist"] [role="tab"]')]
    return dots[1]?.getAttribute('aria-selected') === 'true'
  },
  { timeout: 20000 },
)
const secs = (Date.now() - t0) / 1000
console.log(`${mobile ? 'mobile ' : 'desktop'}: slide 1 visible for ${secs.toFixed(1)}s after reveal (expect ~6s + fade start)`)
await browser.close()
