import { Eyebrow } from '@/components/Eyebrow'
import { Reveal } from '@/components/Reveal'
import { AnimatedText } from '@/components/AnimatedText'
import { SectionBg } from '@/components/SectionBg'
import { TextLink } from '@/components/TextLink'
import { HbaLogo } from '@/components/HbaLogo'

export function Origin() {
  return (
    <section className="section-y bg-mist-200">
      <div className="container-edge mx-auto grid max-w-[1600px] items-center gap-14 lg:grid-cols-2">
        <div>
          <Reveal>
            <Eyebrow tick>Born from HBA</Eyebrow>
          </Reveal>
          <AnimatedText as="h2" by="word" text="Born from design, built for creative organisations." className="mt-6 text-4xl sm:text-6xl" />
          <Reveal delay={0.1}>
            <div className="mt-8 max-w-xl space-y-5 text-lg text-muted">
              <p>HAELO was founded within HBA, one of the world&rsquo;s leading hospitality design firms.</p>
              <p>We understand how creative organisations operate because we have helped build them from within.</p>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 flex items-center gap-6">
              <HbaLogo withBy className="h-6" />
              <span className="h-8 w-px bg-teal/20" />
              <TextLink to="/about">Learn more</TextLink>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="relative">
          <SectionBg
            src="/images/origin.webp"
            alt="HAELO advisors reviewing plans"
            overlay="none"
            rounded
            className="aspect-[4/5] shadow-[0_40px_80px_-30px_rgba(31,46,50,0.45)]"
          />
          <div className="absolute -bottom-6 -left-6 hidden h-24 w-24 rounded-sm border border-ember/60 sm:block" aria-hidden />
        </Reveal>
      </div>
    </section>
  )
}
