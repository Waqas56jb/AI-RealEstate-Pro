import { cn } from '@/utils/cn'

const base =
  'w-full rounded-xl border border-line-2 bg-white px-4 text-sm text-ink transition-colors ' +
  'placeholder:text-muted-2 focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/10 ' +
  'disabled:bg-ice disabled:text-muted-2'

export function Field({ label, hint, error, className, children }) {
  return (
    <label className={cn('flex flex-col gap-1.5', className)}>
      {label && <span className="text-sm font-semibold text-ink">{label}</span>}
      {children}
      {error ? (
        <span className="text-xs font-medium text-red-600">{error}</span>
      ) : (
        hint && <span className="text-xs text-muted-2">{hint}</span>
      )}
    </label>
  )
}

export function Input({ className, icon: Icon, ...props }) {
  if (Icon) {
    return (
      <div className="relative">
        <Icon className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-2" />
        <input className={cn(base, 'h-11 pl-10', className)} {...props} />
      </div>
    )
  }
  return <input className={cn(base, 'h-11', className)} {...props} />
}

export function Select({ className, options = [], ...props }) {
  return (
    <select
      className={cn(base, 'h-11 cursor-pointer appearance-none pr-9', className)}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%237c8aa5' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>\")",
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 0.85rem center',
      }}
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}

export function Textarea({ className, ...props }) {
  return <textarea className={cn(base, 'min-h-32 resize-y py-3 leading-relaxed', className)} {...props} />
}

export function Checkbox({ label, className, ...props }) {
  return (
    <label className={cn('flex cursor-pointer items-center gap-2.5 text-sm text-muted', className)}>
      <input
        type="checkbox"
        className="size-4 shrink-0 cursor-pointer rounded border-line-2 text-brand accent-brand focus:ring-brand/20"
        {...props}
      />
      {label}
    </label>
  )
}
