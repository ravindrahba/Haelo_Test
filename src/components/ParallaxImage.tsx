import { useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { cn } from '@/lib/cn'

/**
 * An image that gently zooms and drifts as it scrolls through the viewport —
 * for inline "static" imagery (tiles, service blocks). The container clips; the
 * image is over-scaled so the vertical travel never exposes its edges.
 */
export function ParallaxImage({
  src,
  srcSet,
  alt = '',
  className,
  sizes,
}: {
  src: string
  srcSet?: string
  alt?: string
  className?: string
  sizes?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1.3])
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  // Lazy images used to pop in mid-scroll; hold at opacity 0 until decoded,
  // then fade. `complete` in the ref callback covers the already-cached case.
  const [loaded, setLoaded] = useState(false)

  // NB: the caller supplies positioning + sizing (e.g. `absolute inset-0`);
  // we only add clipping here so the two never fight over `position`.
  return (
    <div ref={ref} className={cn('overflow-hidden', className)}>
      <motion.img
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        // Eager: fetch at page mount so imagery is already in place when the
        // user scrolls to it — lazy loading made images visibly arrive
        // mid-scroll. The decode fade below still covers slow networks.
        draggable={false}
        onLoad={() => setLoaded(true)}
        ref={(el: HTMLImageElement | null) => {
          if (el && el.complete && el.naturalWidth > 0) setLoaded(true)
        }}
        style={reduce ? undefined : { scale, y, willChange: 'transform' }}
        className={cn(
          'absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-[900ms] ease-out',
          loaded ? 'opacity-100' : 'opacity-0',
        )}
      />
    </div>
  )
}
