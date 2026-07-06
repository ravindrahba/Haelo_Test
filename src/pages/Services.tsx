import { PageHeader } from '@/components/PageHeader'
import { ServicesShowcase } from '@/sections/ServicesShowcase'
import { Reveal, RevealGroup } from '@/components/Reveal'
import { Eyebrow } from '@/components/Eyebrow'

const process = [
  { step: 'Understand', body: 'We immerse ourselves in your ambition, culture and design language before a single conversation about talent.' },
  { step: 'Define', body: 'We map the capabilities, leadership and structure your organisation needs to realise its vision.' },
  { step: 'Identify', body: 'We reach across global creative networks to surface talent others cannot see.' },
  { step: 'Partner', body: 'We stay close beyond the placement — shaping teams over time as your ambition evolves.' },
]

export default function Services() {
  return (
    <>
      <PageHeader
        eyebrow="Our Services"
        title="Design the organisation your ambition requires."
        intro="From advisory to identification, HAELO builds the teams behind exceptional brands, destinations and experiences."
        image="/images/service-advisory.webp"
      />

      <ServicesShowcase />

      <section className="section-y bg-mist">
        <div className="container-edge mx-auto max-w-[1600px]">
          <Reveal>
            <Eyebrow tick>How we work</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 max-w-2xl text-4xl sm:text-5xl">A partnership, not a transaction.</h2>
          </Reveal>

          <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-sm bg-teal/10 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
            {process.map((p, i) => (
              <Reveal key={p.step} className="bg-mist p-8">
                <span className="font-display text-2xl text-ember">0{i + 1}</span>
                <h3 className="mt-4 font-display text-xl text-teal">{p.step}</h3>
                <p className="mt-3 text-[0.95rem] text-muted">{p.body}</p>
              </Reveal>
            ))}
          </RevealGroup>
        </div>
      </section>
    </>
  )
}
