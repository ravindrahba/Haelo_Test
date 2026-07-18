// Debug: after positioning the origin Reveal wrapper 8% into view, report its
// real geometry and what an IntersectionObserver with the same rootMargin sees.
import { chromium } from 'playwright'

const browser = await chromium.launch()
const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage()
await page.goto('http://localhost:5173/', { waitUntil: 'load' })
await page.waitForSelector('[role="status"][aria-label="HAELO is loading"]', { state: 'detached', timeout: 25000 })
await page.waitForTimeout(400)

const info = await page.evaluate(async () => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
  let el = document.querySelector('img[src*="origin"]')
  while (el && !(el.getAttribute('style') || '').includes('opacity')) el = el.parentElement
  if (!el) return { error: 'no wrapper' }

  let top = 0
  for (let n = el; n; n = n.offsetParent) top += n.offsetTop
  const target = top - window.innerHeight * 0.92
  window.scrollTo(0, target)
  await sleep(500)

  const r = el.getBoundingClientRect()
  const io = await new Promise((resolve) => {
    const obs = new IntersectionObserver(
      (entries) => {
        resolve({ intersecting: entries[0].isIntersecting, ratio: entries[0].intersectionRatio })
        obs.disconnect()
      },
      { rootMargin: '0px 0px -6% 0px' },
    )
    obs.observe(el)
  })

  return {
    scrollY: window.scrollY,
    wantedScrollY: target,
    innerHeight: window.innerHeight,
    rectTop: Math.round(r.top),
    rectTopPct: ((r.top / window.innerHeight) * 100).toFixed(1) + '%',
    opacity: getComputedStyle(el).opacity,
    style: (el.getAttribute('style') || '').slice(0, 120),
    manualIO: io,
  }
})
console.log(JSON.stringify(info, null, 2))
await browser.close()
