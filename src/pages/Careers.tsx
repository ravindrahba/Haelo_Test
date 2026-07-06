import { useMemo, useState } from 'react'
import { MapPin, ArrowUpRight } from 'lucide-react'
import { PageHeader } from '@/components/PageHeader'
import { Reveal } from '@/components/Reveal'
import { Eyebrow } from '@/components/Eyebrow'
import { jobs, sectors } from '@/data/site'
import { cn } from '@/lib/cn'

const filters = ['All', ...sectors.map((s) => s.title)]

export default function Careers() {
  const [active, setActive] = useState('All')
  const visible = useMemo(() => (active === 'All' ? jobs : jobs.filter((j) => j.sector === active)), [active])

  return (
    <>
      <PageHeader
        eyebrow="Careers"
        title="Find the people who move the needle — or become one."
        intro="Explore current mandates across design, hospitality, development and innovation. New opportunities are added continuously."
        image="/images/service-talent.webp"
      />

      <section className="section-y bg-mist">
        <div className="container-edge mx-auto max-w-[1600px]">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <Eyebrow tick>Open Roles</Eyebrow>
              <h2 className="mt-6 text-3xl sm:text-4xl">{visible.length} live opportunities</h2>
            </Reveal>

            {/* Filter chips */}
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActive(f)}
                  className={cn(
                    'rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-caps transition-colors',
                    active === f
                      ? 'border-teal bg-teal text-mist'
                      : 'border-teal/20 text-muted hover:border-teal/50 hover:text-teal',
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <ul className="mt-12 divide-y divide-teal/10 border-y border-teal/10">
            {visible.map((job) => (
              <li key={job.id}>
                <a
                  href="#"
                  className="group grid items-center gap-4 py-7 transition-colors hover:bg-mist-200/60 sm:grid-cols-[1.6fr_1fr_auto] sm:px-4"
                >
                  <div>
                    <h3 className="font-display text-xl text-teal transition-colors group-hover:text-ember sm:text-2xl">
                      {job.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted">{job.sector}</p>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-muted">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 text-ember" /> {job.location}
                    </span>
                    <span className="hidden sm:inline">{job.type}</span>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-teal transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-ember" />
                </a>
              </li>
            ))}
          </ul>

          <Reveal>
            <div className="mt-14 rounded-sm bg-mist-200 p-8 sm:p-10">
              <p className="text-sm uppercase tracking-caps text-muted">Powered by Bullhorn</p>
              <p className="mt-3 max-w-2xl text-lg text-teal">
                Can&rsquo;t find the right role? Register your interest and our consultants will match you to opportunities as they emerge.
              </p>
              <a
                href="mailto:info@haelopeople.com"
                className="mt-6 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-eyebrow text-teal transition-colors hover:text-ember"
              >
                <span className="h-3.5 w-0.5 bg-ember" />
                Submit your profile
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
