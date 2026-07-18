// Verify the reveal retune: an element scrolled just ~8% into the viewport
// should already be animating (opacity > 0). Under the old -12% inset it was
// still fully invisible at that point — the "suddenly appears" complaint.
import { chromium } from 'playwright'

const browser = await chromium.launch()
const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage()
await page.goto('http://localhost:5173/', { waitUntil: 'load' })
await page.waitForSelector('[role="status"][aria-label="HAELO is loading"]', { state: 'detached', timeout: 25000 })
await page.waitForTimeout(400)

// Position the Origin image block so its top edge sits 8% above the viewport bottom
const probe = async (selector) => {
  await page.evaluate((sel) => {
    const el = document.querySelector(sel)
    const r = el.getBoundingClientRect()
    const target = window.scrollY + r.top - window.innerHeight * 0.92
    window.scrollTo(0, target)
  }, selector)
  await page.waitForTimeout(450) // mid-animation if triggered
  const mid = await page.evaluate((sel) => {
    let el = document.querySelector(sel)
    // walk up to the animated (motion) wrapper: first ancestor with opacity style
    while (el && !el.getAttribute('style')?.includes('opacity')) el = el.parentElement
    return el ? parseFloat(getComputedStyle(el).opacity).toFixed(2) : 'n/a'
  }, selector)
  await page.waitForTimeout(1600)
  const end = await page.evaluate((sel) => {
    let el = document.querySelector(sel)
    while (el && !el.getAttribute('style')?.includes('opacity')) el = el.parentElement
    return el ? parseFloat(getComputedStyle(el).opacity).toFixed(2) : 'n/a'
  }, selector)
  return { mid, end }
}

const origin = await probe('img[src*="origin"]')
console.log(`origin image at 8% into view: opacity ${origin.mid} while animating (was 0.00 before fix), settles at ${origin.end}`)

const tiles = await probe('img[src*="why-talent"]')
console.log(`why-talent tile at 8% into view: opacity ${tiles.mid}, settles at ${tiles.end}`)

await browser.close()
