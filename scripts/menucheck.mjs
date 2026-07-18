// The open menu had no visible close control (feedback PDF p12). Assert the
// burger is now on top of the overlay, hit-testable, and actually closes it.
import { chromium } from 'playwright'

const b = await chromium.launch()
const p = await b.newPage({ viewport: { width: 1440, height: 900 } })
await p.goto('http://localhost:5173/?static=1', { waitUntil: 'load' })
await p.waitForSelector('[role="status"][aria-label="HAELO is loading"]', { state: 'detached', timeout: 15000 }).catch(() => {})
await p.waitForTimeout(600)

await p.click('button[aria-controls="haelo-menu"]')
await p.waitForTimeout(900)

const r = await p.evaluate(() => {
  const btn = document.querySelector('button[aria-controls="haelo-menu"]')
  const rect = btn.getBoundingClientRect()
  const hit = document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2)
  return {
    label: btn.getAttribute('aria-label'),
    expanded: btn.getAttribute('aria-expanded'),
    burgerIsTopmost: btn.contains(hit) || hit === btn,
    menuOpen: !!document.querySelector('#haelo-menu'),
    navItems: [...document.querySelectorAll('#haelo-menu nav a')].map((a) => a.textContent.replace(/\s+/g, ' ').trim()),
  }
})
console.log(JSON.stringify(r, null, 2))
await p.screenshot({ path: 'shots/menu-open.png' })

await p.click('button[aria-controls="haelo-menu"]')
await p.waitForTimeout(1000)
console.log('closes on click:', !(await p.$('#haelo-menu')))
await b.close()
