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
            <Eyebrow>Born from HBA</Eyebrow>
          </Reveal>
          <AnimatedText as="h2" by="word" text="Born from design, built for creative organisations." className="mt-6 text-4xl sm:text-6xl" />
          <Reveal delay={0.1}>
            <div className="mt-8 max-w-xl space-y-5 text-lg text-muted">
              <p>HAELO was founded within HBA, one of the world&rsquo;s leading hospitality design firms.</p>
              <p>We understand how creative organisations operate because we have helped build them from within.</p>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10">
              <HbaLogo withBy className="h-6" />
              <div className="mt-12">
                <TextLink to="/about">Learn more</TextLink>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="relative">
          <SectionBg
            src="/images/origin.webp"
            alt="HAELO advisors reviewing plans"
            overlay="none"
            rounded
            className="aspect-[4/5]"
          />
        </Reveal>
      </div>
    </section>
  )
}
