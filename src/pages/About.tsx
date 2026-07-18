import { PageHeader } from '@/components/PageHeader'
import { AnimatedText } from '@/components/AnimatedText'
import { Eyebrow } from '@/components/Eyebrow'
import { Reveal, RevealGroup } from '@/components/Reveal'
import { SectionBg } from '@/components/SectionBg'
import { WorldMap } from '@/components/WorldMap'
import { founder, team, stats } from '@/data/site'

const twoThings = [
  { title: 'Creative Talent', body: 'How exceptional people think, grow and choose the opportunities worth their time.' },
  { title: 'Creative Business', body: 'How organisations evolve, scale and build long-term capability.' },
]

export default function About() {
  return (
    <main>
      {/* Client's original copy restored (feedback PDF p34). */}
      <PageHeader
        eyebrow="About HAELO"
        title="Why we created HAELO."
        intro="HAELO was created to bring a more informed, design-led approach to talent, helping organisations build stronger teams, cultures and long-term capability."
        image="/images/hero-2.webp"
      />

      {/* Born from HBA — retitled with the client's copy, headline down 25%, and
          their own image in place of the old one (feedback PDF p35, p36). */}
      <section className="bg-mist section-y">
        <div className="container-edge mx-auto grid max-w-[1600px] items-center gap-14 lg:grid-cols-2">
          <div>
            <Reveal>
              <Eyebrow>Born from HBA</Eyebrow>
            </Reveal>
            <AnimatedText text="Built on sixty years of design leadership" as="h2" by="word" className="mt-6 max-w-[16ch] text-display-sm text-ink" />
            <Reveal delay={0.2}>
              <div className="mt-8 max-w-xl space-y-5 text-lg font-light text-muted">
                <p>HAELO was founded within HBA, giving us a perspective few talent businesses possess.</p>
                <p>
                  We understand how creative organisations operate because we have helped build them from within, shaped their cultures and
                  guided their growth through every stage.
                </p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <SectionBg src="/images/about-perspective.webp" alt="A HAELO team in conversation" overlay="none" rounded className="aspect-[4/5]" />
          </Reveal>
        </div>
      </section>

      {/* We understand two things */}
      <section className="mesh-teal bg-teal text-mist section-y">
        <div className="container-edge mx-auto max-w-[1600px]">
          <Reveal>
            <Eyebrow>Our belief</Eyebrow>
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

      {/* Founder — circular crop, framed from the top so her head is not cut off
          (feedback PDF p37). */}
      <section className="bg-mist-200 section-y">
        <div className="container-edge mx-auto grid max-w-[1600px] items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <div className="mx-auto aspect-square w-full max-w-md overflow-hidden rounded-full bg-mist-300">
              <img
                src="/images/founder-doris.webp"
                alt="Doris Li, Founder of HAELO"
                draggable={false}
                className="h-full w-full object-cover object-top"
              />
            </div>
          </Reveal>
          <div>
            <Reveal>
              <Eyebrow>A word from our founder</Eyebrow>
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

      {/* Embedded talent advisors — the team */}
      <section className="bg-mist section-y">
        <div className="container-edge mx-auto max-w-[1600px]">
          {/* Headline down 25% and set in two lines; the paragraph now sits
              directly beneath it, left-aligned, up 25% (feedback PDF p38). */}
          <div>
            <Reveal>
              <Eyebrow>The Team</Eyebrow>
            </Reveal>
            <AnimatedText text="We are embedded talent advisors." as="h2" by="word" className="mt-6 max-w-[15ch] text-display-sm text-ink" />
            <Reveal delay={0.15}>
              <p className="mt-8 max-w-2xl text-left text-[1.40625rem] font-light leading-relaxed text-muted">
                The HAELO team is built on an in-house advisory model, combining talent expertise with first-hand experience in design,
                architecture and creative businesses.
              </p>
            </Reveal>
          </div>

          <Reveal className="mt-12 flex items-center gap-4 text-sm uppercase tracking-caps text-muted">
            <span>Talent Advisors</span>
            <span className="text-ember">+</span>
            <span>Creative Practitioners</span>
          </Reveal>

          <RevealGroup className="mt-10 grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:grid-cols-6" stagger={0.08}>
            {team.map((m) => (
              <Reveal key={m.name} className="group">
                <div className="relative aspect-square overflow-hidden rounded-full bg-mist-200">
                  <img
                    src={m.photo}
                    alt={m.name}
                    draggable={false}
                    className="h-full w-full object-cover grayscale transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:grayscale-0 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-5 font-display text-lg text-teal">{m.name}</h3>
                <p className="mt-1 text-sm font-light leading-snug text-muted">{m.role}</p>
                <p className="mt-2 flex items-center gap-2 text-xs font-medium uppercase tracking-caps text-ember">
                  <span className="h-px w-3 bg-ember" />
                  {m.location}
                </p>
              </Reveal>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Moved here from the Insights page (feedback PDF p39). */}
      <section className="mesh-teal bg-teal text-mist section-y">
        <div className="container-edge mx-auto max-w-[1600px]">
          <AnimatedText text="Our impact, by the numbers." as="h2" by="word" className="text-display-sm text-mist" />
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

      {/* Moved here from the Insights page (feedback PDF p40). */}
      <section className="bg-mist section-y">
        <div className="container-edge mx-auto max-w-[1600px]">
          <div className="max-w-3xl">
            <Reveal>
              <Eyebrow>Our global network</Eyebrow>
            </Reveal>
            <AnimatedText text="Talent that moves across borders." as="h2" by="word" className="mt-6 text-display-sm text-ink" />
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
    </main>
  )
}
