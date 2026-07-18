import { chromium } from 'playwright'
const b = await chromium.launch()
const p = await b.newPage({ viewport: { width: 390, height: 844 } })
await p.goto('http://localhost:5173/', { waitUntil: 'load' })
await p.waitForSelector('[role="status"][aria-label="HAELO is loading"]', { state: 'detached', timeout: 25000 })
await p.waitForTimeout(800) // background warm kicks in at gate-resolve
await p.evaluate(() => { window.history.pushState({}, '', '/about'); window.dispatchEvent(new PopStateEvent('popstate')) })
await p.waitForTimeout(1600)
const imgs = await p.evaluate(() => [...document.querySelectorAll('main img')].map(i => ({ src: i.src.split('/').pop(), ok: i.complete && i.naturalWidth > 0 })))
const bad = imgs.filter(i => !i.ok)
console.log(`about (mobile) images ready before scroll: ${imgs.length - bad.length}/${imgs.length}`, bad.length ? JSON.stringify(bad) : 'OK')
await b.close()
