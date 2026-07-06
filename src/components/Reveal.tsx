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
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay },
    },
  }

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: '-12% 0px -12% 0px' }}
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
      viewport={{ once, margin: '-10% 0px -10% 0px' }}
      variants={{ show: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </motion.div>
  )
}
