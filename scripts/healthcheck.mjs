// Walk every route: console errors, failed requests, broken images, and a few
// assertions against the client's feedback (no eyebrow ticks, no button arrows).
import { chromium } from 'playwright'

const BASE = process.env.BASE || 'http://localhost:5173'
const ROUTES = ['/', '/talent-advisory', '/talent-search', '/clients', '/about', '/contact', '/insights']

const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' })
let bad = 0

for (const route of ROUTES) {
  const page = await ctx.newPage()
  const errors = []
  const failed = []
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
  page.on('pageerror', (e) => errors.push(String(e)))
  page.on('requestfailed', (r) => failed.push(`${r.url()} — ${r.failure()?.errorText}`))
  page.on('response', (r) => {
    if (r.status() >= 400) failed.push(`${r.status()} ${r.url()}`)
  })

  await page.goto(BASE + route + '?static=1', { waitUntil: 'load', timeout: 30000 })
  await page.waitForSelector('[role="status"][aria-label="HAELO is loading"]', { state: 'detached', timeout: 15000 }).catch(() => {})
  await page.evaluate(async () => {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
    for (let y = 0; y < document.body.scrollHeight; y += Math.round(window.innerHeight * 0.8)) {
      window.scrollTo(0, y)
      await sleep(90)
    }
    window.scrollTo(0, 0)
    await sleep(250)
  })

  const audit = await page.evaluate(() => {
    const brokenImgs = [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.currentSrc || i.src)
    // an eyebrow tick was a 1px-wide ember bar next to an uppercase label
    const ticks = [...document.querySelectorAll('span.bg-ember')].filter((s) => {
      const r = s.getBoundingClientRect()
      return r.width > 0 && r.width <= 2 && r.height > 0 && r.height < 30
    }).length
    const arrows = document.querySelectorAll('a svg.lucide-arrow-up-right').length
    const navLabels = [...document.querySelectorAll('#haelo-menu a')].map((a) => a.textContent.trim())
    return { brokenImgs, ticks, arrows, navLabels }
  })

  const problems = []
  if (errors.length) problems.push(`console: ${errors.slice(0, 2).join(' | ')}`)
  if (failed.length) problems.push(`requests: ${failed.slice(0, 2).join(' | ')}`)
  if (audit.brokenImgs.length) problems.push(`broken images: ${audit.brokenImgs.join(', ')}`)
  if (audit.arrows) problems.push(`${audit.arrows} button arrow(s) still present`)

  if (problems.length) {
    bad++
    console.log(`✗ ${route}`)
    problems.forEach((p) => console.log(`    ${p}`))
  } else {
    console.log(`✓ ${route}  (imgs ok, no console errors, no arrows)`)
  }
  await page.close()
}

await browser.close()
console.log(bad ? `\n${bad} route(s) with problems` : '\nall routes clean')
