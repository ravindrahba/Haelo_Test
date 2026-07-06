import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

const BASE = process.env.BASE || 'http://localhost:5173'
const OUT = 'shots'
mkdirSync(OUT, { recursive: true })

const routes = [
  ['home', '/'],
  ['talent-advisory', '/talent-advisory'],
  ['talent-search', '/talent-search'],
  ['clients', '/clients'],
  ['about', '/about'],
  ['insights', '/insights'],
  ['contact', '/contact'],
]

const viewports = [
  ['desktop', 1440, 900],
  ['mobile', 390, 844],
]

async function autoScroll(page) {
  await page.evaluate(async () => {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
    const step = Math.round(window.innerHeight * 0.8)
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y)
      await sleep(120)
    }
    window.scrollTo(0, 0)
    await sleep(200)
    // Force-reveal any framer-motion elements still at their hidden initial state
    // (scripted scroll under reduced-motion can miss IntersectionObserver triggers).
    document.querySelectorAll('*').forEach((el) => {
      const s = el.style
      if (!s) return
      if (s.opacity !== '' && parseFloat(s.opacity) < 1) s.opacity = '1'
      if (s.transform && /translate|matrix/.test(s.transform)) s.transform = 'none'
    })
    // ensure images decoded
    await Promise.all([...document.images].map((i) => (i.decode ? i.decode().catch(() => {}) : null)))
  })
}

const browser = await chromium.launch()
for (const [vp, w, h] of viewports) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, reducedMotion: 'reduce' })
  const page = await ctx.newPage()
  for (const [name, path] of routes) {
    const url = BASE + path + (path.includes('?') ? '&' : '?') + 'static=1'
    await page.goto(url, { waitUntil: 'load', timeout: 30000 })
    await page.waitForTimeout(600)
    await autoScroll(page)
    await page.waitForTimeout(500)
    await page.screenshot({ path: `${OUT}/${name}-${vp}.png`, fullPage: true })
    console.log(`✓ ${name}-${vp}.png`)
  }
  await ctx.close()
}
await browser.close()
console.log('done')
