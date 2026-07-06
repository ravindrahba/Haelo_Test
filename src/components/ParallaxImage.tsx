import { useRef } from 'react'
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

  return (
    <div ref={ref} className={cn('relative overflow-hidden', className)}>
      <motion.img
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        loading="lazy"
        draggable={false}
        style={reduce ? undefined : { scale, y, willChange: 'transform' }}
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
    </div>
  )
}
