import { PageHeader } from '@/components/PageHeader'
import { Sectors } from '@/sections/Sectors'
import { Reveal } from '@/components/Reveal'
import { Eyebrow } from '@/components/Eyebrow'

export default function SectorsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Sectors"
        title="Where design leads, we build the teams."
        intro="We work with the world's leading design firms, developers and hospitality brands — helping identify the capabilities, leadership and talent required for long-term success."
        image="/images/why-business.webp"
      />

      <Sectors withHeader={false} />

      <section className="section-y bg-mist-200">
        <div className="container-edge mx-auto max-w-[1600px]">
          <Reveal>
            <Eyebrow tick>Design-led talent strategies</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 max-w-3xl text-4xl sm:text-5xl">
              Every sector we serve shares one thing: <span className="text-ember">design is central to how they win.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-2xl text-lg text-muted">
              Whether hospitality, real estate, creative agencies or technology, we bring design intelligence and creative-industry expertise to every mandate.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
