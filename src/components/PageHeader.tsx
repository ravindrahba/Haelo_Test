import { motion } from 'framer-motion'
import { Eyebrow } from './Eyebrow'
import { AnimatedText } from './AnimatedText'
import { SectionBg } from './SectionBg'

type Props = {
  eyebrow: string
  title: string
  intro?: string
  image?: string
}

/** Dark teal interior-page hero: smooth parallax image + alive word-reveal title. */
export function PageHeader({ eyebrow, title, intro, image }: Props) {
  const inner = (
    <div className="container-edge relative mx-auto max-w-[1600px] pb-20 pt-40 sm:pb-28 sm:pt-48">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
        <Eyebrow tick>{eyebrow}</Eyebrow>
      </motion.div>
      <AnimatedText as="h1" by="word" text={title} className="mt-6 max-w-4xl text-display" delay={0.15} />
      {intro && (
        <motion.p
          className="mt-8 max-w-2xl text-lg text-mist/75"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {intro}
        </motion.p>
      )}
    </div>
  )

  if (image) {
    return (
      <header className="text-mist">
        <SectionBg src={image} overlay="teal" intensity="strong">
          {inner}
        </SectionBg>
      </header>
    )
  }

  return <header className="relative overflow-hidden mesh-teal text-mist">{inner}</header>
}
