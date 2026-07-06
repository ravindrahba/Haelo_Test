import { services } from '@/data/site'
import { Eyebrow } from '@/components/Eyebrow'
import { Reveal } from '@/components/Reveal'
import { TextLink } from '@/components/TextLink'
import { cn } from '@/lib/cn'

/** Alternating image/text service blocks (Team Advisory / Talent Identification). */
export function ServicesShowcase() {
  return (
    <section className="bg-teal text-mist">
      {services.map((svc, i) => {
        const dark = i % 2 === 0
        const imageLeft = svc.align === 'left'
        return (
          <div
            key={svc.id}
            className={cn(
              'grid items-stretch lg:grid-cols-2',
              dark ? 'bg-teal text-mist' : 'bg-mist text-teal',
            )}
          >
            <div className={cn('relative min-h-[320px] overflow-hidden lg:min-h-[560px]', imageLeft ? 'lg:order-1' : 'lg:order-2')}>
              <img
                src={svc.image}
                alt={svc.kicker}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className={cn('absolute inset-0', dark ? 'bg-teal/10' : 'bg-transparent')} />
            </div>

            <div className={cn('flex flex-col justify-center px-8 py-16 sm:px-14 lg:px-20', imageLeft ? 'lg:order-2' : 'lg:order-1')}>
              <Reveal>
                <Eyebrow tick>{svc.eyebrow}</Eyebrow>
              </Reveal>
              <Reveal delay={0.05}>
                <p className={cn('mt-6 text-sm uppercase tracking-caps', dark ? 'text-mist/60' : 'text-muted')}>{svc.kicker}</p>
              </Reveal>
              <Reveal delay={0.08}>
                <h3 className="mt-3 max-w-md text-4xl sm:text-5xl">{svc.title}</h3>
              </Reveal>
              <Reveal delay={0.12}>
                <p className={cn('mt-6 max-w-md text-lg', dark ? 'text-mist/70' : 'text-muted')}>{svc.body}</p>
              </Reveal>
              <Reveal delay={0.16}>
                <div className="mt-10">
                  <TextLink to="/services" light={dark}>
                    Learn more
                  </TextLink>
                </div>
              </Reveal>
            </div>
          </div>
        )
      })}
    </section>
  )
}
