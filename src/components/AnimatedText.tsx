import { Fragment } from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'

export interface AnimatedTextProps {
  /** The text to animate. May contain '\n' for explicit line breaks. */
  text: string
  /** Semantic tag to render. */
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  /** Unit of animation. */
  by?: 'word' | 'line' | 'char'
  className?: string
  /** Delay (s) before the first unit begins. */
  delay?: number
  /** Stagger (s) between units. Defaults: word 0.045, line 0.09, char 0.02. */
  stagger?: number
  /** Animate only the first time it enters the viewport. */
  once?: boolean
}

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const DEFAULT_STAGGER: Record<NonNullable<AnimatedTextProps['by']>, number> = {
  word: 0.045,
  line: 0.09,
  char: 0.02,
}

const unitVariants: Variants = {
  hidden: { y: '0.4em', opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 1.1, ease: EASE } },
}

const motionTags = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  span: motion.span,
} as const

function splitWords(line: string): string[] {
  return line.split(/\s+/).filter((word) => word.length > 0)
}

export function AnimatedText({ text, as = 'h2', by = 'word', className, delay = 0, stagger, once = true }: AnimatedTextProps) {
  const prefersReducedMotion = useReducedMotion()
  const lines = text.split('\n')

  if (prefersReducedMotion) {
    const Tag = as
    return (
      <Tag className={className}>
        {lines.map((line, i) => (
          <Fragment key={`${line}-${i}`}>
            {i > 0 && <br />}
            {line}
          </Fragment>
        ))}
      </Tag>
    )
  }

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger ?? DEFAULT_STAGGER[by], delayChildren: delay } },
  }

  const MotionTag = motionTags[as] as typeof motion.span

  return (
    // Same zero-inset trigger as <Reveal>: start the moment the element enters
    // the viewport, so headlines never pop in after their section.
    <MotionTag className={className} variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once }}>
      {by === 'line' &&
        lines.map((line, li) => (
          <motion.span key={`${line}-${li}`} className="block will-change-transform" variants={unitVariants}>
            {line}
          </motion.span>
        ))}

      {by === 'word' &&
        lines.map((line, li) => {
          const words = splitWords(line)
          return (
            <Fragment key={`line-${li}`}>
              {li > 0 && <br />}
              {words.map((word, wi) => (
                <Fragment key={`${word}-${wi}`}>
                  <motion.span className="inline-block will-change-transform" variants={unitVariants}>
                    {word}
                  </motion.span>
                  {wi < words.length - 1 ? ' ' : null}
                </Fragment>
              ))}
            </Fragment>
          )
        })}

      {by === 'char' &&
        lines.map((line, li) => {
          const words = splitWords(line)
          return (
            <Fragment key={`line-${li}`}>
              {li > 0 && <br />}
              {words.map((word, wi) => (
                <Fragment key={`${word}-${wi}`}>
                  <span className="inline-block whitespace-nowrap">
                    {Array.from(word).map((char, ci) => (
                      <motion.span key={`${char}-${ci}`} className="inline-block will-change-transform" variants={unitVariants}>
                        {char}
                      </motion.span>
                    ))}
                  </span>
                  {wi < words.length - 1 ? ' ' : null}
                </Fragment>
              ))}
            </Fragment>
          )
        })}
    </MotionTag>
  )
}
