import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'
mkdirSync('pdf-build', { recursive: true })
const BASE = 'http://localhost:5173'
const routes = [
  ['1-home', '/'],
  ['2-talent-advisory', '/talent-advisory'],
  ['3-talent-search', '/talent-search'],
  ['4-clients', '/clients'],
  ['5-about', '/about'],
  ['6-insights', '/insights'],
  ['7-contact', '/contact'],
]
const b = await chromium.launch()
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, reducedMotion: 'reduce' })
const p = await ctx.newPage()
for (const [name, path] of routes) {
  await p.goto(BASE + path + '?static=1', { waitUntil: 'load', timeout: 45000 })
  await p.waitForTimeout(900)
  await p.evaluate(async () => {
    const sleep = (ms) => new Promise(r => setTimeout(r, ms))
    const step = Math.round(window.innerHeight * 0.8)
    for (let y = 0; y < document.body.scrollHeight; y += step) { window.scrollTo(0, y); await sleep(110) }
    window.scrollTo(0, 0); await sleep(250)
    document.querySelectorAll('*').forEach(el => { const s = el.style; if (!s) return; if (s.opacity !== '' && parseFloat(s.opacity) < 1) s.opacity = '1'; if (s.transform && /translate|matrix/.test(s.transform)) s.transform = 'none' })
    await Promise.all([...document.images].map(i => (i.decode ? i.decode().catch(() => {}) : null)))
  })
  await p.waitForTimeout(500)
  await p.screenshot({ path: `pdf-build/${name}.png`, fullPage: true })
  console.log('captured', name)
}
await b.close()
