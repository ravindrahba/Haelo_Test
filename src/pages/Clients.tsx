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

      {/* Industries — retitled, headline down 25% and set on one line, blocks
          pulled up and tightened (feedback PDF p28, p29). */}
      <section className="bg-mist section-y">
        <div className="container-edge mx-auto max-w-[1600px]">
          <Reveal>
            <Eyebrow>Who we help</Eyebrow>
          </Reveal>
          <AnimatedText text="Industries" as="h2" by="word" className="mt-6 max-w-3xl text-display-sm text-ink" />

          <RevealGroup className="mt-10 grid gap-px overflow-hidden rounded-sm bg-teal/10 sm:grid-cols-2" stagger={0.1}>
            {clientTypes.map((c, i) => (
              <Reveal key={c.title} className="bg-mist p-6 sm:p-7 lg:p-8">
                <span className="text-sm font-medium tracking-caps text-ember">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-4 text-2xl text-ink md:text-3xl">{c.title}</h3>
                <p className="mt-3 max-w-md font-light leading-relaxed text-muted">{c.body}</p>
              </Reveal>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* A shared challenge */}
      <SectionBg src="/images/hospitality-lounge.webp" srcSet="/images/hospitality-lounge@1440.webp 1440w, /images/hospitality-lounge.webp 2400w" alt="A HAELO-designed hospitality interior" overlay="teal" intensity="strong" className="text-mist">
        <div className="section-y">
          <div className="container-edge mx-auto max-w-[1600px]">
            {/* Copy replaced with the client's own (feedback PDF p30).
                NOTE: p31 of the same deck says "remove this content block"
                while p30 rewrites its copy — the two contradict. Kept and
                corrected pending their answer; deleting is one line. */}
            <div className="max-w-3xl">
              <Reveal>
                <Eyebrow>A shared challenge</Eyebrow>
              </Reveal>
              <AnimatedText text="Every organisation is different" as="h2" by="word" className="mt-6 max-w-[16ch] text-hero text-mist" />
              <Reveal delay={0.2}>
                <p className="mt-8 max-w-xl text-lg font-light leading-relaxed text-mist/80">
                  HAELO brings creative industry expertise and access to exceptional global talent to help our clients build stronger
                  teams and lasting capability.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </SectionBg>

      {/* Case studies */}
      <section className="bg-mist-200 section-y">
        <div className="container-edge mx-auto max-w-[1600px]">
          {/* "Every search is different." headline removed, ember labels set
              bolder for legibility, blocks pulled up and the gaps between them
              tightened (feedback PDF p32). */}
          <Reveal>
            <Eyebrow>Selected work</Eyebrow>
          </Reveal>

          <div className="mt-8 flex flex-col divide-y divide-teal/10 border-y border-teal/10">
            {caseStudies.map((cs, i) => (
              <Reveal key={cs.title} delay={i * 0.04}>
                <article className="grid gap-8 py-8 lg:grid-cols-[0.9fr_1.6fr]">
                  <div>
                    <span className="text-sm font-medium tracking-caps text-ember">{cs.location}</span>
                    <h3 className="mt-3 text-2xl text-ink md:text-3xl">{cs.title}</h3>
                  </div>
                  <dl className="grid gap-6 sm:grid-cols-3">
                    {[
                      ['Challenge', cs.challenge],
                      ['What we did', cs.approach],
                      ['Outcome', cs.outcome],
                    ].map(([label, value]) => (
                      <div key={label}>
                        <dt className="text-xs font-semibold uppercase tracking-caps text-ember">{label}</dt>
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
