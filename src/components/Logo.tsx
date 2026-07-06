import { Link } from 'react-router-dom'
import { cn } from '@/lib/cn'

/** HAELO wordmark with the "BY HBA" lockup, set in the display serif. */
export function Logo({ light = false, className }: { light?: boolean; className?: string }) {
  return (
    <Link to="/" aria-label="HAELO by HBA — home" className={cn('inline-flex flex-col leading-none', className)}>
      <span
        className={cn(
          'font-display text-2xl sm:text-[1.75rem] tracking-[0.14em] font-medium',
          light ? 'text-mist' : 'text-teal',
        )}
        style={{ fontVariationSettings: '"opsz" 144' }}
      >
        HAELO
      </span>
      <span
        className={cn(
          'mt-0.5 self-end text-[0.55rem] uppercase tracking-[0.4em]',
          light ? 'text-mist/70' : 'text-muted',
        )}
      >
        by HBA
      </span>
    </Link>
  )
}
