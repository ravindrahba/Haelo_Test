import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion, useMotionValue, animate } from 'framer-motion'

/**
 * Preloader — HAELO by HBA
 *
 * Full-screen intro overlay shown on first load. A dark teal mesh panel carries
 * the logo and a slim ember progress bar driven by *real* readiness (fonts +
 * window load), clamped between a minimum display time (so the entrance feels
 * intentional) and a maximum cap (so it never hangs). Once full, it holds a
 * beat, then the panel lifts away like a curtain to reveal the hero beneath.
 */

const EASE_LUXE: [number, number, number, number] = [0.16, 1, 0.3, 1]
const EASE_CRAWL: [number, number, number, number] = [0.22, 1, 0.36, 1]

const MIN_DISPLAY_MS = 1600
const MIN_DISPLAY_REDUCED_MS = 800
const MAX_DISPLAY_MS = 3500
const HOLD_AT_FULL_MS = 250
const HOLD_AT_FULL_REDUCED_MS = 80

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

function whenFontsReady(): Promise<void> {
  if ('fonts' in document) {
    return document.fonts.ready.then(() => undefined)
  }
  return Promise.resolve()
}

function whenWindowLoaded(): Promise<void> {
  if (document.readyState === 'complete') {
    return Promise.resolve()
  }
  return new Promise((resolve) => {
    window.addEventListener('load', () => resolve(), { once: true })
  })
}

export function Preloader({ onComplete }: { onComplete?: () => void }) {
  const reducedMotion = useReducedMotion()
  const [visible, setVisible] = useState(true)
  const [percent, setPercent] = useState(0)

  const progress = useMotionValue(0)
  const holdTimerRef = useRef<number | null>(null)

  useEffect(() => {
    const unsubscribe = progress.on('change', (value: number) => {
      setPercent(Math.max(0, Math.min(100, Math.round(value * 100))))
    })
    return unsubscribe
  }, [progress])

  useEffect(() => {
    if (!visible) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [visible])

  useEffect(() => {
    let cancelled = false
    let finish: ReturnType<typeof animate> | null = null

    const crawl = animate(progress, 0.88, {
      duration: reducedMotion ? 0.6 : 3.1,
      ease: EASE_CRAWL,
    })

    const assetsReady = Promise.all([whenFontsReady(), whenWindowLoaded()]).then(() => undefined)
    const minDisplay = delay(reducedMotion ? MIN_DISPLAY_REDUCED_MS : MIN_DISPLAY_MS)
    const maxCap = delay(MAX_DISPLAY_MS)

    const gate = Promise.race([Promise.all([assetsReady, minDisplay]).then(() => undefined), maxCap])

    void gate.then(() => {
      if (cancelled) return
      crawl.stop()
      finish = animate(progress, 1, {
        duration: reducedMotion ? 0.2 : 0.55,
        ease: EASE_LUXE,
        onComplete: () => {
          holdTimerRef.current = window.setTimeout(
            () => {
              if (!cancelled) setVisible(false)
            },
            reducedMotion ? HOLD_AT_FULL_REDUCED_MS : HOLD_AT_FULL_MS,
          )
        },
      })
    })

    return () => {
      cancelled = true
      crawl.stop()
      finish?.stop()
      if (holdTimerRef.current !== null) {
        window.clearTimeout(holdTimerRef.current)
      }
    }
  }, [progress, reducedMotion])

  return (
    <AnimatePresence onExitComplete={() => onComplete?.()}>
      {visible && (
        <motion.div
          key="haelo-preloader"
          role="status"
          aria-label="HAELO is loading"
          className="mesh-teal fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          exit={{ opacity: 0, transition: { duration: reducedMotion ? 0.4 : 3.5, ease: 'easeInOut' } }}
        >
          <motion.div
            className="flex flex-col items-center"
            exit={{ opacity: 0, scale: reducedMotion ? 1 : 1.03, transition: { duration: reducedMotion ? 0.3 : 2.8, ease: 'easeInOut' } }}
          >
            <motion.img
              src="/brand/logo-white.png"
              alt="HAELO by HBA"
              draggable={false}
              className="h-[72px] w-auto select-none"
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 10 }}
              animate={
                reducedMotion
                  ? { opacity: 1, transition: { duration: 0.3, ease: 'easeOut' } }
                  : { opacity: 1, scale: 1, y: 0, transition: { duration: 1.1, ease: EASE_LUXE } }
              }
            />

            <motion.div
              className="mt-10 w-[240px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.8, delay: reducedMotion ? 0 : 0.35, ease: 'easeOut' } }}
            >
              <div
                role="progressbar"
                aria-label="Loading progress"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={percent}
                className="h-px w-full overflow-hidden bg-mist/20"
              >
                <motion.div className="h-full w-full bg-ember" style={{ scaleX: progress, transformOrigin: '0% 50%' }} />
              </div>

              <div className="mt-4 flex items-baseline justify-between">
                <span className="text-[10px] uppercase tracking-eyebrow text-mist/50">Loading</span>
                <span className="text-[10px] uppercase tracking-eyebrow tabular-nums text-mist/70">{String(percent).padStart(2, '0')}</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
