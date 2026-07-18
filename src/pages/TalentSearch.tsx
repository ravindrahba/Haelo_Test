import { PageHeader } from '@/components/PageHeader'
import { AnimatedText } from '@/components/AnimatedText'
import { Eyebrow } from '@/components/Eyebrow'
import { Reveal, RevealGroup } from '@/components/Reveal'
import { TextLink } from '@/components/TextLink'
import { SectionBg } from '@/components/SectionBg'
import { searchDisciplines, whyChoose } from '@/data/site'

export default function TalentSearch() {
  return (
    <main>
      {/* Hero — client's original copy restored (feedback PDF p20). */}
      <PageHeader
        eyebrow="Talent Search"
        title="Exceptional talent for exceptional organisations."
        intro={[
          'HAELO identifies, engages and secures the talent capable of delivering.',
          'Drawing on deep industry expertise and a global network spanning more than 25 markets, we connect organisations with talent often beyond the reach of traditional search.',
        ]}
        image="/images/service-talent.webp"
      />

      {/* Who we search for — headline down 25% and set in two lines, body copy up
          25%, original copy restored (feedback PDF p21, p22). */}
      <section className="bg-mist section-y">
        <div className="container-edge mx-auto max-w-[1600px]">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <Reveal>
                <Eyebrow>Talent Search</Eyebrow>
              </Reveal>
              <AnimatedText text="Who we search for" as="h2" by="word" className="mt-6 max-w-[10ch] text-display-sm text-ink" />
              <Reveal delay={0.2}>
                <div className="mt-8 max-w-md space-y-4 text-[1.25rem] font-light leading-relaxed text-muted">
                  <p>HAELO identifies talent across the full spectrum of creative disciplines.</p>
                  <p>From strategic leadership to specialized craft skills, we know where to find people who move organisations forward.</p>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <RevealGroup>
                <ul className="grid grid-cols-1 border-t border-mist-300 sm:grid-cols-2 sm:gap-x-12">
                  {searchDisciplines.map((discipline, index) => (
                    <li key={discipline} className="group flex items-baseline gap-5 border-b border-mist-300 py-6 md:py-7">
                      <span className="text-xs font-medium tabular-nums tracking-caps text-ember">{String(index + 1).padStart(2, '0')}</span>
                      <span className="text-lg font-light text-ink transition-colors duration-500 group-hover:text-teal-600 md:text-xl">
                        {discipline}
                      </span>
                    </li>
                  ))}
                </ul>
              </RevealGroup>
            </div>
          </div>
        </div>
      </section>

      {/* The HAELO advantage — retitled, headline down 25% and set in two lines
          (feedback PDF p23, p24). */}
      <section className="mesh-teal bg-teal text-mist section-y">
        <div className="container-edge mx-auto max-w-[1600px]">
          <div className="max-w-3xl">
            <Reveal>
              <Eyebrow>The HAELO advantage</Eyebrow>
            </Reveal>
            <AnimatedText
              text="Why organisations partner with HAELO"
              as="h2"
              by="word"
              className="mt-6 max-w-[20ch] text-display-sm text-mist"
            />
          </div>

          <RevealGroup>
            <div className="mt-16 grid grid-cols-1 gap-y-14 border-t border-teal-700 pt-14 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-4 lg:gap-x-12 md:mt-20 md:pt-16">
              {whyChoose.map((item, index) => (
                <article key={item.title} className="max-w-xs">
                  <span className="block text-sm font-medium tabular-nums tracking-caps text-ember">{String(index + 1).padStart(2, '0')}</span>
                  <h3 className="mt-5 text-xl leading-snug text-mist md:text-2xl">{item.title}</h3>
                  <p className="mt-4 text-sm font-light leading-relaxed text-mist-300 md:text-base">{item.body}</p>
                </article>
              ))}
            </div>
          </RevealGroup>
        </div>
      </section>

      {/* Closing CTA — the flat teal panel is replaced by the client's own image
          (feedback PDF p25). */}
      <SectionBg src="/images/ts-cta.webp" alt="Two colleagues reviewing work together" overlay="teal-flat" intensity="strong">
        <div className="section-y">
          <div className="container-edge mx-auto max-w-[1600px]">
            <div className="mx-auto flex max-w-3xl flex-col items-center py-12 text-center md:py-20">
              <Reveal>
                <Eyebrow>Begin the search</Eyebrow>
              </Reveal>
              <AnimatedText text="Let’s find the people who move the needle." as="h2" by="word" className="mt-6 text-hero leading-[1.05] text-mist" />
              <Reveal delay={0.3}>
                <div className="mt-10">
                  <TextLink to="/contact" light>
                    Start a conversation
                  </TextLink>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </SectionBg>
    </main>
  )
}
