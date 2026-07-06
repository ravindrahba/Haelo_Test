import { Eyebrow } from '@/components/Eyebrow'
import { Reveal } from '@/components/Reveal'
import { AnimatedText } from '@/components/AnimatedText'
import { TextLink } from '@/components/TextLink'
import { WorldMap } from '@/components/WorldMap'

export function GlobalReach() {
  return (
    <section className="section-y bg-mist">
      <div className="container-edge mx-auto max-w-[1600px]">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.6fr] lg:items-center">
          <div>
            <Reveal>
              <Eyebrow tick>Global Reach</Eyebrow>
            </Reveal>
            <AnimatedText as="h2" by="line" text={'Access talent\nwherever it exists.'} className="mt-6 text-4xl sm:text-6xl" />
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-lg text-muted">
                Creative talent moves across borders. We combine international reach with local market understanding to connect you with the best.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-10">
                <TextLink to="/network">Learn more</TextLink>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <WorldMap className="w-full" />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
