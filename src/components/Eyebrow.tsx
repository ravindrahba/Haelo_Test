import { cn } from '@/lib/cn'

/** Ember uppercase label with a short vertical tick — the design's section marker. */
export function Eyebrow({ children, className, tick = false }: { children: string; className?: string; tick?: boolean }) {
  return (
    <span className={cn('inline-flex items-center gap-3 text-ember text-xs sm:text-sm font-semibold uppercase tracking-eyebrow', className)}>
      {tick && <span className="h-4 w-px bg-ember" aria-hidden />}
      {children}
    </span>
  )
}
