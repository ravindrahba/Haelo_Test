import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

/** Wraps children so they gently pull toward the cursor on hover. */
export function Magnetic({ children, strength = 0.35 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 })

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength)
  }
  function reset() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={reset} style={{ x: sx, y: sy }} className="inline-flex">
      {children}
    </motion.div>
  )
}
