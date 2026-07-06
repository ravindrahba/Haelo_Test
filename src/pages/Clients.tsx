import { PageHeader } from '@/components/PageHeader'
import { AnimatedText } from '@/components/AnimatedText'
import { Eyebrow } from '@/components/Eyebrow'
import { Reveal, RevealGroup } from '@/components/Reveal'
import { TextLink } from '@/components/TextLink'
import { SectionBg } from '@/components/SectionBg'
import { clientTypes, caseStudies } from '@/data/site'

export default function Clients() {
  return (
    <main>
      {/* Hero */}
      <PageHeader
        eyebrow="Clients"
        title="Building the teams behind ambitious organisations."
        intro="From global hospitality brands to emerging creative businesses, HAELO helps organisations build the talent, capability and leadership required to support long-term growth."
        image="/images/why-business.webp"
      />

      {/* Who we help */}
      <section className="bg-mist section-y">
        <div className="container-edge mx-auto max-w-[1600px]">
          <Reveal>
            <Eyebrow tick>Who we help</Eyebrow>
          </Reveal>
          <AnimatedText text="Four kinds of ambition." as="h2" by="word" className="mt-6 max-w-3xl text-display text-ink" />

          <RevealGroup className="mt-16 grid gap-px overflow-hidden rounded-sm bg-teal/10 sm:grid-cols-2" stagger={0.1}>
            {clientTypes.map((c, i) => (
              <Reveal key={c.title} className="bg-mist p-8 sm:p-10 lg:p-12">
                <span className="text-sm font-light tracking-caps text-ember">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-5 text-2xl text-ink md:text-3xl">{c.title}</h3>
                <p className="mt-4 max-w-md font-light leading-relaxed text-muted">{c.body}</p>
              </Reveal>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* A shared challenge */}
      <SectionBg src="/images/hospitality-lounge.webp" srcSet="/images/hospitality-lounge@1440.webp 1440w, /images/hospitality-lounge.webp 2400w" alt="A HAELO-designed hospitality interior" overlay="teal" intensity="strong" className="text-mist">
        <div className="section-y">
          <div className="container-edge mx-auto max-w-[1600px]">
            <div className="max-w-3xl">
              <Reveal>
                <Eyebrow tick>A shared challenge</Eyebrow>
              </Reveal>
              <AnimatedText
                text={'Every organisation is different.\nThe challenge is often the same.'}
                as="h2"
                by="line"
                className="mt-6 text-hero text-mist"
              />
              <Reveal delay={0.2}>
                <p className="mt-8 max-w-xl text-lg font-light leading-relaxed text-mist/80">
                  Finding the people capable of strengthening performance today while supporting future growth. HAELO combines
                  creative-industry expertise with access to exceptional global talent to help organisations build stronger teams and
                  long-term capability.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </SectionBg>

      {/* Case studies */}
      <section className="bg-mist-200 section-y">
        <div className="container-edge mx-auto max-w-[1600px]">
          <Reveal>
            <Eyebrow tick>Selected work</Eyebrow>
          </Reveal>
          <AnimatedText text="Every search is different." as="h2" by="word" className="mt-6 max-w-2xl text-display text-ink" />

          <div className="mt-16 flex flex-col divide-y divide-teal/10 border-y border-teal/10">
            {caseStudies.map((cs, i) => (
              <Reveal key={cs.title} delay={i * 0.04}>
                <article className="grid gap-8 py-12 lg:grid-cols-[0.9fr_1.6fr]">
                  <div>
                    <span className="text-sm font-light tracking-caps text-ember">{cs.location}</span>
                    <h3 className="mt-3 text-2xl text-ink md:text-3xl">{cs.title}</h3>
                  </div>
                  <dl className="grid gap-6 sm:grid-cols-3">
                    {[
                      ['Challenge', cs.challenge],
                      ['What we did', cs.approach],
                      ['Outcome', cs.outcome],
                    ].map(([label, value]) => (
                      <div key={label}>
                        <dt className="text-xs uppercase tracking-caps text-ember/90">{label}</dt>
                        <dd className="mt-2 text-sm font-light leading-relaxed text-muted">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-14">
            <TextLink to="/contact">Discuss your talent needs</TextLink>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
