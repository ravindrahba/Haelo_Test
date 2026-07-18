import { Link } from 'react-router-dom'
import { cn } from '@/lib/cn'

type Props = {
  to: string
  children?: string
  className?: string
  light?: boolean
}

/** "LEARN MORE / EXPLORE" text button. */
export function TextLink({ to, children = 'Learn more', className, light = false }: Props) {
  return (
    <Link
      to={to}
      className={cn(
        'group inline-flex items-center text-xs font-semibold uppercase tracking-eyebrow transition-colors',
        light ? 'text-mist hover:text-ember' : 'text-teal hover:text-ember',
        className,
      )}
    >
      <span>{children}</span>
    </Link>
  )
}
