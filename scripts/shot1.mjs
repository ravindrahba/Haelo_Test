// Ad-hoc single-viewport screenshot for design comparison.
//   node scripts/shot1.mjs <route> <outname> [width] [height] [--full]
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

const [, , route = '/', name = 'shot', w = '1920', h = '1080', ...rest] = process.argv
const full = rest.includes('--full')
const BASE = process.env.BASE || 'http://localhost:5173'
mkdirSync('shots', { recursive: true })

const browser = await chromium.launch()
const ctx = await browser.newContext({
  viewport: { width: +w, height: +h },
  deviceScaleFactor: 1,
  reducedMotion: 'reduce',
})
const page = await ctx.newPage()
const url = BASE + route + (route.includes('?') ? '&' : '?') + 'static=1'
await page.goto(url, { waitUntil: 'load', timeout: 30000 })
// The preloader gates on fonts + window load, then dissolves. Wait it out
// rather than racing it.
await page.waitForSelector('[role="status"][aria-label="HAELO is loading"]', { state: 'detached', timeout: 15000 }).catch(() => {})
await page.waitForTimeout(900)

if (full) {
  await page.evaluate(async () => {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
    const step = Math.round(window.innerHeight * 0.8)
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y)
      await sleep(120)
    }
    window.scrollTo(0, 0)
    await sleep(200)
    document.querySelectorAll('*').forEach((el) => {
      const s = el.style
      if (!s) return
      if (s.opacity !== '' && parseFloat(s.opacity) < 1) s.opacity = '1'
      if (s.transform && /translate|matrix/.test(s.transform)) s.transform = 'none'
    })
    await Promise.all([...document.images].map((i) => (i.decode ? i.decode().catch(() => {}) : null)))
  })
  await page.waitForTimeout(400)
}

await page.screenshot({ path: `shots/${name}.png`, fullPage: full })
console.log(`✓ shots/${name}.png`)
await browser.close()
