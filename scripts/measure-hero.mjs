// Compare rendered hero geometry against the original design spec
// (Archive/HAELO Landing Page - TEXT.pdf, measured at a 1920 canvas).
import { chromium } from 'playwright'

const TARGET = {
  HAELO: { L: 1100.8, R: 1364.9, top: 272.5, size: 94.36 },
  'DESIGNS THE TEAMS': { L: 950.8, R: 1773.6, top: 342.7, size: 94.36 },
  'THAT DESIGN': { L: 1034.8, R: 1569.9, top: 415.5, size: 94.36 },
  'THE FUTURE': { L: 1161.5, R: 1664.5, top: 488.3, size: 94.36 },
}

const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1, reducedMotion: 'reduce' })
const page = await ctx.newPage()
await page.goto('http://localhost:5173/?static=1', { waitUntil: 'load' })
await page.waitForSelector('[role="status"][aria-label="HAELO is loading"]', { state: 'detached', timeout: 15000 }).catch(() => {})
await page.waitForTimeout(900)

const rows = await page.evaluate(() => {
  const h1 = document.querySelector('.swiper-slide-active h1') || document.querySelector('h1')
  const out = []
  for (const lineEl of h1.querySelectorAll(':scope > span')) {
    const text = lineEl.textContent.replace(/\s+/g, ' ').trim()
    // union of the word spans = the true inked box for the line
    let L = Infinity, R = -Infinity, top = Infinity
    for (const w of lineEl.querySelectorAll('span')) {
      const r = w.getBoundingClientRect()
      if (r.width === 0) continue
      L = Math.min(L, r.left); R = Math.max(R, r.right); top = Math.min(top, r.top)
    }
    const cs = getComputedStyle(lineEl.querySelector('span') || lineEl)
    out.push({ text, L, R, top, size: parseFloat(cs.fontSize), weight: cs.fontWeight, ls: cs.letterSpacing })
  }
  const p = document.querySelector('.swiper-slide-active p') || document.querySelector('section p')
  const pr = p ? p.getBoundingClientRect() : null
  const pcs = p ? getComputedStyle(p) : null
  return { lines: out, caption: pr ? { L: pr.left, R: pr.right, top: pr.top, size: parseFloat(pcs.fontSize), lh: pcs.lineHeight } : null }
})

console.log('line'.padEnd(20), 'L(got/want)'.padEnd(22), 'R(got/want)'.padEnd(22), 'top(got/want)'.padEnd(20), 'size', 'wt', 'ls')
for (const r of rows.lines) {
  const t = TARGET[r.text]
  const f = (g, w) => `${g.toFixed(1)}/${w.toFixed(1)} (${(g - w >= 0 ? '+' : '') + (g - w).toFixed(1)})`
  if (!t) { console.log(r.text.padEnd(20), 'NO TARGET'); continue }
  console.log(
    r.text.padEnd(20),
    f(r.L, t.L).padEnd(22),
    f(r.R, t.R).padEnd(22),
    f(r.top, t.top).padEnd(20),
    r.size.toFixed(1), r.weight, r.ls,
  )
}
console.log('\ncaption:', JSON.stringify(rows.caption))
console.log('want   : L≈981.1 R≈1737.9 top≈592.6 size=30.95 lh≈37.15  (centre 1359.5)')
if (rows.caption) console.log('caption centre got:', ((rows.caption.L + rows.caption.R) / 2).toFixed(1))
await browser.close()
