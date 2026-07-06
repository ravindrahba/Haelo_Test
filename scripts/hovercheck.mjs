import { chromium } from 'playwright'
const b = await chromium.launch()
const ctx = await b.newContext({ viewport: { width: 1280, height: 800 } })
const p = await ctx.newPage()
await p.goto('http://localhost:5173/', { waitUntil: 'load' })
await p.waitForTimeout(2500)
await p.mouse.move(640, 400) // park cursor in the middle of the hero
const idx = () => p.$$eval('[role="tab"]', ts => ts.findIndex(t => t.getAttribute('aria-selected') === 'true'))
const seq = [await idx()]
for (let k=0;k<3;k++){ await p.waitForTimeout(6500); await p.mouse.move(640,400+k); seq.push(await idx()) }
console.log(JSON.stringify({ seqWithCursorOverHero: seq, advancesDespiteHover: new Set(seq).size > 1 }))
await b.close()
