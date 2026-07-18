// Verify: (1) homepage imagery is fetched while the preloader is still up,
// (2) SectionBg/ParallaxImage imgs fade (transition-opacity) instead of popping.
import { chromium } from 'playwright'

const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } }) // real motion — preloader timing matters
const page = await ctx.newPage()

const fetched = new Set()
page.on('response', (r) => {
  const u = r.url()
  if (u.includes('/images/')) fetched.add(u.split('/').pop())
})

await page.goto('http://localhost:5173/', { waitUntil: 'commit' })
// Snapshot what has been fetched by the time the preloader is still visible
await page.waitForSelector('[role="status"][aria-label="HAELO is loading"]', { timeout: 10000 }).catch(() => {})
await page.waitForTimeout(1200) // mid-preloader
const during = [...fetched]
await page.waitForSelector('[role="status"][aria-label="HAELO is loading"]', { state: 'detached', timeout: 20000 }).catch(() => {})

const want = ['hero-1.webp', 'hero-2.webp', 'why-talent.webp', 'why-business.webp', 'origin.webp', 'service-advisory.webp', 'service-talent.webp']
const missing = want.filter((w) => !during.includes(w))
console.log('fetched during preloader:', during.filter((f) => want.includes(f)).length, 'of', want.length)
if (missing.length) console.log('  not yet fetched mid-preloader:', missing.join(', '))

// Scroll to the Origin image and confirm fade state
await page.evaluate(() => document.querySelector('img[src*="origin"]')?.scrollIntoView({ block: 'center' }))
await page.waitForTimeout(1400)
const audit = await page.evaluate(() => {
  const img = document.querySelector('img[src*="origin"]')
  const cs = getComputedStyle(img)
  return { opacity: cs.opacity, transition: cs.transitionProperty + ' ' + cs.transitionDuration, complete: img.complete }
})
console.log('origin img:', JSON.stringify(audit))
await browser.close()
