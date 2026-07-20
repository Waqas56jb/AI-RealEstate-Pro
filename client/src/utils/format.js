const CURRENCY = 'USD'
const LOCALE = 'en-US'

/** $1,250,000 */
export function formatPrice(value) {
  return new Intl.NumberFormat(LOCALE, {
    style: 'currency',
    currency: CURRENCY,
    maximumFractionDigits: 0,
  }).format(value)
}

/** $1.25M / $940K — for tight spaces like map pins and card ribbons. */
export function formatPriceShort(value) {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(2).replace(/\.?0+$/, '')}M`
  if (value >= 1_000) return `$${Math.round(value / 1_000)}K`
  return `$${value}`
}

/** 2,450 */
export function formatNumber(value) {
  return new Intl.NumberFormat(LOCALE).format(value)
}

/** 1,850 sq ft */
export function formatArea(sqft) {
  return `${formatNumber(sqft)} sq ft`
}

/** +4.2% / -1.8% — signed, one decimal. */
export function formatDelta(value) {
  const sign = value > 0 ? '+' : ''
  return `${sign}${value.toFixed(1)}%`
}

/** Mar 14, 2026 */
export function formatDate(input) {
  return new Date(input).toLocaleDateString(LOCALE, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

/** "2 hours ago" — coarse relative time for activity feeds. */
export function formatRelative(input) {
  const diff = Date.now() - new Date(input).getTime()
  const minutes = Math.round(diff / 60_000)
  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes} min ago`
  const hours = Math.round(minutes / 60)
  if (hours < 24) return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`
  const days = Math.round(hours / 24)
  if (days < 30) return `${days} ${days === 1 ? 'day' : 'days'} ago`
  return formatDate(input)
}

/** "villa-in-palm-jumeirah" */
export function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function initials(name) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}
