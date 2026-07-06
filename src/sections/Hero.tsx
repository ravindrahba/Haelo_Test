import { useCallback, useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { heroSlides } from '@/data/site'
import { Eyebrow } from '@/components/Eyebrow'

const SLIDE_DURATION_MS = 6000
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

type Slide = (typeof heroSlides)[number]

export function Hero() {
  const reduceMotion = useReducedMotion() ?? false
  const sectionRef = useRef<HTMLElement | null>(null)
  const pausedRef = useRef(false)

  const [active, setActive] = useState(0)
  const slide: Slide = heroSlides[active]

  /* Autoplay — rAF-driven so the progress ring pauses precisely on hover */
  const progress = useMotionValue(0)

  const goTo = useCallback(
    (index: number) => {
      progress.set(0)
      setActive(((index % heroSlides.length) + heroSlides.length) % heroSlides.length)
    },
    [progress],
  )

  useEffect(() => {
    if (reduceMotion) return

    let raf = 0
    let last: number | null = null

    const loop = (now: number) => {
      if (last !== null && !pausedRef.current) {
        const delta = Math.min(now - last, 100)
        const next = progress.get() + delta / SLIDE_DURATION_MS
        if (next >= 1) {
          progress.set(0)
          setActive((i) => (i + 1) % heroSlides.length)
        } else {
          progress.set(next)
        }
      }
      last = now
      raf = requestAnimationFrame(loop)
    }

    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [progress, reduceMotion])

  /* Scroll parallax */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '10%'])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.06])
  const fgOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])
  const fgY = useTransform(scrollYProgress, [0, 1], ['0%', '-8%'])

  const lineVariants: Variants = reduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.01 } },
        exit: { opacity: 0, transition: { duration: 0.01 } },
      }
    : {
        hidden: { y: '112%' },
        visible: (i: number) => ({
          y: '0%',
          transition: { duration: 1.05, ease: EASE, delay: 0.18 + i * 0.1 },
        }),
        exit: { y: '-112%', transition: { duration: 0.5, ease: EASE } },
      }

  const softVariants: Variants = reduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.01 } },
        exit: { opacity: 0, transition: { duration: 0.01 } },
      }
    : {
        hidden: { opacity: 0, y: 28 },
        visible: (delay: number) => ({
          opacity: 1,
          y: 0,
          transition: { duration: 0.9, ease: EASE, delay },
        }),
        exit: { opacity: 0, transition: { duration: 0.3, ease: 'easeOut' } },
      }

  const imageTransition = reduceMotion
    ? { opacity: { duration: 0.01 } }
    : {
        opacity: { duration: 1.4, ease: EASE },
        scale: { duration: 9, ease: 'linear' as const },
      }

  return (
    <section
      ref={sectionRef}
      aria-roledescription="carousel"
      aria-label="HAELO introduction"
      className="relative min-h-[100svh] overflow-hidden bg-teal"
      onMouseEnter={() => {
        pausedRef.current = true
      }}
      onMouseLeave={() => {
        pausedRef.current = false
      }}
    >
      {/* Background — parallax wrapper > crossfading Ken Burns slides */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0"
        style={reduceMotion ? undefined : { y: bgY, scale: bgScale }}
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={slide.id}
            className="absolute inset-0 will-change-transform"
            initial={{ opacity: 0, scale: reduceMotion ? 1 : 1.03 }}
            animate={{ opacity: 1, scale: reduceMotion ? 1 : 1.09 }}
            exit={{ opacity: 0 }}
            transition={imageTransition}
          >
            <img
              src={slide.image}
              alt=""
              className="h-full w-full object-cover"
              loading={active === 0 ? 'eager' : 'lazy'}
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>

        {/* Scrims — left-weighted + bottom, keeps type legible on any photo */}
        <div className="absolute inset-0 bg-gradient-to-r from-teal/95 via-teal/55 to-teal/15" />
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-teal/85 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-teal/60 to-transparent" />
      </motion.div>

      {/* Foreground content */}
      <motion.div
        className="relative z-10 flex min-h-[100svh] items-center"
        style={reduceMotion ? undefined : { opacity: fgOpacity, y: fgY }}
      >
        <div className="container-edge w-full">
          <div className="mx-auto w-full max-w-[1600px] pb-40 pt-36 md:pb-48 md:pt-32">
            <AnimatePresence mode="wait" initial={true}>
              <motion.div key={slide.id} initial="hidden" animate="visible" exit="exit" className="max-w-4xl">
                {/* Kicker */}
                {slide.lead && (
                  <div className="mb-6 overflow-hidden md:mb-8">
                    <motion.div variants={softVariants} custom={0.05}>
                      <Eyebrow tick>{slide.lead}</Eyebrow>
                    </motion.div>
                  </div>
                )}

                {/* Headline — masked per-line reveal with a premium gradient sheen */}
                <h1 className="font-display text-hero font-medium uppercase leading-[0.95] tracking-tight">
                  {slide.lines.map((line, i) => (
                    <span key={`${slide.id}-line-${i}`} className="-mb-[0.09em] block overflow-hidden pb-[0.09em]">
                      <motion.span
                        custom={i}
                        variants={lineVariants}
                        className={`block will-change-transform ${i === slide.accent ? 'text-sheen-ember' : 'text-sheen-mist'}`}
                      >
                        {line}
                      </motion.span>
                    </span>
                  ))}
                </h1>

                {/* Caption */}
                {slide.caption && (
                  <motion.p
                    variants={softVariants}
                    custom={0.55}
                    className="mt-7 max-w-xl font-sans text-base leading-relaxed text-mist-200/90 md:mt-9 md:text-lg"
                  >
                    {slide.caption}
                  </motion.p>
                )}

                {/* Bullets */}
                {slide.bullets && slide.bullets.length > 0 && (
                  <ul className="mt-7 space-y-3 md:mt-8">
                    {slide.bullets.map((bullet, i) => (
                      <motion.li
                        key={`${slide.id}-bullet-${i}`}
                        variants={softVariants}
                        custom={0.68 + i * 0.09}
                        className="flex items-start gap-3 font-sans text-sm text-mist-200/85 md:text-base"
                      >
                        <svg
                          viewBox="0 0 12 12"
                          className="mt-[0.35em] h-3 w-3 flex-none text-ember"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={1.75}
                          aria-hidden="true"
                        >
                          <path d="M2 6.5 4.6 9 10 3.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>{bullet}</span>
                      </motion.li>
                    ))}
                  </ul>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Bottom bar — scroll cue (left) + indicator dots (center) */}
      <div className="absolute inset-x-0 bottom-0 z-20 pb-8 md:pb-10">
        <div className="container-edge relative">
          <div className="mx-auto w-full max-w-[1600px]">
            {/* Scroll cue */}
            <motion.a
              href="#main"
              aria-label="Scroll to content"
              className="group hidden items-center gap-3 md:inline-flex"
              style={reduceMotion ? undefined : { opacity: fgOpacity }}
            >
              <span className="font-sans text-[10px] uppercase tracking-eyebrow text-mist/60 transition-colors duration-300 group-hover:text-mist">
                Scroll
              </span>
              <span className="relative block h-px w-14 overflow-hidden bg-mist/20">
                {!reduceMotion && (
                  <motion.span
                    className="absolute inset-y-0 left-0 w-full bg-ember"
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ duration: 2.4, ease: EASE, repeat: Infinity, repeatDelay: 0.6 }}
                  />
                )}
              </span>
              <motion.span
                animate={reduceMotion ? undefined : { y: [0, 5, 0] }}
                transition={{ duration: 2.2, ease: 'easeInOut', repeat: Infinity }}
                className="text-ember"
              >
                <ArrowDown className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
              </motion.span>
            </motion.a>

            {/* Indicator dots */}
            <div role="tablist" aria-label="Hero slides" className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-4">
              {heroSlides.map((s, i) => {
                const isActive = i === active
                return (
                  <button
                    key={s.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Go to slide ${i + 1} of ${heroSlides.length}: ${s.lead ?? s.lines[0]}`}
                    onClick={() => goTo(i)}
                    className="group relative flex h-8 w-8 items-center justify-center"
                  >
                    {isActive && (
                      <svg viewBox="0 0 32 32" className="absolute inset-0 h-8 w-8 -rotate-90" aria-hidden="true">
                        <circle cx="16" cy="16" r="13.5" fill="none" strokeWidth="1.25" className="stroke-mist/20" />
                        <motion.circle
                          cx="16"
                          cy="16"
                          r="13.5"
                          fill="none"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          className="stroke-ember"
                          style={{ pathLength: reduceMotion ? 1 : progress }}
                        />
                      </svg>
                    )}
                    <span
                      className={`block rounded-full transition-all duration-500 ${
                        isActive ? 'h-2 w-2 bg-ember' : 'h-1.5 w-1.5 bg-mist/40 group-hover:bg-mist/75'
                      }`}
                    />
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
