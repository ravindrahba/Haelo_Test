import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectFade, Autoplay } from 'swiper/modules'
import type { Swiper as SwiperClass } from 'swiper'
import { ArrowDown } from 'lucide-react'
import { heroSlides } from '@/data/site'
import { isRevealed, onRevealed } from '@/lib/reveal'
import 'swiper/css'
import 'swiper/css/effect-fade'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]
const RING_R = 13.5
const RING_C = 2 * Math.PI * RING_R

// Headline size for a slide: `px` is the design's size on a 1920 canvas, so the
// `vw` term (px/19.2) reproduces it exactly at 1920 and the rem cap holds it
// there on wider screens. Mobile floor stays at 1.75rem for every slide.
function heroFont(px: number): string {
  return `clamp(1.75rem, ${(px / 19.2).toFixed(4)}vw, ${(px / 16).toFixed(4)}rem)`
}

export function Hero() {
  const reduce = useReducedMotion() ?? false
  const [active, setActive] = useState(0)
  const swiperRef = useRef<SwiperClass | null>(null)
  const ringRef = useRef<SVGCircleElement | null>(null)
  const multi = heroSlides.length > 1

  // Slide 1 must get its FULL autoplay window on screen. Swiper's timer starts
  // at mount — under the preloader — so without this hold, the first slide's
  // time was part-spent before the curtain lifted (it only ran full-length
  // from the second loop). Autoplay is stopped at init and started the moment
  // the preloader has fully dissolved.
  useEffect(() => {
    return onRevealed(() => {
      swiperRef.current?.autoplay?.start()
    })
  }, [])

  const wordVariants: Variants = reduce
    ? { hide: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.01 } } }
    : {
        hide: { y: '0.5em', opacity: 0 },
        show: (i: number) => ({ y: 0, opacity: 1, transition: { duration: 0.7, ease: EASE, delay: 0.35 + i * 0.06 } }),
      }

  const softVariants: Variants = reduce
    ? { hide: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.01 } } }
    : {
        hide: { opacity: 0, y: 18 },
        show: (delay: number) => ({ opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE, delay } }),
      }

  return (
    <section aria-roledescription="carousel" aria-label="HAELO introduction" className="relative min-h-[100svh] overflow-hidden bg-teal">
      <Swiper
        modules={[EffectFade, Autoplay]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={1600}
        rewind={multi}
        autoplay={multi ? { delay: 6000, disableOnInteraction: false } : false}
        allowTouchMove={multi}
        className="h-[100svh] w-full"
        onSwiper={(s) => {
          swiperRef.current = s
          // Hold the timer while the preloader still covers the hero; the
          // onRevealed subscription above starts it once the site is visible.
          if (!isRevealed()) s.autoplay?.stop()
        }}
        onSlideChange={(s) => setActive(s.realIndex)}
        onAutoplayTimeLeft={(_s, _time, progress) => {
          if (ringRef.current) ringRef.current.style.strokeDashoffset = String(RING_C * progress)
        }}
      >
        {heroSlides.map((slide, i) => {
          const isActive = active === i
          const alignRight = slide.align === 'right'
          let wordCounter = 0

          return (
            <SwiperSlide key={slide.id} className="relative">
              {/* Image + slow Ken Burns */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.img
                  src={slide.image}
                  alt=""
                  // Portrait crop keeps the subject's face in frame on mobile;
                  // desktop shows the full 16:9 and stays centred.
                  className="h-full w-full object-cover [object-position:var(--focus)] md:[object-position:50%_50%]"
                  style={{ '--focus': slide.focusMobile ?? '50% 50%' } as CSSProperties}
                  draggable={false}
                  initial={{ scale: reduce ? 1 : 1.05, x: '0%', y: '0%' }}
                  animate={{
                    scale: reduce ? 1 : isActive ? 1.2 : 1.05,
                    x: reduce ? '0%' : isActive ? '-1.4%' : '0%',
                    y: reduce ? '0%' : isActive ? '-1%' : '0%',
                  }}
                  transition={{ duration: 11, ease: 'linear' }}
                />
                {/* No scrim on desktop — the original design lays the copy straight
                    onto the photograph (feedback PDF p3: "remove the gradient and
                    use the original colors throughout").
                    Mobile keeps a flat tint: the type centres over the busiest part
                    of the frame there and is otherwise unreadable. */}
                <div className="absolute inset-0 bg-teal/35 md:hidden" />
              </div>

              {/* Content */}
              <div className="relative z-10 flex min-h-[100svh] items-center">
                <div className="container-edge w-full">
                  <div className={`mx-auto flex w-full max-w-[1600px] justify-center ${alignRight ? 'md:justify-end' : 'md:justify-start'}`}>
                    {/* Desktop offsets reconcile our 1600px container gutter with the
                        design's: at a 1920 canvas the original sits 13.6px further
                        out and 52px above centre. */}
                    <div
                      className={`text-center md:-translate-y-[52px] ${
                        alignRight ? 'md:text-right md:translate-x-[13.6px]' : 'md:text-left md:-translate-x-[13.6px]'
                      }`}
                      style={{ '--hl': heroFont(slide.sizePx ?? 94.36) } as CSSProperties}
                    >
                      {/* Size + leading are per-slide, measured from each original
                          hero (slide 1 = 94.36/0.771, slide 2 = 82/0.846). */}
                      <h1
                        className="font-display uppercase tracking-normal"
                        style={{ fontSize: heroFont(slide.sizePx ?? 94.36), lineHeight: slide.lh ?? 0.771 }}
                      >
                        {slide.lines.map((line, li) => {
                          const words = line.text.split(' ')
                          return (
                            <span
                              key={li}
                              className="block whitespace-nowrap md:[transform:translateX(var(--n))]"
                              style={{ '--n': `${line.nudge ?? 0}em` } as CSSProperties}
                            >
                              {words.map((w, wi) => {
                                const idx = wordCounter++
                                return (
                                  <motion.span
                                    key={wi}
                                    custom={idx}
                                    variants={wordVariants}
                                    initial="hide"
                                    animate={isActive ? 'show' : 'hide'}
                                    className={`inline-block will-change-transform ${line.ember ? 'text-[#F1AE6F]' : 'text-[#E9E2D3]'} ${
                                      line.weight === 'regular' ? 'font-normal' : 'font-light'
                                    }`}
                                  >
                                    {wi < words.length - 1 ? `${w} ` : w}
                                  </motion.span>
                                )
                              })}
                            </span>
                          )
                        })}
                      </h1>

                      {slide.caption && (
                        <motion.p
                          custom={0.35 + wordCounter * 0.06}
                          variants={softVariants}
                          initial="hide"
                          animate={isActive ? 'show' : 'hide'}
                          className="mx-auto mt-6 max-w-md text-center font-sans font-light tracking-[0.045em] text-[#EBE2D0] leading-relaxed md:mt-8 md:max-w-none md:text-center md:leading-[1.2] md:text-[clamp(1rem,1.612vw,1.9344rem)]"
                        >
                          {slide.caption.map((c, ci) => (
                            <span key={ci} className="inline md:block">
                              {c}{' '}
                            </span>
                          ))}
                        </motion.p>
                      )}

                      {slide.bullets && (
                        <motion.div
                          custom={0.35 + wordCounter * 0.06}
                          variants={softVariants}
                          initial="hide"
                          animate={isActive ? 'show' : 'hide'}
                          className={`mt-7 flex w-fit items-center gap-4 md:mt-9 md:gap-5 ${
                            alignRight ? 'mx-auto md:ml-auto md:mr-0' : 'mx-auto md:mr-auto md:ml-[calc(var(--hl)*4.8)]'
                          }`}
                        >
                          {/* Single ember dash marker to the left of the block, as
                              in the original design (not a per-item checkmark). */}
                          <span className="h-px w-8 shrink-0 bg-ember md:w-10" aria-hidden="true" />
                          <ul className="space-y-1 text-left font-sans text-sm font-light leading-relaxed tracking-[0.045em] text-[#EBE2D0] md:text-base">
                            {slide.bullets.map((b, bi) => (
                              <li key={bi}>{b}</li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>

      {/* Bottom bar — scroll cue (left) + indicator dots (centre) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 pb-8 md:pb-10">
        <div className="container-edge relative">
          <div className="mx-auto w-full max-w-[1600px]">
            <div className="hidden items-center gap-3 md:flex">
              <span className="font-sans text-[10px] uppercase tracking-eyebrow text-mist/60">Scroll</span>
              <span className="relative block h-px w-14 overflow-hidden bg-mist/20">
                {!reduce && (
                  <motion.span
                    className="absolute inset-y-0 left-0 w-full bg-ember"
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ duration: 2.4, ease: EASE, repeat: Infinity, repeatDelay: 0.6 }}
                  />
                )}
              </span>
              <ArrowDown className="h-4 w-4 text-ember" strokeWidth={1.5} aria-hidden="true" />
            </div>

            <div
              role="tablist"
              aria-label="Hero slides"
              className={`pointer-events-auto absolute inset-x-0 bottom-0 items-center justify-center gap-4 ${multi ? 'flex' : 'hidden'}`}
            >
              {heroSlides.map((s, i) => {
                const isActive = i === active
                return (
                  <button
                    key={s.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Go to slide ${i + 1} of ${heroSlides.length}`}
                    onClick={() => swiperRef.current?.slideTo(i)}
                    className="group relative flex h-8 w-8 items-center justify-center"
                  >
                    {isActive && (
                      <svg viewBox="0 0 32 32" className="absolute inset-0 h-8 w-8 -rotate-90" aria-hidden="true">
                        <circle cx="16" cy="16" r={RING_R} fill="none" strokeWidth="1.25" className="stroke-mist/25" />
                        <circle
                          ref={ringRef}
                          cx="16"
                          cy="16"
                          r={RING_R}
                          fill="none"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          className="stroke-ember"
                          strokeDasharray={RING_C}
                          strokeDashoffset={RING_C}
                        />
                      </svg>
                    )}
                    <span
                      className={`block rounded-full transition-all duration-500 ${isActive ? 'h-2 w-2 bg-ember' : 'h-1.5 w-1.5 bg-mist/40 group-hover:bg-mist/75'}`}
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
