import { cn } from '@/lib/cn'

type CurveProps = {
  /** Color the curve fills with (the color of the section being revealed below/above). */
  fill?: string
  flip?: boolean
  className?: string
}

/** Soft fluid curve divider between sections. */
export function Curve({ fill = 'var(--color-mist)', flip = false, className }: CurveProps) {
  return (
    <div className={cn('pointer-events-none relative w-full leading-[0]', className)} aria-hidden>
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className={cn('block h-[60px] w-full sm:h-[110px]', flip && 'rotate-180')}
      >
        <path d="M0,64 C280,140 520,8 760,40 C1000,72 1220,132 1440,72 L1440,120 L0,120 Z" fill={fill} />
      </svg>
    </div>
  )
}
