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
      {/* Hero — client's original copy restored, broken so the second line
          starts on HAELO (feedback PDF p14). */}
      <PageHeader
        eyebrow="Talent Advisory"
        title="Designing teams before hiring."
        intro={[
          'The right hire starts with understanding what success requires.',
          'HAELO works with founders, CEOs and leadership teams to define the capabilities, structures and leadership needed to support future growth.',
        ]}
        image="/images/service-advisory.webp"
      />

      {/* Talent Advisory — headline sits directly beneath the section title,
          left-aligned and 25% down from the hero scale; body copy up 25%
          (feedback PDF p15, p16). */}
      <section className="bg-mist section-y">
        <div className="container-edge mx-auto max-w-[1600px]">
          <div>
            <Reveal>
              <Eyebrow>Talent Advisory</Eyebrow>
            </Reveal>
            <AnimatedText as="h2" by="word" text="Building capability" className="mt-6 max-w-[20ch] text-display-sm text-ink" />
            <Reveal delay={0.2} className="mt-8 max-w-2xl">
              <p className="text-[1.25rem] font-light leading-relaxed text-muted md:text-[1.40625rem]">
                We help you define the teams, structures and capabilities that will drive your future.
              </p>
            </Reveal>
          </div>

          {/* Card headline + body up 20%, proportions held (feedback PDF p16). */}
          <RevealGroup className="mt-20 grid gap-x-12 gap-y-16 sm:grid-cols-2 lg:mt-28 lg:grid-cols-3 lg:gap-x-16" stagger={0.08}>
            {advisoryServices.map((service, index) => (
              <Reveal key={service.title}>
                <article className="flex h-full flex-col">
                  <div className="h-px w-full bg-mist-300" aria-hidden="true" />
                  <span className="mt-6 block text-sm font-medium tracking-caps text-ember">{String(index + 1).padStart(2, '0')}</span>
                  <h3 className="mt-4 text-[1.5rem] text-ink md:text-[1.8rem]">{service.title}</h3>
                  <p className="mt-4 text-[1.05rem] font-light leading-relaxed text-muted md:text-[1.2rem]">{service.body}</p>
                </article>
              </Reveal>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Closing CTA — client's own image and copy (feedback PDF p17, p18). */}
      <SectionBg src="/images/ta-nextsteps.webp" alt="Two advisors in conversation" overlay="teal-flat" intensity="strong">
        <div className="section-y">
          <div className="container-edge mx-auto max-w-[1600px]">
            <div className="mx-auto max-w-4xl py-12 text-center md:py-20">
              <Reveal>
                <Eyebrow>We partner with you</Eyebrow>
              </Reveal>
              <AnimatedText
                as="h2"
                by="word"
                delay={0.15}
                text="Whether you’re preparing for growth, restructuring a team or building new capability, HAELO can help define what comes next."
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
