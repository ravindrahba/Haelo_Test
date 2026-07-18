import { whyTiles, differentiators } from '@/data/site'
import { Eyebrow } from '@/components/Eyebrow'
import { Reveal, RevealGroup } from '@/components/Reveal'
import { TextLink } from '@/components/TextLink'
import { ParallaxImage } from '@/components/ParallaxImage'

export function Why() {
  return (
    <section className="section-y bg-mist">
      <div className="container-edge mx-auto max-w-[1600px]">
        <Reveal>
          <Eyebrow>Why HAELO</Eyebrow>
        </Reveal>

        <RevealGroup className="mt-10 grid gap-4 md:grid-cols-2" stagger={0.15}>
          {whyTiles.map((tile) => (
            <Reveal key={tile.title} className="group relative aspect-[16/10] overflow-hidden rounded-sm">
              <ParallaxImage src={tile.image} alt={tile.title} className="absolute inset-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-teal/85 via-teal/20 to-transparent" />
              {/* Both text elements up 20%, proportions held (feedback PDF p6). */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-10">
                <span className="text-[0.9rem] uppercase tracking-eyebrow text-mist/75">{tile.eyebrow}</span>
                <h3 className="mt-2 font-display text-[2.25rem] text-mist sm:text-[2.7rem]">{tile.title}</h3>
                <span className="mt-4 h-0.5 w-10 bg-ember transition-all duration-500 group-hover:w-20" />
              </div>
            </Reveal>
          ))}
        </RevealGroup>

        {/* items-start so the headline's top edge sits level with the first
            bullet on the right (feedback PDF p6). */}
        <div className="mt-16 grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-start">
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
