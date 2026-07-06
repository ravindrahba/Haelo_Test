import { PageHeader } from '@/components/PageHeader'
import { AnimatedText } from '@/components/AnimatedText'
import { Eyebrow } from '@/components/Eyebrow'
import { Reveal, RevealGroup } from '@/components/Reveal'
import { TextLink } from '@/components/TextLink'
import { WorldMap } from '@/components/WorldMap'
import { stats, founder } from '@/data/site'

export default function Insights() {
  return (
    <main>
      {/* Hero */}
      <PageHeader
        eyebrow="Insights"
        title="Creative transformation intelligence."
        intro="Perspectives on how talent shapes organisations, creativity and long-term business performance."
        image="/images/hero-2.webp"
      />

      {/* Our Story */}
      <section className="bg-mist section-y">
        <div className="container-edge mx-auto max-w-[1600px]">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Reveal>
                <Eyebrow tick>Our story</Eyebrow>
              </Reveal>
            </div>
            <div className="lg:col-span-8">
              <AnimatedText text="Born from HBA’s global design legacy." as="h2" by="word" className="text-display text-ink" />
              <Reveal delay={0.2}>
                <p className="mt-8 max-w-2xl text-lg font-light leading-relaxed text-muted">
                  HAELO exists to help creative organisations build the teams that shape their future — operating at the intersection of
                  design, talent and strategy, combining real industry expertise with a deep understanding of creative collaboration and
                  organisational culture.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mesh-teal bg-teal text-mist section-y">
        <div className="container-edge mx-auto max-w-[1600px]">
          <AnimatedText text="Our impact, by the numbers." as="h2" by="word" className="text-display text-mist" />
          <RevealGroup className="mt-16 grid grid-cols-2 gap-x-8 gap-y-14 md:mt-20 lg:grid-cols-4">
            {stats.map((stat) => (
              <Reveal key={stat.label} className="border-t border-mist/15 pt-6 md:pt-8">
                <p className="text-hero leading-none text-ember">{stat.value}</p>
                <p className="mt-4 text-sm font-light uppercase tracking-caps text-mist/70">{stat.label}</p>
              </Reveal>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Global Network */}
      <section className="bg-mist section-y">
        <div className="container-edge mx-auto max-w-[1600px]">
          <div className="max-w-3xl">
            <Reveal>
              <Eyebrow tick>Our global network</Eyebrow>
            </Reveal>
            <AnimatedText text="Talent moves across borders." as="h2" by="word" className="text-display text-ink" />
            <Reveal delay={0.2}>
              <p className="mt-8 text-lg font-light leading-relaxed text-muted">
                From Singapore to London, Dubai to Los Angeles — our network spans the studios, brands and cities where hospitality design
                is imagined and made.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.3} className="mt-14 md:mt-20">
            <WorldMap className="w-full" />
          </Reveal>
        </div>
      </section>

      {/* Testimonial */}
      <section className="bg-mist-200 section-y">
        <div className="container-edge mx-auto max-w-[1600px]">
          <div className="mx-auto max-w-4xl">
            <Reveal>
              <Eyebrow tick>A word from our founder</Eyebrow>
            </Reveal>
            <blockquote className="mt-10">
              <AnimatedText text={`“${founder.quote}”`} as="p" by="line" className="text-3xl leading-snug text-ink sm:text-4xl" />
              <Reveal delay={0.3}>
                <footer className="mt-10 flex items-baseline gap-3">
                  <cite className="text-base font-normal not-italic text-ink">{founder.name}</cite>
                  <span aria-hidden="true" className="h-px w-8 self-center bg-ember" />
                  <span className="text-sm font-light uppercase tracking-caps text-muted">{founder.role}</span>
                </footer>
              </Reveal>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="mesh-teal bg-teal-800 text-mist section-y">
        <div className="container-edge mx-auto max-w-[1600px]">
          <div className="flex flex-col items-start gap-10 md:flex-row md:items-end md:justify-between md:gap-16">
            <AnimatedText text="Interested in partnering with HAELO?" as="h2" by="word" className="max-w-3xl text-hero text-mist" />
            <Reveal delay={0.3} className="shrink-0 pb-2">
              <TextLink to="/contact" light>
                Start a conversation
              </TextLink>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  )
}
