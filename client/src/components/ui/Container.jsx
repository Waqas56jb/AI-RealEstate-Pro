import { cn } from '@/utils/cn'

export function Container({ className, children, size = 'default' }) {
  const widths = {
    narrow: 'max-w-3xl',
    default: 'max-w-7xl',
    wide: 'max-w-[88rem]',
  }
  return (
    <div className={cn('mx-auto w-full px-5 sm:px-8', widths[size], className)}>{children}</div>
  )
}
