import { useRef, useState, type ReactNode } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

export interface SectionBgProps {
  src: string
  /** Optional responsive candidates for the <img>. */
  srcSet?: string
  alt?: string
  /**
   * Legibility scrim over the image. 'teal' and 'dark' are directional gradients
   * that suit copy set to one side; 'teal-flat' is an even veil for copy centred
   * over a bright frame.
   */
  overlay?: 'teal' | 'teal-flat' | 'dark' | 'light' | 'none'
  /** Scales overlay opacity. */
  intensity?: 'soft' | 'strong'
  /** Applied to the relatively-positioned container (size it here). */
  className?: string
  children?: ReactNode
  rounded?: boolean
}

type OverlayVariant = Exclude<NonNullable<SectionBgProps['overlay']>, 'none'>
type Intensity = NonNullable<SectionBgProps['intensity']>

const OVERLAY_CLASSES: Record<OverlayVariant, Record<Intensity, string>> = {
  teal: {
    soft: 'bg-gradient-to-tr from-teal/70 via-teal/30 to-transparent',
    strong: 'bg-gradient-to-tr from-teal/85 via-teal/50 to-teal/10',
  },
  'teal-flat': {
    soft: 'bg-teal/45',
    strong: 'bg-teal/65',
  },
  dark: {
    soft: 'bg-gradient-to-tr from-black/70 via-black/40 to-black/10',
    strong: 'bg-gradient-to-tr from-black/85 via-black/60 to-black/25',
  },
  light: {
    soft: 'bg-mist/25',
    strong: 'bg-mist/45',
  },
}

function cx(...classes: Array<string | false | undefined>): string {
  return classes.filter(Boolean).join(' ')
}

export function SectionBg({ src, srcSet, alt = '', overlay = 'teal', intensity = 'soft', className, children, rounded = false }: SectionBgProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  // Lazy images used to pop in mid-scroll; hold at opacity 0 until decoded,
  // then fade. `complete` in the ref callback covers the already-cached case.
  const [loaded, setLoaded] = useState(false)

  // Progress is 0 when the section's top meets the viewport bottom, 1 when its
  // bottom meets the viewport top — motion is tied directly to scroll, so it is
  // continuous and can never snap.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  // GPU-friendly drift + zoom. The generous base scale guarantees the vertical
  // travel never exposes the image edges while giving a richer parallax feel.
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1.14, 1.28])

  return (
    <div ref={ref} className={cx('relative', rounded && 'rounded-sm overflow-hidden', className)}>
      <div className="absolute inset-0 overflow-hidden">
        <motion.div className="absolute inset-0" style={prefersReducedMotion ? undefined : { y, scale, willChange: 'transform' }}>
          <img
            src={src}
            srcSet={srcSet}
            sizes={srcSet ? '100vw' : undefined}
            alt={alt}
            // Eager: fetch at page mount so imagery is already in place when
            // the user scrolls to it (lazy loading read as popping in).
            draggable={false}
            onLoad={() => setLoaded(true)}
            ref={(el) => {
              if (el && el.complete && el.naturalWidth > 0) setLoaded(true)
            }}
            className={cx(
              'h-full w-full object-cover object-center select-none transition-opacity duration-[900ms] ease-out',
              loaded ? 'opacity-100' : 'opacity-0',
            )}
          />
        </motion.div>
        {overlay !== 'none' && <div aria-hidden="true" className={cx('pointer-events-none absolute inset-0', OVERLAY_CLASSES[overlay][intensity])} />}
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  )
}
