import { PageHeader } from '@/components/PageHeader'
import { AnimatedText } from '@/components/AnimatedText'
import { Eyebrow } from '@/components/Eyebrow'
import { Reveal, RevealGroup } from '@/components/Reveal'
import { SectionBg } from '@/components/SectionBg'
import { founder } from '@/data/site'

const twoThings = [
  { title: 'Creative Talent', body: 'How exceptional people think, grow and choose the opportunities worth their time.' },
  { title: 'Creative Business', body: 'How organisations evolve, scale and build long-term capability.' },
]

export default function About() {
  return (
    <main>
      <PageHeader
        eyebrow="About HAELO"
        title="Why we created HAELO."
        intro="Creative work begins with exceptional people. Yet creative hiring is too often treated as a transaction — focused on roles rather than capability. HAELO brings a more informed, design-led approach to talent, helping organisations build stronger teams, cultures and long-term capability."
        image="/images/hero-2.webp"
      />

      {/* Born from HBA */}
      <section className="bg-mist section-y">
        <div className="container-edge mx-auto grid max-w-[1600px] items-center gap-14 lg:grid-cols-2">
          <div>
            <Reveal>
              <Eyebrow tick>Born from HBA</Eyebrow>
            </Reveal>
            <AnimatedText text="A different perspective." as="h2" by="word" className="mt-6 text-display text-ink" />
            <Reveal delay={0.2}>
              <div className="mt-8 max-w-xl space-y-5 text-lg font-light text-muted">
                <p>
                  HAELO was founded within HBA, one of the world&rsquo;s leading hospitality design firms — a perspective few talent
                  businesses can claim.
                </p>
                <p>
                  We understand how creative organisations operate, how teams collaborate, and how businesses grow, because we have helped
                  build them from within. This is talent advisory informed by decades of design leadership.
                </p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <SectionBg src="/images/origin.webp" alt="HAELO advisors at work" overlay="none" rounded className="aspect-[4/5] shadow-[0_40px_80px_-30px_rgba(31,46,50,0.45)]" />
          </Reveal>
        </div>
      </section>

      {/* We understand two things */}
      <section className="mesh-teal bg-teal text-mist section-y">
        <div className="container-edge mx-auto max-w-[1600px]">
          <Reveal>
            <Eyebrow tick>Our belief</Eyebrow>
          </Reveal>
          <AnimatedText text="We understand two things." as="h2" by="word" className="mt-6 max-w-3xl text-display text-mist" />
          <RevealGroup className="mt-14 grid gap-10 md:grid-cols-2" stagger={0.12}>
            {twoThings.map((t, i) => (
              <Reveal key={t.title} className="border-t border-mist/15 pt-8">
                <span className="font-display text-2xl text-ember">0{i + 1}</span>
                <h3 className="mt-4 text-2xl text-mist md:text-3xl">{t.title}</h3>
                <p className="mt-3 max-w-md text-lg font-light text-mist/75">{t.body}</p>
              </Reveal>
            ))}
          </RevealGroup>
          <Reveal delay={0.2}>
            <p className="mt-12 max-w-2xl text-lg font-light text-mist/70">The strongest teams are built when both are understood equally well.</p>
          </Reveal>
        </div>
      </section>

      {/* Founder */}
      <section className="bg-mist-200 section-y">
        <div className="container-edge mx-auto grid max-w-[1600px] items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <SectionBg
              src="/images/doris.webp"
              srcSet="/images/doris@600.webp 600w, /images/doris.webp 900w"
              alt="Doris Li, Founder of HAELO"
              overlay="none"
              rounded
              className="aspect-[4/5] shadow-[0_40px_80px_-30px_rgba(31,46,50,0.45)]"
            />
          </Reveal>
          <div>
            <Reveal>
              <Eyebrow tick>A word from our founder</Eyebrow>
            </Reveal>
            <blockquote className="mt-8">
              <AnimatedText text={`“${founder.quote}”`} as="p" by="line" className="text-2xl leading-snug text-ink sm:text-3xl" />
              <Reveal delay={0.3}>
                <footer className="mt-8 flex items-baseline gap-3">
                  <cite className="text-base not-italic text-ink">{founder.name}</cite>
                  <span aria-hidden className="h-px w-8 self-center bg-ember" />
                  <span className="text-sm font-light uppercase tracking-caps text-muted">{founder.role}</span>
                </footer>
              </Reveal>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Embedded talent advisors */}
      <section className="bg-mist section-y">
        <div className="container-edge mx-auto max-w-[1600px]">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-end">
            <div>
              <Reveal>
                <Eyebrow tick>Our team</Eyebrow>
              </Reveal>
              <AnimatedText text="Embedded talent advisors." as="h2" by="word" className="mt-6 text-display text-ink" />
            </div>
            <Reveal delay={0.15}>
              <p className="max-w-xl text-lg font-light leading-relaxed text-muted">
                The HAELO team combines talent expertise with first-hand experience in design, architecture and creative businesses. We
                operate with an in-house advisory mindset — building long-term partnerships rather than transactional placements.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  )
}
