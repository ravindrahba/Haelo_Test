import { PageHeader } from '@/components/PageHeader'
import { AnimatedText } from '@/components/AnimatedText'
import { Eyebrow } from '@/components/Eyebrow'
import { Reveal } from '@/components/Reveal'
import { TextLink } from '@/components/TextLink'
import { SectionBg } from '@/components/SectionBg'
import { founder } from '@/data/site'

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
                <Eyebrow>Our story</Eyebrow>
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

      {/* The stats band and the global-network map that sat here have moved to
          the About page (feedback PDF p39, p40). This page is itself hidden from
          the menu for now (p42). */}

      {/* Testimonial */}
      <section className="bg-mist-200 section-y">
        <div className="container-edge mx-auto grid max-w-[1600px] items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <SectionBg
              src="/images/doris.webp"
              srcSet="/images/doris@600.webp 600w, /images/doris.webp 900w"
              alt="Doris Li, Founder of HAELO"
              overlay="none"
              rounded
              className="aspect-[4/5]"
            />
          </Reveal>
          <div>
            <Reveal>
              <Eyebrow>A word from our founder</Eyebrow>
            </Reveal>
            <blockquote className="mt-8">
              <AnimatedText text={`“${founder.quote}”`} as="p" by="line" className="text-2xl leading-snug text-ink sm:text-3xl" />
              <Reveal delay={0.3}>
                <footer className="mt-8 flex items-baseline gap-3">
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
