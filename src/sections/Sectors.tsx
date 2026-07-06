import { Hotel, Building2, Compass, Cpu, type LucideIcon } from 'lucide-react'
import { sectors } from '@/data/site'
import { Eyebrow } from '@/components/Eyebrow'
import { Reveal, RevealGroup } from '@/components/Reveal'
import { AnimatedText } from '@/components/AnimatedText'
import { TextLink } from '@/components/TextLink'

const icons: Record<string, LucideIcon> = {
  hospitality: Hotel,
  'real-estate': Building2,
  'design-studios': Compass,
  innovation: Cpu,
}

export function Sectors({ withHeader = true }: { withHeader?: boolean }) {
  return (
    <section className="section-y bg-mist">
      <div className="container-edge mx-auto max-w-[1600px]">
        {withHeader && (
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <Reveal>
                <Eyebrow tick>Built for the design economy</Eyebrow>
              </Reveal>
              <AnimatedText
                as="h2"
                by="word"
                text={"We work with the world's leading design firms, developers and hospitality brands to build exceptional teams."}
                className="mt-6 max-w-3xl text-3xl sm:text-5xl"
              />
            </div>
            <Reveal delay={0.1}>
              <TextLink to="/clients">Explore</TextLink>
            </Reveal>
          </div>
        )}

        <RevealGroup className="mt-16 grid gap-px overflow-hidden rounded-sm bg-teal/10 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
          {sectors.map((s) => {
            const Icon = icons[s.id] ?? Compass
            return (
              <Reveal key={s.id} className="group bg-mist p-8 transition-colors duration-500 hover:bg-mist-200">
                <Icon className="h-8 w-8 text-teal transition-colors duration-500 group-hover:text-ember" strokeWidth={1.4} />
                <h3 className="mt-6 font-display text-xl text-teal">{s.title}</h3>
                <p className="mt-3 text-[0.95rem] text-muted">{s.body}</p>
              </Reveal>
            )
          })}
        </RevealGroup>

        <Reveal>
          <p className="mt-14 max-w-2xl text-lg text-muted">
            We help identify the capabilities, leadership and talent required for long-term success.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
