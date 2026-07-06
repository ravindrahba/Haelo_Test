import { useRef, useState, type CSSProperties } from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectFade, Autoplay } from 'swiper/modules'
import type { Swiper as SwiperClass } from 'swiper'
import { ArrowDown } from 'lucide-react'
import { heroSlides } from '@/data/site'
import 'swiper/css'
import 'swiper/css/effect-fade'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]
const RING_R = 13.5
const RING_C = 2 * Math.PI * RING_R

export function Hero() {
  const reduce = useReducedMotion() ?? false
  const [active, setActive] = useState(0)
  const swiperRef = useRef<SwiperClass | null>(null)
  const ringRef = useRef<SVGCircleElement | null>(null)

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
        rewind
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        allowTouchMove
        className="h-[100svh] w-full"
        onSwiper={(s) => {
          swiperRef.current = s
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
                  className="h-full w-full object-cover"
                  draggable={false}
                  initial={{ scale: reduce ? 1 : 1.05, x: '0%', y: '0%' }}
                  animate={{
                    scale: reduce ? 1 : isActive ? 1.2 : 1.05,
                    x: reduce ? '0%' : isActive ? '-1.4%' : '0%',
                    y: reduce ? '0%' : isActive ? '-1%' : '0%',
                  }}
                  transition={{ duration: 11, ease: 'linear' }}
                />
                {/* Scrim — desktop: teal at half strength weighted to the text side */}
                <div className={`absolute inset-0 hidden md:block ${alignRight ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} from-teal/55 via-teal/18 to-transparent`} />
                {/* Mobile: gentle overall darkening so centred type stays legible */}
                <div className="absolute inset-0 bg-teal/35 md:hidden" />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-teal/40 to-transparent" />
                <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-teal/30 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative z-10 flex min-h-[100svh] items-center">
                <div className="container-edge w-full">
                  <div className={`mx-auto flex w-full max-w-[1600px] pt-16 justify-center ${alignRight ? 'md:justify-end' : 'md:justify-start'}`}>
                    <div className={`text-center ${alignRight ? 'md:text-right' : 'md:text-left'}`}>
                      <h1 className="font-display uppercase leading-[1.12] tracking-tight text-[clamp(1.75rem,6.5vw,4.2rem)]">
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
                                    className={`inline-block will-change-transform ${line.ember ? 'text-sheen-ember' : 'text-sheen-mist'} ${
                                      line.bold ? 'font-medium' : 'font-extralight'
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
                          className={`mx-auto mt-6 max-w-md text-center font-sans text-base font-light leading-relaxed text-mist md:mt-8 md:max-w-none md:text-lg ${
                            alignRight ? 'md:ml-auto' : ''
                          }`}
                        >
                          {slide.caption.map((c, ci) => (
                            <span key={ci} className="inline md:block">
                              {c}{' '}
                            </span>
                          ))}
                        </motion.p>
                      )}

                      {slide.bullets && (
                        <motion.ul
                          custom={0.35 + wordCounter * 0.06}
                          variants={softVariants}
                          initial="hide"
                          animate={isActive ? 'show' : 'hide'}
                          className="mx-auto mt-7 w-fit space-y-3 text-left md:mt-9"
                        >
                          {slide.bullets.map((b, bi) => (
                            <li key={bi} className="flex items-center gap-3 font-sans text-sm font-light text-mist md:text-base">
                              <svg viewBox="0 0 12 12" className="h-3 w-3 flex-none text-ember" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
                                <path d="M2 6.5 4.6 9 10 3.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                              <span>{b}</span>
                            </li>
                          ))}
                        </motion.ul>
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

            <div role="tablist" aria-label="Hero slides" className="pointer-events-auto absolute inset-x-0 bottom-0 flex items-center justify-center gap-4">
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
