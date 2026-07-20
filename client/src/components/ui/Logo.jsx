import { Link } from 'react-router-dom'
import { cn } from '@/utils/cn'
import { site } from '@/data/site'

/** Mark is a stylised roofline; the wordmark carries the brand→cyan gradient. */
export function Logo({ light = false, className }) {
  return (
    <Link to="/" className={cn('group inline-flex items-center gap-2.5', className)}>
      <span className="relative grid size-9 place-items-center overflow-hidden rounded-xl bg-linear-100 from-brand-light to-accent shadow-glow transition-transform duration-300 group-hover:scale-105">
        <svg viewBox="0 0 24 24" className="size-5 text-white" aria-hidden="true">
          <path
            d="M3 11.2 12 4l9 7.2V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-8.8Z"
            fill="currentColor"
          />
        </svg>
      </span>
      <span
        className={cn(
          'font-display text-xl font-extrabold tracking-tight',
          light ? 'text-white' : 'text-ink',
        )}
      >
        {site.name}
        <span className="text-gradient-brand">.</span>
      </span>
    </Link>
  )
}
