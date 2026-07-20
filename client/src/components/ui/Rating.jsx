import { Star } from 'lucide-react'
import { cn } from '@/utils/cn'

export function Rating({ value, count, size = 'sm', className }) {
  const px = size === 'sm' ? 'size-3.5' : 'size-4'
  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }, (_, index) => (
          <Star
            key={index}
            className={cn(
              px,
              index < Math.round(value)
                ? 'fill-amber-400 text-amber-400'
                : 'fill-line text-line',
            )}
          />
        ))}
      </div>
      <span className="text-xs font-semibold text-ink">{value.toFixed(1)}</span>
      {count != null && <span className="text-xs text-muted-2">({count})</span>}
    </div>
  )
}
