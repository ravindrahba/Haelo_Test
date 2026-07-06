import { useId, useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { cities } from '@/data/site'

/* ------------------------------------------------------------------ *
 *  Geometry — all derived data is computed once at module scope.      *
 *  viewBox is 1000 x 500; city coords arrive as 0–100 percentages.    *
 * ------------------------------------------------------------------ */

const VIEW_W = 1000
const VIEW_H = 500

const EMBER = '#F2AE6F'
const INK = '#1F2E32'
const LABEL_HALO = '#F7F4EE'

type Pt = readonly [number, number]

/** Stylised landmass outlines (viewBox coords) rasterised into a dot matrix. */
const LANDMASSES: ReadonlyArray<ReadonlyArray<Pt>> = [
  // North America
  [[75, 110], [110, 75], [170, 60], [250, 55], [310, 80], [330, 110], [300, 130], [315, 150], [295, 175], [280, 185], [285, 205], [270, 230], [255, 250], [235, 240], [225, 260], [205, 285], [190, 260], [175, 235], [155, 210], [140, 180], [120, 150], [95, 140], [80, 125]],
  // Greenland
  [[335, 45], [375, 40], [395, 60], [380, 90], [350, 95], [330, 70]],
  // South America
  [[270, 290], [305, 295], [330, 330], [322, 375], [300, 430], [285, 460], [272, 440], [262, 380], [258, 330], [262, 305]],
  // British Isles
  [[462, 130], [476, 126], [482, 144], [472, 162], [458, 152]],
  // Europe
  [[490, 112], [522, 98], [548, 112], [556, 138], [544, 162], [552, 182], [535, 196], [510, 200], [492, 192], [478, 196], [468, 184], [478, 168], [490, 160], [482, 142], [486, 126]],
  // Africa
  [[472, 214], [505, 206], [548, 212], [576, 232], [596, 262], [602, 288], [578, 300], [566, 336], [548, 378], [528, 404], [510, 392], [500, 352], [478, 306], [460, 262], [458, 232]],
  // Madagascar
  [[612, 330], [622, 340], [616, 362], [605, 350]],
  // Asia + Middle East
  [[556, 130], [600, 95], [670, 72], [750, 60], [830, 58], [890, 75], [915, 105], [912, 135], [895, 160], [875, 170], [858, 188], [843, 198], [838, 215], [830, 232], [818, 250], [805, 268], [798, 285], [792, 298], [786, 288], [780, 270], [772, 255], [758, 240], [745, 262], [735, 288], [722, 262], [712, 240], [695, 232], [680, 225], [668, 240], [655, 262], [638, 272], [620, 258], [610, 238], [598, 228], [585, 220], [572, 205], [562, 185], [552, 165], [548, 148]],
  // Japan
  [[895, 185], [908, 198], [900, 222], [886, 208]],
  // Borneo
  [[828, 295], [848, 302], [842, 320], [824, 312]],
  // Sumatra / Java
  [[778, 305], [810, 315], [842, 325], [835, 338], [800, 330], [772, 316]],
  // New Guinea
  [[880, 315], [905, 320], [898, 335], [876, 328]],
  // Australia
  [[838, 345], [875, 335], [905, 348], [915, 372], [898, 395], [862, 402], [836, 388], [824, 365], [828, 350]],
  // New Zealand
  [[938, 415], [950, 428], [944, 452], [930, 438]],
]

function pointInPolygon(px: number, py: number, poly: ReadonlyArray<Pt>): boolean {
  let inside = false
  for (let i = 0; i < poly.length; i += 1) {
    const [xi, yi] = poly[i]!
    const [xj, yj] = poly[(i + poly.length - 1) % poly.length]!
    const crosses = (yi > py) !== (yj > py) && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi
    if (crosses) inside = !inside
  }
  return inside
}

interface Pin {
  name: string
  cx: number
  cy: number
  isHub: boolean
  anchor: 'start' | 'end'
  lx: number
  ly: number
}

const PINS: ReadonlyArray<Pin> = cities.map((c, i) => {
  const cx = (c.x / 100) * VIEW_W
  const cy = (c.y / 100) * VIEW_H
  const isHub = i === 0
  const rightSide = c.x > 70
  return {
    name: c.name,
    cx,
    cy,
    isHub,
    anchor: isHub || rightSide ? 'end' : 'start',
    lx: isHub ? cx - 21 : rightSide ? cx - 13 : cx + 13,
    ly: isHub ? cy + 9 : cy + 4.5,
  }
})

const HUB: Pin = PINS[0]!
const SPOKES: ReadonlyArray<Pin> = PINS.slice(1)

interface Arc {
  d: string
  drawDelay: number
  pulseDur: number
  pulseBegin: number
}

/** Quadratic arcs bowing away from the straight chord (always upward-ish). */
const ARCS: ReadonlyArray<Arc> = SPOKES.map((p, i) => {
  const dx = p.cx - HUB.cx
  const dy = p.cy - HUB.cy
  const dist = Math.hypot(dx, dy)
  let nx = dy / dist
  let ny = -dx / dist
  if (ny > 0) {
    nx = -nx
    ny = -ny
  }
  const lift = Math.min(dist * 0.3, 105) + 10
  const mx = (HUB.cx + p.cx) / 2 + nx * lift
  const my = (HUB.cy + p.cy) / 2 + ny * lift
  return {
    d: `M ${HUB.cx} ${HUB.cy} Q ${mx.toFixed(1)} ${my.toFixed(1)} ${p.cx} ${p.cy}`,
    drawDelay: 0.25 + i * 0.12,
    pulseDur: 1.7 + dist / 240,
    pulseBegin: i * 0.7,
  }
})

/** Dot-matrix continents, bucketed into three opacity layers (3 paths total). */
const DOT_LAYERS: ReadonlyArray<string> = (() => {
  const parts: [string[], string[], string[]] = [[], [], []]
  const step = 11
  let row = 0
  for (let y = 38; y <= 472; y += step) {
    const offset = row % 2 === 1 ? step / 2 : 0
    for (let x = 55 + offset; x <= 965; x += step) {
      if (!LANDMASSES.some((poly) => pointInPolygon(x, y, poly))) continue
      if (PINS.some((p) => (p.cx - x) ** 2 + (p.cy - y) ** 2 < 225)) continue
      const bucket = parts[Math.round(x * 13 + y * 7) % 3]
      if (bucket) bucket.push(`M${x} ${y}h.01`)
    }
    row += 1
  }
  return parts.map((p) => p.join(''))
})()

const DOT_OPACITIES: ReadonlyArray<number> = [0.75, 0.83, 0.9]

/* ------------------------------------------------------------------ */

export function WorldMap({
  animate = true,
  continentColor = '#22343a',
  className,
}: {
  animate?: boolean
  continentColor?: string
  className?: string
}) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const inView = useInView(wrapRef, { once: true, amount: 0.3 })
  const reduced = useReducedMotion()
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '')

  const live = animate && !reduced
  const drawn = live ? inView : true
  const looping = live && inView

  const arcGlowId = `wm-${uid}-arc-glow`
  const pulseGlowId = `wm-${uid}-pulse-glow`

  const drawTransition = (delay: number) => ({
    pathLength: { duration: 1.3, delay, ease: 'easeInOut' as const },
    opacity: { duration: 0.4, delay },
  })

  return (
    <div ref={wrapRef} className={className}>
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="HAELO global network — offices connected to the Hong Kong hub"
        className="block h-auto w-full font-sans"
      >
        <defs>
          <filter id={arcGlowId} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.2" />
          </filter>
          <filter id={pulseGlowId} x="-250%" y="-250%" width="600%" height="600%">
            <feGaussianBlur stdDeviation="2.6" />
          </filter>
        </defs>

        {/* Continents (dot matrix) */}
        <motion.g initial={live ? { opacity: 0 } : false} animate={{ opacity: drawn ? 1 : 0 }} transition={{ duration: 0.9, ease: 'easeOut' }}>
          {DOT_LAYERS.map((d, i) => (
            <path key={i} d={d} fill="none" stroke={continentColor} strokeOpacity={DOT_OPACITIES[i] ?? 0.8} strokeWidth={3.4} strokeLinecap="round" />
          ))}
        </motion.g>

        {/* Connection arcs: blurred glow underlay + crisp ember stroke */}
        <g>
          {ARCS.map((a) => (
            <g key={a.d}>
              <motion.path
                d={a.d}
                fill="none"
                stroke={EMBER}
                strokeWidth={5}
                strokeLinecap="round"
                filter={`url(#${arcGlowId})`}
                initial={live ? { pathLength: 0, opacity: 0 } : false}
                animate={drawn ? { pathLength: 1, opacity: 0.4 } : { pathLength: 0, opacity: 0 }}
                transition={drawTransition(a.drawDelay)}
              />
              <motion.path
                d={a.d}
                fill="none"
                stroke={EMBER}
                strokeWidth={1.8}
                strokeLinecap="round"
                initial={live ? { pathLength: 0, opacity: 0 } : false}
                animate={drawn ? { pathLength: 1, opacity: 0.82 } : { pathLength: 0, opacity: 0 }}
                transition={drawTransition(a.drawDelay)}
              />
            </g>
          ))}
        </g>

        {/* Travelling pulses (hub -> city, looping, with comet trail) */}
        {looping && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 1.4 }}>
            {ARCS.map((a) => (
              <g key={a.d}>
                <circle r={7.5} fill={EMBER} opacity={0.35} filter={`url(#${pulseGlowId})`}>
                  <animateMotion dur={`${a.pulseDur.toFixed(2)}s`} begin={`${a.pulseBegin.toFixed(2)}s`} repeatCount="indefinite" path={a.d} calcMode="spline" keyPoints="0;1" keyTimes="0;1" keySplines="0.42 0 0.58 1" />
                </circle>
                <circle r={2.3} fill={EMBER} opacity={0.5}>
                  <animateMotion dur={`${a.pulseDur.toFixed(2)}s`} begin={`${(a.pulseBegin + 0.09).toFixed(2)}s`} repeatCount="indefinite" path={a.d} calcMode="spline" keyPoints="0;1" keyTimes="0;1" keySplines="0.42 0 0.58 1" />
                </circle>
                <circle r={1.5} fill={EMBER} opacity={0.28}>
                  <animateMotion dur={`${a.pulseDur.toFixed(2)}s`} begin={`${(a.pulseBegin + 0.18).toFixed(2)}s`} repeatCount="indefinite" path={a.d} calcMode="spline" keyPoints="0;1" keyTimes="0;1" keySplines="0.42 0 0.58 1" />
                </circle>
                <circle r={3.6} fill={EMBER}>
                  <animateMotion dur={`${a.pulseDur.toFixed(2)}s`} begin={`${a.pulseBegin.toFixed(2)}s`} repeatCount="indefinite" path={a.d} calcMode="spline" keyPoints="0;1" keyTimes="0;1" keySplines="0.42 0 0.58 1" />
                </circle>
                <circle r={1.6} fill="#FFF6EA">
                  <animateMotion dur={`${a.pulseDur.toFixed(2)}s`} begin={`${a.pulseBegin.toFixed(2)}s`} repeatCount="indefinite" path={a.d} calcMode="spline" keyPoints="0;1" keyTimes="0;1" keySplines="0.42 0 0.58 1" />
                </circle>
              </g>
            ))}
          </motion.g>
        )}

        {/* City pins + labels */}
        {PINS.map((p, i) => {
          const r = p.isHub ? 6.5 : 4
          return (
            <motion.g key={p.name} initial={live ? { opacity: 0 } : false} animate={{ opacity: drawn ? 1 : 0 }} transition={{ duration: 0.5, delay: live ? 0.3 + i * 0.1 : 0 }}>
              {looping && (
                <motion.circle
                  cx={p.cx}
                  cy={p.cy}
                  fill="none"
                  stroke={EMBER}
                  strokeWidth={1.6}
                  initial={{ r, opacity: 0.7 }}
                  animate={{ r: r + 13, opacity: 0 }}
                  transition={{ duration: 2.2, delay: i * 0.28, repeat: Infinity, repeatDelay: 0.4, ease: 'easeOut' }}
                />
              )}
              {p.isHub && (
                <>
                  <circle cx={p.cx} cy={p.cy} r={12.5} fill="none" stroke={EMBER} strokeWidth={1.1} strokeOpacity={0.5} />
                  {looping && (
                    <circle cx={p.cx} cy={p.cy} r={17} fill="none" stroke={EMBER} strokeWidth={1} strokeOpacity={0.35} strokeDasharray="3 7" strokeLinecap="round">
                      <animateTransform attributeName="transform" type="rotate" from={`0 ${p.cx} ${p.cy}`} to={`360 ${p.cx} ${p.cy}`} dur="14s" repeatCount="indefinite" />
                    </circle>
                  )}
                </>
              )}
              <circle cx={p.cx} cy={p.cy} r={r + 2.5} fill={EMBER} opacity={0.35} filter={`url(#${pulseGlowId})`} />
              <circle cx={p.cx} cy={p.cy} r={r} fill={EMBER} />
              <circle cx={p.cx} cy={p.cy} r={p.isHub ? 2.6 : 1.6} fill="#FFF9F0" />
              <text
                x={p.lx}
                y={p.ly}
                textAnchor={p.anchor}
                fontSize={p.isHub ? 12 : 10.5}
                fontWeight={p.isHub ? 700 : 600}
                letterSpacing="0.14em"
                fill={INK}
                fillOpacity={0.72}
                stroke={LABEL_HALO}
                strokeWidth={3.5}
                strokeOpacity={0.85}
                strokeLinejoin="round"
                style={{ paintOrder: 'stroke' }}
              >
                {p.name.toUpperCase()}
              </text>
            </motion.g>
          )
        })}
      </svg>
    </div>
  )
}
