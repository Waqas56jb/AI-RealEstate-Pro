import { Link } from 'react-router-dom'
import { cn } from '@/utils/cn'

const variants = {
  primary:
    'bg-brand text-white shadow-glow hover:bg-brand-dark hover:-translate-y-0.5 active:translate-y-0',
  secondary:
    'bg-white text-ink border border-line-2 hover:border-brand hover:text-brand hover:-translate-y-0.5',
  soft: 'bg-brand-soft text-brand hover:bg-ice-2',
  ghost: 'text-ink hover:bg-brand-soft hover:text-brand',
  navy: 'bg-white text-navy hover:bg-ice hover:-translate-y-0.5',
  outlineLight:
    'border border-white/25 text-white hover:bg-white/10 hover:border-white/40 backdrop-blur-sm',
}

const sizes = {
  sm: 'h-9 px-4 text-sm gap-1.5',
  md: 'h-11 px-5 text-sm gap-2',
  lg: 'h-13 px-7 text-base gap-2.5',
}

export function Button({
  as,
  to,
  href,
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}) {
  const classes = cn(
    'inline-flex items-center justify-center rounded-pill font-semibold whitespace-nowrap',
    'transition-all duration-200 ease-[var(--ease-out-soft)]',
    'disabled:pointer-events-none disabled:opacity-50',
    variants[variant],
    sizes[size],
    className,
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  const Component = as ?? 'button'
  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  )
}
