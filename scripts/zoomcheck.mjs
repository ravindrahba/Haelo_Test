import { chromium } from 'playwright'
const b = await chromium.launch()
const ctx = await b.newContext({ viewport: { width: 1280, height: 800 } })
const p = await ctx.newPage()
await p.goto('http://localhost:5173/', { waitUntil: 'load' })
await p.waitForTimeout(2500) // past preloader
const scale = async () => p.$$eval('.swiper-slide-active img', imgs => {
  const el = imgs[0]; if(!el) return null
  const m = new DOMMatrixReadOnly(getComputedStyle(el).transform); return +m.a.toFixed(3)
})
const s1 = await scale(); await p.waitForTimeout(4000); const s2 = await scale()
console.log(JSON.stringify({ scaleAt0s: s1, scaleAt4s: s2, zoomingVisibly: s1!=null && s2!=null && (s2 - s1) > 0.05 }))
await b.close()
