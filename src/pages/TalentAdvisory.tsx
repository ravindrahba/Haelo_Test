import { PageHeader } from '@/components/PageHeader'
import { AnimatedText } from '@/components/AnimatedText'
import { Eyebrow } from '@/components/Eyebrow'
import { Reveal, RevealGroup } from '@/components/Reveal'
import { TextLink } from '@/components/TextLink'
import { SectionBg } from '@/components/SectionBg'
import { advisoryServices } from '@/data/site'

export default function TalentAdvisory() {
  return (
    <main>
      {/* Hero */}
      <PageHeader
        eyebrow="Talent Advisory"
        title="Designing teams before hiring them."
        intro="The right hire starts with understanding what success requires. HAELO works with founders, CEOs and leadership teams to define the capabilities and leadership needed to support future growth."
        image="/images/service-advisory.webp"
      />

      {/* What we do */}
      <section className="bg-mist section-y">
        <div className="container-edge mx-auto max-w-[1600px]">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-4">
              <Reveal>
                <Eyebrow tick>What we do</Eyebrow>
              </Reveal>
            </div>
            <div className="lg:col-span-8">
              <AnimatedText
                as="h2"
                by="word"
                text="Building capability, not simply filling roles."
                className="max-w-[20ch] text-display text-ink"
              />
              <Reveal delay={0.2} className="mt-8 max-w-xl">
                <p className="text-base font-light leading-relaxed text-muted md:text-lg">
                  Before a search begins, the shape of the team must be right. We advise on structure, leadership and capability — so
                  every hire strengthens the whole.
                </p>
              </Reveal>
            </div>
          </div>

          <RevealGroup className="mt-20 grid gap-x-12 gap-y-16 sm:grid-cols-2 lg:mt-28 lg:grid-cols-3 lg:gap-x-16" stagger={0.08}>
            {advisoryServices.map((service, index) => (
              <Reveal key={service.title}>
                <article className="flex h-full flex-col">
                  <div className="h-px w-full bg-mist-300" aria-hidden="true" />
                  <span className="mt-6 block text-sm font-light tracking-caps text-ember">{String(index + 1).padStart(2, '0')}</span>
                  <h3 className="mt-4 text-xl text-ink md:text-2xl">{service.title}</h3>
                  <p className="mt-4 text-sm font-light leading-relaxed text-muted md:text-base">{service.body}</p>
                </article>
              </Reveal>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Closing CTA */}
      <SectionBg src="/images/hospitality-lobby.webp" alt="A calm, softly lit hotel lobby" overlay="teal" intensity="strong">
        <div className="section-y">
          <div className="container-edge mx-auto max-w-[1600px]">
            <div className="mx-auto max-w-4xl py-12 text-center md:py-20">
              <Reveal>
                <Eyebrow tick>Next steps</Eyebrow>
              </Reveal>
              <AnimatedText
                as="h2"
                by="word"
                delay={0.15}
                text="Whether you’re preparing for growth, restructuring a team or building new capability — HAELO can help define what comes next."
                className="mt-8 text-hero leading-tight text-mist"
              />
              <Reveal delay={0.35} className="mt-12 flex justify-center">
                <TextLink to="/contact" light>
                  Talk to an advisor
                </TextLink>
              </Reveal>
            </div>
          </div>
        </div>
      </SectionBg>
    </main>
  )
}
