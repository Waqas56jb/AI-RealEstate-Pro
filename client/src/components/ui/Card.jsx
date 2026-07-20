import { cn } from '@/utils/cn'

export function Card({ className, hover = false, children, ...props }) {
  return (
    <div
      className={cn(
        'rounded-card border border-line bg-white shadow-soft',
        hover &&
          'transition-all duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:border-line-2 hover:shadow-lift',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

/** Icon chip used at the top of feature cards. */
export function IconChip({ className, tone = 'brand', children }) {
  const tones = {
    brand: 'bg-brand-soft text-brand',
    accent: 'bg-accent/12 text-[#0e7490]',
    light: 'bg-white/10 text-white border border-white/15',
  }
  return (
    <div
      className={cn(
        'grid size-12 shrink-0 place-items-center rounded-2xl',
        tones[tone],
        className,
      )}
    >
      {children}
    </div>
  )
}
