import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/cn'

type Props = {
  to: string
  children?: string
  className?: string
  light?: boolean
}

/** "LEARN MORE / EXPLORE" text button: ember tick + label + animated arrow. */
export function TextLink({ to, children = 'Learn more', className, light = false }: Props) {
  return (
    <Link
      to={to}
      className={cn(
        'group inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-eyebrow transition-colors',
        light ? 'text-mist hover:text-ember' : 'text-teal hover:text-ember',
        className,
      )}
    >
      <span className="h-3.5 w-0.5 bg-ember transition-all duration-500 group-hover:h-5" aria-hidden />
      <span>{children}</span>
      <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:-translate-y-1" />
    </Link>
  )
}
