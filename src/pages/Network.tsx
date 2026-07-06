import { PageHeader } from '@/components/PageHeader'
import { WorldMap } from '@/components/WorldMap'
import { Reveal, RevealGroup } from '@/components/Reveal'
import { Eyebrow } from '@/components/Eyebrow'
import { cities } from '@/data/site'

export default function Network() {
  return (
    <>
      <PageHeader
        eyebrow="Global Reach"
        title="Access talent wherever it exists."
        intro="Creative talent moves across borders. We combine international reach with local market understanding to connect you with the best."
        image="/images/hero-1.webp"
      />

      <section className="section-y bg-mist">
        <div className="container-edge mx-auto max-w-[1600px]">
          <Reveal>
            <Eyebrow tick>Our Network</Eyebrow>
          </Reveal>
          <Reveal delay={0.05} className="mt-10">
            <WorldMap className="w-full" />
          </Reveal>

          <RevealGroup className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-sm bg-teal/10 sm:grid-cols-4" stagger={0.06}>
            {cities.map((c) => (
              <Reveal key={c.name} className="bg-mist p-6">
                <span className="h-2 w-2 rounded-full bg-ember" />
                <p className="mt-4 font-display text-lg text-teal">{c.name}</p>
              </Reveal>
            ))}
          </RevealGroup>
        </div>
      </section>
    </>
  )
}
