import { PageHeader } from '@/components/PageHeader'
import { Origin } from '@/sections/Origin'
import { Reveal, RevealGroup } from '@/components/Reveal'
import { Eyebrow } from '@/components/Eyebrow'
import { differentiators } from '@/data/site'

const stats = [
  { value: '40+', label: 'Years of HBA design legacy' },
  { value: 'Global', label: 'Talent networks across continents' },
  { value: '4', label: 'Core sectors served' },
]

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="About HAELO"
        title="We understand exceptional creative talent — and creative business."
        intro="Born from HBA's global design legacy, HAELO helps ambitious organisations build the teams behind exceptional brands, destinations and experiences."
        image="/images/hero-2.webp"
      />

      <Origin />

      <section className="section-y bg-teal text-mist">
        <div className="container-edge mx-auto max-w-[1600px]">
          <Reveal>
            <Eyebrow tick>What sets us apart</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 max-w-3xl text-4xl sm:text-5xl">
              Most talent advisors understand hiring. <span className="text-ember">We understand design.</span>
            </h2>
          </Reveal>

          <RevealGroup className="mt-14 grid gap-8 md:grid-cols-3" stagger={0.12}>
            {differentiators.map((d, i) => (
              <Reveal key={d} className="border-t border-mist/15 pt-6">
                <span className="font-display text-2xl text-ember">0{i + 1}</span>
                <p className="mt-4 text-lg text-mist/80">{d}</p>
              </Reveal>
            ))}
          </RevealGroup>

          <RevealGroup className="mt-20 grid gap-10 border-t border-mist/15 pt-14 sm:grid-cols-3" stagger={0.12}>
            {stats.map((s) => (
              <Reveal key={s.label}>
                <p className="font-display text-5xl text-mist sm:text-6xl">{s.value}</p>
                <p className="mt-3 text-mist/60">{s.label}</p>
              </Reveal>
            ))}
          </RevealGroup>
        </div>
      </section>
    </>
  )
}
