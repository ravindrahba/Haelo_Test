import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { cities } from '@/data/site'

const EMBER = '#F2AE6F'
const VIEW_W = 1000
const VIEW_H = 500

/** Equirectangular projection window: 180°W→180°E, 78°N→58°S */
const LAT_TOP = 78
const LAT_SPAN = 136

const DOT_SPACING = 13
const DOT_RADIUS = 2.3

/** Cities whose x% exceeds this get their label flipped to the left. */
const LABEL_FLIP_X = 78

const rnd = (n: number): number => Math.round(n * 10) / 10

type LonLat = readonly [number, number]

const LANDMASSES: readonly (readonly LonLat[])[] = [
  // North America
  [
    [-168, 66], [-160, 63], [-153, 59], [-145, 61], [-136, 58], [-130, 54],
    [-125, 49], [-124, 42], [-119, 34], [-113, 29], [-107, 22], [-102, 17],
    [-96, 16], [-92, 14], [-87, 12], [-83, 9], [-79, 8], [-84, 13],
    [-88, 17], [-87, 21], [-91, 20], [-97, 22], [-97, 27], [-93, 29.5],
    [-88, 30], [-84, 30], [-82, 27], [-80, 25], [-80, 28], [-81, 31],
    [-78, 34], [-75, 38], [-71, 41.5], [-66, 44], [-60, 46], [-53, 47],
    [-56, 51], [-60, 55], [-64, 59], [-70, 62], [-78, 63], [-86, 65],
    [-94, 66], [-104, 68], [-116, 69], [-128, 70], [-141, 70], [-155, 71],
    [-163, 69],
  ],
  // Greenland
  [
    [-58, 75], [-50, 78], [-40, 80], [-28, 79], [-20, 75], [-24, 70],
    [-32, 66], [-42, 60], [-50, 62], [-54, 67], [-58, 72],
  ],
  // South America
  [
    [-78, 7], [-76, 9], [-72, 12], [-66, 10.5], [-60, 8.5], [-55, 6],
    [-51, 4], [-48, -1], [-42, -3], [-35, -6], [-35, -10], [-39, -14],
    [-40, -20], [-42, -23], [-48, -26], [-52, -32], [-57, -36], [-62, -40],
    [-65, -45], [-67, -50], [-69, -54], [-72, -52], [-73, -46], [-72, -40],
    [-71, -33], [-70, -25], [-70, -18], [-75, -15], [-77, -10], [-80, -5],
    [-81, -1], [-80, 3],
  ],
  // Eurasia
  [
    [-9, 37], [-9, 43], [-2, 45], [-4, 48], [0, 50], [4, 53], [9, 54],
    [8, 56], [7, 58], [5, 61], [10, 64], [14, 67], [19, 70], [26, 71],
    [31, 70], [37, 68], [44, 67], [52, 68], [60, 69], [68, 71], [76, 73],
    [86, 75], [96, 77], [106, 77], [114, 76], [122, 73], [130, 72],
    [140, 72], [150, 70], [160, 69], [170, 67], [178, 65], [177, 63],
    [172, 61], [165, 60], [162, 56], [157, 51], [156, 54], [152, 58],
    [147, 59], [141, 57], [138, 54], [140, 50], [138, 47], [135, 44],
    [131, 43], [129, 40], [129, 36], [126, 35], [126, 38], [124, 39],
    [121, 39], [118, 38], [121, 37], [122, 34], [120, 32], [122, 30],
    [120, 27], [117, 24], [114, 22], [110, 20], [108, 15], [106, 10],
    [104, 9], [100, 13], [99, 9], [103, 1.5], [101, 3], [98, 9], [97, 15],
    [94, 17], [91, 22], [88, 21], [85, 19], [82, 15], [80, 12], [77, 8],
    [74, 13], [72, 19], [68, 23], [66, 25], [61, 25], [57, 26], [52, 27.5],
    [50, 29], [48, 29], [51, 25], [54, 25], [57, 23], [58, 20], [54, 17],
    [48, 13], [43.5, 12.5], [41, 16], [38, 21], [35, 27], [34, 30],
    [35, 33], [36, 36], [32, 36.5], [29, 36.5], [27, 37], [26, 39],
    [25, 40], [23, 40], [22, 37], [20, 39], [19, 42], [16, 44], [13, 45.5],
    [14, 42], [16, 41], [18, 40], [17, 39], [15, 38], [13, 41], [11, 42.5],
    [9, 44], [7, 43.5], [4, 43.3], [3, 41.5], [0, 39], [-1, 37], [-5, 36],
    [-7, 36.5],
  ],
  // Africa
  [
    [-6, 35], [3, 37], [10, 37], [15, 32], [20, 31], [25, 32], [31, 31],
    [34, 27], [37, 21], [40, 16], [43, 11.5], [47, 11], [51, 12], [51, 10],
    [45, 1], [41, -4], [40, -11], [36, -18], [35, -24], [32, -29],
    [27, -34], [22, -35], [18, -33], [16, -28], [13, -20], [12, -12],
    [9, -4], [9, 2], [5, 5], [-2, 5], [-8, 4.5], [-13, 8], [-17, 14],
    [-17, 20], [-14, 25], [-10, 30], [-9, 33],
  ],
  // Madagascar
  [[44, -12], [48, -14], [50, -17], [48, -23], [45, -25], [43, -21], [43, -15]],
  // Britain
  [
    [-5.5, 50], [-1, 50.8], [1.5, 51.3], [0.5, 53], [-1.5, 55], [-2.5, 57],
    [-4, 58.5], [-6, 58], [-5, 55.5], [-6.2, 53.5], [-5.2, 51.5],
  ],
  // Ireland
  [[-10, 51.8], [-6, 52.2], [-5.5, 54], [-7, 55.2], [-10, 54.2], [-10.5, 52.8]],
  // Iceland
  [[-23, 65.8], [-18, 66.8], [-14, 65.8], [-15, 64], [-20, 63.5], [-23, 64.5]],
  // Japan
  [
    [129, 31], [132, 33], [135, 34], [138, 35], [140, 36], [141, 39],
    [142, 42], [144, 44], [145, 45], [142, 45], [140, 42], [139, 38],
    [136, 36], [133, 34], [130, 33],
  ],
  // Sumatra
  [[95, 5.5], [98, 3], [102, -1], [106, -5], [104, -6], [100, -2], [96, 2], [94, 4]],
  // Java
  [[105, -6.2], [110, -6.5], [114, -7], [115, -8.5], [110, -8], [105, -7.5]],
  // Borneo
  [[109, 2], [113, 5], [117, 7], [119, 2], [117, -2], [113, -3.5], [110, -2], [108, 0]],
  // Sulawesi
  [[119, 1], [122, 1], [123, -2], [121, -5], [119, -3], [118, -1]],
  // New Guinea
  [[131, -1], [136, -2], [141, -3], [146, -6], [147, -8], [143, -8], [138, -7], [134, -4], [130, -2]],
  // Philippines
  [[120, 18], [122, 17], [123, 13], [125, 9], [126, 7], [123, 7], [121, 11], [119, 15]],
  // Australia
  [
    [113, -22], [114, -26], [115, -32], [118, -35], [124, -33], [129, -32],
    [132, -32], [136, -35], [140, -38], [145, -38.5], [147, -38], [150, -37],
    [153, -32], [153, -27], [151, -24], [149, -20], [146, -19], [143, -14],
    [142, -11], [138, -12], [136, -12], [132, -11], [129, -14], [125, -14],
    [122, -17], [117, -20], [114, -21],
  ],
  // Tasmania
  [[144.6, -40.8], [148.3, -40.9], [148.2, -43.2], [146.3, -43.6], [144.7, -42.2]],
  // New Zealand — North Island
  [
    [172.8, -34.5], [175.5, -36.2], [176.8, -37.8], [178.3, -37.6],
    [177, -39.3], [174.8, -41.3], [174.5, -39], [173, -37],
  ],
  // New Zealand — South Island
  [
    [172.7, -40.6], [174.3, -41.8], [172.8, -43.6], [171, -44.2],
    [168, -46.6], [166.4, -45.9], [168.3, -44], [170.5, -42.5],
  ],
  // Greater Antilles
  [
    [-85, 22.5], [-79, 23], [-75, 21], [-71, 19.5], [-68, 18.5],
    [-70, 17.8], [-74, 19], [-78, 21], [-84, 21.3],
  ],
]

function isLand(lon: number, lat: number): boolean {
  for (const poly of LANDMASSES) {
    let inside = false
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const [xi, yi] = poly[i]
      const [xj, yj] = poly[j]
      if (yi > lat !== yj > lat && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) {
        inside = !inside
      }
    }
    if (inside) return true
  }
  return false
}

/** Single-path dot matrix of the world — computed once at module load. */
const DOT_GRID_PATH: string = (() => {
  const r = DOT_RADIUS
  const cmds: string[] = []
  for (let py = DOT_SPACING / 2; py < VIEW_H; py += DOT_SPACING) {
    for (let px = DOT_SPACING / 2; px < VIEW_W; px += DOT_SPACING) {
      const lon = (px / VIEW_W) * 360 - 180
      const lat = LAT_TOP - (py / VIEW_H) * LAT_SPAN
      if (isLand(lon, lat)) {
        cmds.push(`M${rnd(px - r)} ${rnd(py)}a${r} ${r} 0 1 0 ${r * 2} 0a${r} ${r} 0 1 0 ${-r * 2} 0`)
      }
    }
  }
  return cmds.join('')
})()

interface Pin {
  name: string
  cx: number
  cy: number
  flip: boolean
}

interface Arc {
  name: string
  d: string
  dur: number
}

const PINS: readonly Pin[] = cities.map((c) => ({
  name: c.name,
  cx: rnd((c.x / 100) * VIEW_W),
  cy: rnd((c.y / 100) * VIEW_H),
  flip: c.x > LABEL_FLIP_X,
}))

const HUB: Pin = PINS[0] ?? { name: '', cx: 0, cy: 0, flip: false }

const ARCS: readonly Arc[] = PINS.slice(1).map((p) => {
  const dist = Math.hypot(p.cx - HUB.cx, p.cy - HUB.cy)
  const lift = Math.min(dist * 0.22, 90)
  const qx = (HUB.cx + p.cx) / 2
  const qy = Math.max((HUB.cy + p.cy) / 2 - lift, 14)
  return {
    name: p.name,
    d: `M ${HUB.cx} ${HUB.cy} Q ${rnd(qx)} ${rnd(qy)} ${p.cx} ${p.cy}`,
    dur: rnd(2.6 + dist / 260),
  }
})

export interface WorldMapProps {
  animate?: boolean
  continentColor?: string
  className?: string
}

export function WorldMap({ animate = true, continentColor = '#22343a', className }: WorldMapProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const animated = animate && !prefersReducedMotion

  if (PINS.length === 0) return null

  return (
    <div ref={ref} className={className}>
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        preserveAspectRatio="xMidYMid meet"
        className="block h-auto w-full"
        style={{ color: continentColor }}
        role="img"
        aria-label="World map showing HAELO's global network, connected through Hong Kong"
      >
        {/* Continents — dot matrix, tinted via currentColor */}
        <path d={DOT_GRID_PATH} fill="currentColor" fillOpacity={0.9} />

        {/* Connection arcs */}
        <g fill="none" strokeLinecap="round">
          {ARCS.map((arc, i) =>
            animated ? (
              <motion.path
                key={arc.name}
                d={arc.d}
                stroke={EMBER}
                strokeOpacity={0.5}
                strokeWidth={1}
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 1.1, delay: 0.55 + i * 0.14, ease: 'easeInOut' }}
              />
            ) : (
              <path key={arc.name} d={arc.d} stroke={EMBER} strokeOpacity={0.5} strokeWidth={1} />
            ),
          )}
        </g>

        {/* Traveling dots along arcs */}
        {animated && inView && (
          <g>
            {ARCS.map((arc, i) => (
              <circle key={`traveler-${arc.name}`} r={1.6} fill={EMBER} opacity={0}>
                <animateMotion dur={`${arc.dur}s`} begin={`${2 + i * 0.4}s`} repeatCount="indefinite" path={arc.d} />
                <animate
                  attributeName="opacity"
                  values="0;0.9;0.9;0"
                  keyTimes="0;0.08;0.85;1"
                  dur={`${arc.dur}s`}
                  begin={`${2 + i * 0.4}s`}
                  repeatCount="indefinite"
                />
              </circle>
            ))}
          </g>
        )}

        {/* City pins and labels */}
        {PINS.map((pin, i) => {
          const isHub = i === 0
          const coreR = isHub ? 4.6 : 3.1
          const labelOpacity = isHub ? 0.78 : 0.55
          const labelX = pin.cx + (pin.flip ? -12 : 12)
          const labelY = pin.cy + 3.5

          return (
            <g key={pin.name}>
              {/* Pulsing halo */}
              {animated && (
                <motion.circle
                  cx={pin.cx}
                  cy={pin.cy}
                  fill="none"
                  stroke={EMBER}
                  strokeWidth={1}
                  initial={{ r: coreR, opacity: 0 }}
                  animate={inView ? { r: [coreR, coreR + 12], opacity: [0.45, 0] } : { opacity: 0 }}
                  transition={{ duration: 2.6, delay: 1 + i * 0.3, repeat: Infinity, repeatDelay: 0.9, ease: 'easeOut' }}
                />
              )}

              {/* Hub outer ring */}
              {isHub &&
                (animated ? (
                  <motion.circle
                    cx={pin.cx}
                    cy={pin.cy}
                    r={8.5}
                    fill="none"
                    stroke={EMBER}
                    strokeOpacity={0.35}
                    strokeWidth={1}
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
                  />
                ) : (
                  <circle cx={pin.cx} cy={pin.cy} r={8.5} fill="none" stroke={EMBER} strokeOpacity={0.35} strokeWidth={1} />
                ))}

              {/* Core dot */}
              {animated ? (
                <motion.circle
                  cx={pin.cx}
                  cy={pin.cy}
                  fill={EMBER}
                  initial={{ r: 0, opacity: 0 }}
                  animate={inView ? { r: coreR, opacity: 1 } : { r: 0, opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.08, ease: 'easeOut' }}
                />
              ) : (
                <circle cx={pin.cx} cy={pin.cy} r={coreR} fill={EMBER} />
              )}

              {/* Label */}
              {animated ? (
                <motion.text
                  x={labelX}
                  y={labelY}
                  textAnchor={pin.flip ? 'end' : 'start'}
                  className="font-sans"
                  fontSize={10}
                  letterSpacing="0.18em"
                  fill="currentColor"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: labelOpacity } : { opacity: 0 }}
                  transition={{ duration: 0.7, delay: 0.35 + i * 0.08, ease: 'easeOut' }}
                >
                  {pin.name.toUpperCase()}
                </motion.text>
              ) : (
                <text
                  x={labelX}
                  y={labelY}
                  textAnchor={pin.flip ? 'end' : 'start'}
                  className="font-sans"
                  fontSize={10}
                  letterSpacing="0.18em"
                  fill="currentColor"
                  opacity={labelOpacity}
                >
                  {pin.name.toUpperCase()}
                </text>
              )}
            </g>
          )
        })}
      </svg>
    </div>
  )
}
