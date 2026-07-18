// Convert the reference images the client embedded in the feedback deck into
// site-ready .webp. Uses the Chromium that Playwright already ships, so this
// adds no dependency.
//
//   node scripts/convert-assets.mjs
import { chromium } from 'playwright'
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import path from 'node:path'

const SRC = String.raw`C:\Users\ravil\OneDrive\Desktop\Haelo\comments received\extracted-assets`
const OUT = 'public/images'

// [source file, output name, quality, optional square-crop focus]
const JOBS = [
  ['talent-advisory-nextsteps-bg.png', 'ta-nextsteps.webp', 0.9],
  ['talent-search-cta-bg.png', 'ts-cta.webp', 0.9],
  ['about-different-perspective.png', 'about-perspective.webp', 0.9],
  ['about-founder-doris.png', 'founder-doris.webp', 0.92],
]

const browser = await chromium.launch()
const page = await browser.newPage()

for (const [file, out, q] of JOBS) {
  const src = path.join(SRC, file)
  if (!existsSync(src)) {
    console.log(`! missing ${file}`)
    continue
  }
  const b64 = readFileSync(src).toString('base64')
  const dataUrl = `data:image/png;base64,${b64}`
  const webpB64 = await page.evaluate(
    async ({ dataUrl, q }) => {
      const img = new Image()
      img.src = dataUrl
      await img.decode()
      const c = document.createElement('canvas')
      c.width = img.naturalWidth
      c.height = img.naturalHeight
      c.getContext('2d').drawImage(img, 0, 0)
      return c.toDataURL('image/webp', q).split(',')[1]
    },
    { dataUrl, q },
  )
  const buf = Buffer.from(webpB64, 'base64')
  writeFileSync(path.join(OUT, out), buf)
  console.log(`✓ ${out}  ${(buf.length / 1024).toFixed(0)} KB`)
}

await browser.close()
