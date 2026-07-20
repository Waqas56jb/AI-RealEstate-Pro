/**
 * Central image helper. Every remote image in the app goes through here so
 * quality, crop and CDN host can be swapped in one place — and so the whole
 * app can be pointed at self-hosted assets later without touching components.
 */
const UNSPLASH = 'https://images.unsplash.com'

export function photo(id, { w = 1200, h, q = 80 } = {}) {
  const params = new URLSearchParams({
    auto: 'format',
    fit: 'crop',
    w: String(w),
    q: String(q),
  })
  if (h) params.set('h', String(h))
  return `${UNSPLASH}/${id}?${params.toString()}`
}

/** Square avatar crop with face-focused framing. */
export function avatar(id, size = 240) {
  return `${UNSPLASH}/${id}?auto=format&fit=facearea&facepad=3&w=${size}&h=${size}&q=80`
}
