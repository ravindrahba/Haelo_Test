import { chromium } from 'playwright'

const BASE = process.env.BASE || 'http://localhost:4173'

async function probe(reduced) {
  const browser = await chromium.launch()
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: reduced ? 'reduce' : 'no-preference',
  })
  const page = await ctx.newPage()
  const errors = []
  page.on('pageerror', (e) => errors.push(String(e)))
  page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text()) })

  await page.goto(BASE + '/', { waitUntil: 'load' })
  await page.waitForTimeout(1000)

  // 1) hero slide auto-advance: read active dot aria-selected index at t0 and t+8s
  const activeIndex = async () => page.$$eval('[role="tab"]', (tabs) => tabs.findIndex((t) => t.getAttribute('aria-selected') === 'true'))
  const idx0 = await activeIndex()
  await page.waitForTimeout(8000)
  const idx1 = await activeIndex()

  // 2) AnimatedText: is any masked word span still translated (mid/hidden) or animating?
  //    Check a heading's inner motion span computed transform.
  const heroLineTransform = await page.evaluate(() => {
    const el = document.querySelector('h1 span span')
    return el ? getComputedStyle(el).transform : 'no-el'
  })

  // 3) Lenis smooth scroll active? (html has data-lenis or scroll behaves) — check if the
  //    gsap ticker / requestAnimationFrame is running by sampling rAF twice.
  const rafRunning = await page.evaluate(
    () =>
      new Promise((res) => {
        let n = 0
        const t = performance.now()
        const loop = () => {
          n++
          if (performance.now() - t > 300) res(n)
          else requestAnimationFrame(loop)
        }
        requestAnimationFrame(loop)
      }),
  )

  await browser.close()
  return { reduced, idx0, idx1, slideAdvanced: idx0 !== idx1, heroLineTransform, rafFrames: rafRunning, errors }
}

console.log('NORMAL  :', JSON.stringify(await probe(false)))
console.log('REDUCED :', JSON.stringify(await probe(true)))
