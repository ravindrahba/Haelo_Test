// Capture both carousel slides + confirm the count, then the About team strip.
import { chromium } from 'playwright'

const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1, reducedMotion: 'reduce' })
const page = await ctx.newPage()

await page.goto('http://localhost:5173/?static=1', { waitUntil: 'load' })
await page.waitForSelector('[role="status"][aria-label="HAELO is loading"]', { state: 'detached', timeout: 15000 }).catch(() => {})
await page.waitForTimeout(900)

const dots = await page.$$('[role="tablist"] [role="tab"]')
console.log('carousel slides:', dots.length)

await page.screenshot({ path: 'shots/hero-slide1.png' })

if (dots[1]) {
  await dots[1].click()
  await page.waitForTimeout(1800) // let the crossfade settle
  await page.screenshot({ path: 'shots/hero-slide2.png' })
}

// About — team headshots + the "Talent that moves" heading
const about = await ctx.newPage()
await about.goto('http://localhost:5173/about?static=1', { waitUntil: 'load' })
await about.waitForSelector('[role="status"][aria-label="HAELO is loading"]', { state: 'detached', timeout: 15000 }).catch(() => {})
await about.evaluate(async () => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
  for (let y = 0; y < document.body.scrollHeight; y += Math.round(window.innerHeight * 0.8)) {
    window.scrollTo(0, y)
    await sleep(90)
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
const heading = await about.evaluate(() => [...document.querySelectorAll('h2')].map((h) => h.textContent.trim()).find((t) => t.toLowerCase().includes('borders')))
const teamImgs = await about.evaluate(() =>
  [...document.querySelectorAll('img')].filter((i) => i.src.includes('/team/')).map((i) => i.src.split('/').pop() + ' ' + i.naturalWidth + 'x' + i.naturalHeight),
)
console.log('borders heading:', JSON.stringify(heading))
console.log('team images:', teamImgs.join(', '))

// crop just the team band
const teamSection = await about.$('text=We are embedded')
if (teamSection) {
  const box = await (await about.$('section:has(img[src*="/team/"])')).boundingBox()
  if (box) await about.screenshot({ path: 'shots/about-team.png', clip: { x: 0, y: box.y, width: 1920, height: Math.min(box.height, 700) } })
}
await browser.close()
