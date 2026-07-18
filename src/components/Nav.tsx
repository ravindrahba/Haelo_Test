import { useCallback, useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { nav, site } from '@/data/site'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const overlayVariants = {
  hidden: { clipPath: 'inset(0% 0% 100% 0%)', transition: { duration: 0.7, ease: EASE, delay: 0.15 } },
  visible: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 0.9, ease: EASE } },
}

const overlayReducedVariants = {
  hidden: { opacity: 0, transition: { duration: 0.2 } },
  visible: { opacity: 1, transition: { duration: 0.2 } },
}

const listVariants = {
  hidden: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.25 } },
}

const itemVariants = {
  hidden: { y: 28, opacity: 0, transition: { duration: 0.4, ease: EASE } },
  visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: EASE } },
}

const footerVariants = {
  hidden: { opacity: 0, y: 12, transition: { duration: 0.3, ease: EASE } },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE, delay: 0.65 } },
}

const staticVariants = {
  hidden: { opacity: 0, y: 0, transition: { duration: 0.15 } },
  visible: { opacity: 1, y: 0, transition: { duration: 0.15 } },
}

interface BurgerProps {
  open: boolean
  scrolled: boolean
  reduced: boolean
  onClick: () => void
}

function Burger({ open, scrolled, reduced, onClick }: BurgerProps) {
  const dark = scrolled && !open
  const lineClass = `absolute left-0 block h-[1.5px] w-7 origin-center ${dark ? 'bg-teal' : 'bg-mist'}`
  const duration = reduced ? 0 : 0.45

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={open ? 'Close menu' : 'Open menu'}
      aria-expanded={open}
      aria-controls="haelo-menu"
      className="group relative z-[60] flex items-center gap-3.5 py-2 pl-3 outline-none"
    >
      <span
        className={`hidden select-none text-[0.65rem] font-semibold uppercase tracking-eyebrow transition-colors duration-300 sm:block ${
          dark ? 'text-teal' : 'text-mist'
        }`}
      >
        <span className="relative block h-[1em] overflow-hidden">
          <span
            className="block"
            style={{
              transform: open ? 'translateY(-100%)' : 'translateY(0%)',
              transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)',
              transitionDuration: reduced ? '0ms' : '500ms',
            }}
          >
            <span className="block leading-[1em]">Menu</span>
            <span className="block leading-[1em]">Close</span>
          </span>
        </span>
      </span>
      <span className="relative h-4 w-7" aria-hidden="true">
        <motion.span
          className={lineClass}
          style={{ top: 0 }}
          animate={open ? { y: 7, rotate: 45, width: 28 } : { y: 0, rotate: 0, width: 28 }}
          transition={{ duration, ease: EASE }}
        />
        <motion.span
          className={lineClass}
          style={{ top: 7 }}
          animate={open ? { opacity: 0, x: 8 } : { opacity: 1, x: 0, width: 20 }}
          transition={{ duration: reduced ? 0 : 0.25, ease: EASE }}
        />
        <motion.span
          className={lineClass}
          style={{ top: 14 }}
          animate={open ? { y: -7, rotate: -45, width: 28 } : { y: 0, rotate: 0, width: 28 }}
          transition={{ duration, ease: EASE }}
        />
      </span>
    </button>
  )
}

export function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const prefersReducedMotion = useReducedMotion()
  const reduced = prefersReducedMotion ?? false

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    if (open) {
      const previous = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = previous
      }
    }
    return undefined
  }, [open])

  const toggle = useCallback(() => setOpen((v) => !v), [])

  const barSolid = scrolled && !open

  return (
    <>
      {/* Sits above the menu overlay (z-55). The header is a positioned element
          with a z-index, so it forms a stacking context: the burger's own
          z-[60] is scoped inside it and cannot lift above the overlay on its
          own. Without this the open menu had no visible close control
          (feedback PDF p12). */}
      <header
        className={`fixed inset-x-0 top-0 z-[60] transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
          barSolid ? 'bg-mist/85 shadow-[0_1px_0_0_rgba(31,46,50,0.08)] backdrop-blur-xl' : 'bg-transparent'
        }`}
      >
        <div className="container-edge mx-auto flex h-[76px] max-w-[1600px] items-center justify-between">
          <Link to="/" aria-label="HAELO by HBA — Home" className="relative z-[60] block">
            <img
              src={barSolid && !open ? '/brand/logo-dark.png' : '/brand/logo-white.png'}
              alt="HAELO by HBA"
              className="h-[36px] w-auto"
              draggable={false}
            />
          </Link>
          <Burger open={open} scrolled={scrolled} reduced={reduced} onClick={toggle} />
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="haelo-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="mesh-teal fixed inset-0 z-[55] flex flex-col overflow-hidden bg-teal"
            variants={reduced ? overlayReducedVariants : overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="h-[76px] shrink-0" />

            <motion.nav
              className="container-edge mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-center py-8"
              variants={reduced ? undefined : listVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <ul className="flex flex-col">
                {nav.map((item, i) => (
                  <motion.li key={item.to} variants={reduced ? staticVariants : itemVariants} className="overflow-hidden">
                    <NavLink
                      to={item.to}
                      end={item.to === '/'}
                      className={({ isActive }) =>
                        `group flex items-baseline gap-5 py-[0.3em] transition-colors duration-300 sm:gap-8 ${
                          isActive ? 'text-ember' : 'text-mist hover:text-ember'
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <span className="w-8 shrink-0 text-xs font-semibold tracking-eyebrow text-ember/80" aria-hidden="true">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span className="relative inline-flex items-baseline gap-4">
                            <span
                              className="block font-sans font-extralight leading-[1.08] tracking-[-0.01em] transition-transform duration-500 group-hover:translate-x-3 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                              style={{ fontSize: 'clamp(2rem, 6vw, 4.5rem)', transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}
                            >
                              {item.label}
                            </span>
                            <span
                              className={`absolute -bottom-0.5 left-0 h-px bg-ember transition-[width] duration-500 motion-reduce:transition-none ${
                                isActive ? 'w-full' : 'w-0 group-hover:w-full'
                              }`}
                              style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}
                              aria-hidden="true"
                            />
                            <ArrowUpRight
                              className="h-6 w-6 self-center text-ember opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100 motion-reduce:transition-none sm:h-8 sm:w-8"
                              strokeWidth={1.25}
                              aria-hidden="true"
                            />
                          </span>
                        </>
                      )}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
            </motion.nav>

            <motion.footer
              className="shrink-0 border-t border-mist/10"
              variants={reduced ? staticVariants : footerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <div className="container-edge mx-auto flex w-full max-w-[1600px] flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between sm:py-8">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-10">
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="text-sm font-light tracking-caps text-mist/70 transition-colors duration-300 hover:text-ember"
                  >
                    {site.contact.email}
                  </a>
                  <a
                    href={`tel:${site.contact.phone.replace(/[^+\d]/g, '')}`}
                    className="text-sm font-light tracking-caps text-mist/70 transition-colors duration-300 hover:text-ember"
                  >
                    {site.contact.phone}
                  </a>
                </div>
                <p className="text-[0.65rem] font-semibold uppercase tracking-eyebrow text-mist/40">HAELO by HBA</p>
              </div>
            </motion.footer>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
