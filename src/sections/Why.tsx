import { whyTiles, differentiators } from '@/data/site'
import { Eyebrow } from '@/components/Eyebrow'
import { Reveal, RevealGroup } from '@/components/Reveal'
import { TextLink } from '@/components/TextLink'

export function Why() {
  return (
    <section className="section-y bg-mist">
      <div className="container-edge mx-auto max-w-[1600px]">
        <Reveal>
          <Eyebrow tick>Why HAELO</Eyebrow>
        </Reveal>

        <RevealGroup className="mt-10 grid gap-4 md:grid-cols-2" stagger={0.15}>
          {whyTiles.map((tile) => (
            <Reveal key={tile.title} className="group relative aspect-[16/10] overflow-hidden rounded-sm">
              <img
                src={tile.image}
                alt={tile.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-teal/85 via-teal/20 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-10">
                <span className="text-xs uppercase tracking-eyebrow text-mist/75">{tile.eyebrow}</span>
                <h3 className="mt-2 font-display text-3xl text-mist sm:text-4xl">{tile.title}</h3>
                <span className="mt-4 h-0.5 w-10 bg-ember transition-all duration-500 group-hover:w-20" />
              </div>
            </Reveal>
          ))}
        </RevealGroup>

        <div className="mt-16 grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-end">
          <Reveal>
            <h2 className="max-w-2xl text-3xl sm:text-5xl">
              Most talent advisors understand hiring. <span className="text-ember">We understand design.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="space-y-3">
              {differentiators.map((d) => (
                <li key={d} className="flex gap-3 text-muted">
                  <span className="mt-2.5 h-px w-5 shrink-0 bg-ember" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <TextLink to="/about">Explore</TextLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
