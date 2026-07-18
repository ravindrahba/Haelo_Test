// Round-2 image prep (client feedback follow-up):
//   - hero-1 / hero-2 re-exported from the original design PDFs at high res,
//     both to the SAME dimensions so the crossfade never re-crops.
//   - the 6 team headshots sliced from the feedback deck's reference strip.
// Uses Playwright's Chromium to encode webp — no sharp/cwebp on this machine.
import { chromium } from 'playwright'
import { readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'

const SCRATCH = String.raw`C:\Users\ravil\AppData\Local\Temp\claude\C--Users-ravil-OneDrive-Desktop-Haelo\c28f98b4-b715-487b-8057-c456512ff777\scratchpad\assets`
const TEAM = 'public/images/team'
const IMAGES = 'public/images'

// [srcAbsPath, outPath, targetWidth|null, quality]
const JOBS = [
  [path.join(SCRATCH, 'hero1-source.png'), path.join(IMAGES, 'hero-1.webp'), 2560, 0.82],
  [path.join(SCRATCH, 'hero2-source.png'), path.join(IMAGES, 'hero-2.webp'), 2560, 0.82],
  ...['doris', 'viola', 'emma', 'katherine', 'czarina', 'ema'].map((n) => [
    path.join(TEAM, `${n}.png`),
    path.join(TEAM, `${n}.webp`),
    512,
    0.86,
  ]),
]

const browser = await chromium.launch()
const page = await browser.newPage()

for (const [src, out, w, q] of JOBS) {
  const dataUrl = `data:image/png;base64,${readFileSync(src).toString('base64')}`
  const { b64, dims } = await page.evaluate(
    async ({ dataUrl, w, q }) => {
      const img = new Image()
      img.src = dataUrl
      await img.decode()
      const tw = w || img.naturalWidth
      const th = Math.round((img.naturalHeight / img.naturalWidth) * tw)
      const c = document.createElement('canvas')
      c.width = tw
      c.height = th
      const ctx = c.getContext('2d')
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'
      ctx.drawImage(img, 0, 0, tw, th)
      return { b64: c.toDataURL('image/webp', q).split(',')[1], dims: `${tw}x${th}` }
    },
    { dataUrl, w, q },
  )
  const buf = Buffer.from(b64, 'base64')
  writeFileSync(out, buf)
  console.log(`✓ ${path.basename(out).padEnd(16)} ${dims.padEnd(11)} ${(buf.length / 1024).toFixed(0)} KB`)
}

await browser.close()
