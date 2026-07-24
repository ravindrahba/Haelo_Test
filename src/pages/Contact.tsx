import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Check } from 'lucide-react'
import { PageHeader } from '@/components/PageHeader'
import { Reveal } from '@/components/Reveal'
import { Eyebrow } from '@/components/Eyebrow'
import { site } from '@/data/site'
import { cn } from '@/lib/cn'

type Fields = { name: string; email: string; company: string; message: string }
const empty: Fields = { name: '', email: '', company: '', message: '' }

export default function Contact() {
  const [fields, setFields] = useState<Fields>(empty)
  const [errors, setErrors] = useState<Partial<Fields>>({})
  const [sent, setSent] = useState(false)

  function validate(): boolean {
    const e: Partial<Fields> = {}
    if (!fields.name.trim()) e.name = 'Please enter your name'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) e.email = 'Please enter a valid email'
    if (!fields.message.trim()) e.message = 'Tell us a little about your needs'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function onSubmit(ev: FormEvent) {
    ev.preventDefault()
    if (!validate()) return
    // Mock submit — wire to a real endpoint / CRM later.
    setSent(true)
    setFields(empty)
  }

  const field =
    'w-full border-b border-teal/20 bg-transparent py-3 text-teal outline-none transition-colors placeholder:text-muted/60 focus:border-ember'

  return (
    <>
      <PageHeader
        eyebrow="Contact Us"
        title="Let's design your future, together."
        intro="Whether you're searching for exceptional talent or shaping the team behind your next ambition, our consultants are ready to help."
        image="/images/hero-3.webp"
      />

      <section className="section-y bg-mist">
        <div className="container-edge mx-auto grid max-w-[1600px] gap-16 lg:grid-cols-[1fr_1.1fr]">
          {/* Details */}
          <div>
            <Reveal>
              <Eyebrow>{site.contact.company}</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <ul className="mt-10 space-y-8">
                {site.contact.offices.map((office) => (
                  <li key={office.phone} className="flex gap-4">
                    <MapPin className="mt-1 h-5 w-5 shrink-0 text-ember" />
                    <div className="not-italic text-lg text-teal">
                      {office.lines.map((l) => (
                        <div key={l}>{l}</div>
                      ))}
                      <a href={`tel:${office.phone.replace(/[^+\d]/g, '')}`} className="mt-1 inline-block link-underline">
                        {office.phone}
                      </a>
                    </div>
                  </li>
                ))}
                <li className="flex gap-4">
                  <Mail className="mt-1 h-5 w-5 shrink-0 text-ember" />
                  <a href={`mailto:${site.contact.email}`} className="text-lg text-teal link-underline">
                    {site.contact.email}
                  </a>
                </li>
              </ul>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={0.1}>
            {sent ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex h-full flex-col items-start justify-center rounded-sm bg-teal p-10 text-mist"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ember text-teal">
                  <Check className="h-7 w-7" />
                </span>
                <h3 className="mt-6 text-3xl">Thank you.</h3>
                <p className="mt-3 max-w-sm text-mist/75">
                  Your message is on its way to our team. We&rsquo;ll be in touch shortly.
                </p>
                <button onClick={() => setSent(false)} className="mt-8 text-xs font-semibold uppercase tracking-eyebrow text-ember">
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="grid gap-7">
                <div className="grid gap-7 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-xs uppercase tracking-caps text-muted">Name</span>
                    <input
                      className={field}
                      value={fields.name}
                      onChange={(e) => setFields({ ...fields, name: e.target.value })}
                      placeholder="Your name"
                    />
                    {errors.name && <span className="mt-1 block text-sm text-ember-600">{errors.name}</span>}
                  </label>
                  <label className="block">
                    <span className="text-xs uppercase tracking-caps text-muted">Company</span>
                    <input
                      className={field}
                      value={fields.company}
                      onChange={(e) => setFields({ ...fields, company: e.target.value })}
                      placeholder="Organisation"
                    />
                  </label>
                </div>
                <label className="block">
                  <span className="text-xs uppercase tracking-caps text-muted">Email</span>
                  <input
                    className={field}
                    value={fields.email}
                    onChange={(e) => setFields({ ...fields, email: e.target.value })}
                    placeholder="you@company.com"
                  />
                  {errors.email && <span className="mt-1 block text-sm text-ember-600">{errors.email}</span>}
                </label>
                <label className="block">
                  <span className="text-xs uppercase tracking-caps text-muted">How can we help?</span>
                  <textarea
                    rows={4}
                    className={cn(field, 'resize-none')}
                    value={fields.message}
                    onChange={(e) => setFields({ ...fields, message: e.target.value })}
                    placeholder="Tell us about your ambition"
                  />
                  {errors.message && <span className="mt-1 block text-sm text-ember-600">{errors.message}</span>}
                </label>
                <button
                  type="submit"
                  className="group mt-2 inline-flex w-fit items-center gap-4 rounded-full bg-teal px-8 py-4 text-sm font-semibold uppercase tracking-eyebrow text-mist transition-colors hover:bg-ember hover:text-teal"
                >
                  Send message
                  <span className="h-px w-8 bg-current transition-all duration-500 group-hover:w-12" />
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </>
  )
}
