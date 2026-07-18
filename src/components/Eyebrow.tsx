import { cn } from '@/lib/cn'

/** Ember uppercase label — the design's section marker. */
export function Eyebrow({ children, className }: { children: string; className?: string }) {
  return (
    <span className={cn('inline-flex items-center text-ember text-xs sm:text-sm font-semibold uppercase tracking-eyebrow', className)}>
      {children}
    </span>
  )
}
