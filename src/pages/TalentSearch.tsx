import { PageHeader } from '@/components/PageHeader'
import { AnimatedText } from '@/components/AnimatedText'
import { Eyebrow } from '@/components/Eyebrow'
import { Reveal, RevealGroup } from '@/components/Reveal'
import { TextLink } from '@/components/TextLink'
import { searchDisciplines, whyChoose } from '@/data/site'

export default function TalentSearch() {
  return (
    <main>
      {/* Hero */}
      <PageHeader
        eyebrow="Talent Search"
        title="Exceptional talent for exceptional organisations."
        intro="When the brief is clear, HAELO identifies, engages and secures the talent capable of delivering it — drawing on deep industry expertise and a global network spanning more than 25 markets, reaching talent often beyond traditional search."
        image="/images/service-talent.webp"
      />

      {/* Disciplines */}
      <section className="bg-mist section-y">
        <div className="container-edge mx-auto max-w-[1600px]">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <Reveal>
                <Eyebrow tick>Who we search for</Eyebrow>
              </Reveal>
              <AnimatedText
                text="Across every creative discipline."
                as="h2"
                by="word"
                className="mt-6 max-w-md text-display leading-[1.08] text-ink"
              />
              <Reveal delay={0.2}>
                <p className="mt-8 max-w-sm font-light leading-relaxed text-muted">
                  From concept to completion, we place the people who shape the world&rsquo;s most considered hospitality environments.
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <RevealGroup>
                <ul className="grid grid-cols-1 border-t border-mist-300 sm:grid-cols-2 sm:gap-x-12">
                  {searchDisciplines.map((discipline, index) => (
                    <li key={discipline} className="group flex items-baseline gap-5 border-b border-mist-300 py-6 md:py-7">
                      <span className="text-xs font-light tabular-nums tracking-caps text-ember">{String(index + 1).padStart(2, '0')}</span>
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

      {/* Why clients choose HAELO */}
      <section className="mesh-teal bg-teal text-mist section-y">
        <div className="container-edge mx-auto max-w-[1600px]">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow tick>Why clients choose HAELO</Eyebrow>
            </Reveal>
            <AnimatedText text="The difference is design." as="h2" by="word" className="mt-6 text-display leading-[1.08] text-mist" />
          </div>

          <RevealGroup>
            <div className="mt-16 grid grid-cols-1 gap-y-14 border-t border-teal-700 pt-14 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-4 lg:gap-x-12 md:mt-20 md:pt-16">
              {whyChoose.map((item, index) => (
                <article key={item.title} className="max-w-xs">
                  <span className="block text-sm font-light tabular-nums tracking-caps text-ember">{String(index + 1).padStart(2, '0')}</span>
                  <h3 className="mt-5 text-xl leading-snug text-mist md:text-2xl">{item.title}</h3>
                  <p className="mt-4 text-sm font-light leading-relaxed text-mist-300 md:text-base">{item.body}</p>
                </article>
              ))}
            </div>
          </RevealGroup>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-teal-800 text-mist section-y">
        <div className="container-edge mx-auto max-w-[1600px]">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <Reveal>
              <Eyebrow tick>Begin the search</Eyebrow>
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
      </section>
    </main>
  )
}
