import { cn } from '@/utils/cn'

const tones = {
  brand: 'bg-brand-soft text-brand',
  accent: 'bg-accent/12 text-[#0e7490]',
  navy: 'bg-navy text-white',
  neutral: 'bg-ice text-muted border border-line',
  success: 'bg-emerald-50 text-emerald-700',
  warn: 'bg-amber-50 text-amber-700',
  glass: 'bg-white/15 text-white backdrop-blur-md border border-white/20',
}

export function Badge({ tone = 'brand', className, children, ...props }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-pill px-3 py-1 text-xs font-semibold',
        tones[tone],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}

/** Small uppercase mono eyebrow that sits above section headings. */
export function Eyebrow({ className, children, light = false }) {
  return (
    <span
      className={cn(
        'label-mono inline-flex items-center gap-2 rounded-pill px-3 py-1.5',
        light ? 'bg-white/10 text-ice-2 border border-white/15' : 'bg-brand-soft text-brand',
        className,
      )}
    >
      {children}
    </span>
  )
}
