import { chromium } from 'playwright'
const b = await chromium.launch()
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } })
const p = await ctx.newPage()
const errors = []
p.on('pageerror', e => errors.push('PAGEERROR: ' + e.message))
p.on('console', m => { if (m.type() === 'error') errors.push('CONSOLE: ' + m.text()) })
await p.goto('http://localhost:8899/_preview.html', { waitUntil: 'load' })
await p.waitForTimeout(3000) // past preloader
const preHidden = await p.$eval('#haelo-preloader', el => el.classList.contains('is-hidden') || getComputedStyle(el).display === 'none').catch(()=>null)
const swiperInit = await p.$eval('.haelo-hero-swiper', el => el.classList.contains('swiper-initialized')).catch(()=>false)
const idx = () => p.$$eval('.hero-dot', d => d.findIndex(x => x.classList.contains('is-active')))
const i0 = await idx()
await p.waitForTimeout(7000)
const i1 = await idx()
const mapIn = await p.$eval('.map', el => el.classList.contains('is-in')).catch(()=>false)
await p.screenshot({ path: 'shots/wp-preview.png', clip: { x:0,y:0,width:1440,height:900 } })
// open menu test
await p.click('#nav-toggle'); await p.waitForTimeout(600)
const menuOpen = await p.$eval('body', el => el.classList.contains('menu-open'))
console.log(JSON.stringify({ preloaderHidden: preHidden, swiperInitialized: swiperInit, dotStart: i0, dotAfter7s: i1, carouselAdvances: i0!==i1, worldMapInView: mapIn, menuOpens: menuOpen, errors }, null, 0))
await b.close()
