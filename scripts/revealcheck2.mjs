// Reveal retune check, positioning the ACTUAL animated wrapper (not the
// parallax-scaled img inside it) at 8% into the viewport.
import { chromium } from 'playwright'

const browser = await chromium.launch()
const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage()
await page.goto('http://localhost:5173/', { waitUntil: 'load' })
await page.waitForSelector('[role="status"][aria-label="HAELO is loading"]', { state: 'detached', timeout: 25000 })
await page.waitForTimeout(400)

const result = await page.evaluate(async () => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
  // The Origin image's Reveal wrapper: ancestor of the origin img that motion
  // controls (has an inline opacity style).
  let el = document.querySelector('img[src*="origin"]')
  while (el && !(el.getAttribute('style') || '').includes('opacity')) el = el.parentElement
  if (!el) return { error: 'wrapper not found' }

  // Place the WRAPPER's top edge 8% above the viewport bottom, using layout
  // position (offsetTop chain) so transforms don't skew the math.
  let top = 0
  for (let n = el; n; n = n.offsetParent) top += n.offsetTop
  window.scrollTo(0, top - window.innerHeight * 0.92)
  await sleep(450)
  const mid = parseFloat(getComputedStyle(el).opacity)
  await sleep(1700)
  const end = parseFloat(getComputedStyle(el).opacity)
  return { mid: mid.toFixed(2), end: end.toFixed(2) }
})
console.log('origin Reveal wrapper at 8% into view:', JSON.stringify(result))
console.log(result.mid > 0 ? '✓ animating as it enters (no dead travel)' : '✗ still hidden — trigger too late')
await browser.close()
