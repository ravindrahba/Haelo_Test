import { motion, useReducedMotion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  once?: boolean
  as?: 'div' | 'li' | 'span' | 'section'
}

/** Fade + rise into view. Collapses to a plain fade under reduced-motion. */
export function Reveal({ children, className, delay = 0, y = 28, once = true, as = 'div' }: RevealProps) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as]

  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y },
    show: {
      opacity: 1,
      y: 0,
      // Long, soft entrance — the fade should read as part of the scroll, not
      // an event that happens after arriving.
      transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1], delay },
    },
  }

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      // Zero inset: trigger the instant the element's edge crosses the fold.
      // The old -12% inset meant content travelled 12% of the screen while
      // still invisible, then popped on — the "suddenly appears then fades"
      // complaint. Note the hidden state's translateY(y) already shifts the
      // observed box down by ~y px, so even at zero margin the animation
      // starts a beat after the layout edge appears — any negative margin on
      // top of that reads as dead travel.
      viewport={{ once }}
    >
      {children}
    </MotionTag>
  )
}

/** Stagger container — pair with <Reveal> children for sequenced entrances. */
export function RevealGroup({
  children,
  className,
  stagger = 0.12,
  once = true,
}: {
  children: ReactNode
  className?: string
  stagger?: number
  once?: boolean
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once }}
      variants={{ show: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </motion.div>
  )
}
