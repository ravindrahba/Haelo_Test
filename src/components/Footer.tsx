import { Link } from 'react-router-dom'
import { site, nav } from '@/data/site'
import { Eyebrow } from './Eyebrow'
import { Reveal } from './Reveal'
import { Curve } from './Curve'

/* Brand glyphs — lucide dropped its brand icons, so we inline these. */
function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  )
}
function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  )
}
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 3.68a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32Zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm7.85-10.41a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0Z" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="relative mesh-teal text-mist">
      <Curve fill="var(--color-teal)" className="-mt-px" />

      <div className="container-edge mx-auto max-w-[1600px] pb-16 pt-8">
        {/* Big CTA */}
        <Reveal>
          <div className="border-b border-mist/15 pb-16">
            <Eyebrow tick>Contact us</Eyebrow>
            <h2 className="mt-6 max-w-4xl text-4xl sm:text-6xl">
              Whether you&rsquo;re searching for talent or designing your future,{' '}
              <span className="text-ember">HAELO can help.</span>
            </h2>
            <Link
              to="/contact"
              className="group mt-10 inline-flex items-center gap-4 rounded-full border border-mist/25 px-7 py-4 text-sm font-semibold uppercase tracking-eyebrow transition-colors hover:border-ember hover:text-ember"
            >
              Start a conversation
              <span className="h-px w-8 bg-current transition-all duration-500 group-hover:w-12" />
            </Link>
          </div>
        </Reveal>

        <div className="grid gap-12 pt-14 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <img src="/brand/logo-white.png" alt="HAELO by HBA" className="h-12 w-auto" draggable={false} />
            <p className="mt-6 max-w-sm text-mist/70">{site.tagline}</p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-eyebrow text-ember">{site.contact.company}</p>
            <address className="mt-4 space-y-1 not-italic text-mist/75">
              {site.contact.address.map((line) => (
                <div key={line}>{line}</div>
              ))}
              <div className="pt-3">T {site.contact.phone}</div>
              <a href={`mailto:${site.contact.email}`} className="link-underline">
                {site.contact.email}
              </a>
            </address>
          </div>

          <div>
            <p className="text-xs uppercase tracking-eyebrow text-ember">Explore</p>
            <ul className="mt-4 space-y-2">
              {nav.slice(1).map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-mist/75 transition-colors hover:text-ember">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-mist/15 pt-8 sm:flex-row sm:items-center">
          <p className="text-sm text-mist/55">HAELO by HBA © 2026. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" aria-label="LinkedIn" className="rounded-full border border-mist/20 p-2.5 transition-colors hover:border-ember hover:text-ember">
              <LinkedinIcon className="h-4 w-4" />
            </a>
            <a href="#" aria-label="Instagram" className="rounded-full border border-mist/20 p-2.5 transition-colors hover:border-ember hover:text-ember">
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a href="#" aria-label="X" className="rounded-full border border-mist/20 p-2.5 transition-colors hover:border-ember hover:text-ember">
              <XIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
