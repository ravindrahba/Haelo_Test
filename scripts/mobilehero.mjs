import { chromium } from 'playwright'
const b = await chromium.launch()
const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce', isMobile: true })
const p = await ctx.newPage()
await p.goto('http://localhost:5173/?static=1', { waitUntil: 'load' })
await p.waitForTimeout(1400)
const dots = await p.$$('[role="tab"]')
for (let i=0;i<dots.length;i++){ await dots[i].click(); await p.evaluate(()=>window.scrollTo(0,0)); await p.waitForTimeout(800)
  await p.screenshot({ path:`shots/m-hero-${i+1}.png`, clip:{x:0,y:0,width:390,height:844} }) ; console.log('m-hero-'+(i+1)) }
const over = await p.evaluate(()=>({ scrollW: document.documentElement.scrollWidth, clientW: document.documentElement.clientWidth }))
console.log('overflowX', JSON.stringify(over))
await b.close()
