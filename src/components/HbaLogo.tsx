import { cn } from '@/lib/cn'

/**
 * The HBA mark, used as a lockup wherever the brand references its parent.
 * `light` picks the white version for dark backgrounds.
 */
export function HbaLogo({ light = false, className, withBy = false }: { light?: boolean; className?: string; withBy?: boolean }) {
  const img = (
    <img
      src={light ? '/brand/hba-white.png' : '/brand/hba-dark.png'}
      alt="HBA"
      className={cn('inline-block w-auto', className)}
      draggable={false}
    />
  )
  if (!withBy) return img
  return (
    <span className="inline-flex items-center gap-2 align-middle">
      <span className={cn('text-xs uppercase tracking-eyebrow', light ? 'text-mist/70' : 'text-muted')}>by</span>
      {img}
    </span>
  )
}
