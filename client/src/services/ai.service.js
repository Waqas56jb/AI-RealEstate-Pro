import { api } from './api'

const USE_MOCKS = import.meta.env.VITE_USE_MOCKS !== 'false'
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

/** Rough per-market baselines, $/sq ft. Backend replaces this with the real model. */
const BASE_PSF = {
  villa: 720,
  penthouse: 810,
  apartment: 640,
  townhouse: 520,
  loft: 580,
  estate: 470,
}

const CONDITION_MULTIPLIER = { new: 1.12, excellent: 1.06, good: 1.0, fair: 0.9, needsWork: 0.78 }

/**
 * Returns a price band, not a single number — the band widens when inputs are
 * thin, which is the honest way to present model uncertainty.
 */
export async function estimateValue(input) {
  if (!USE_MOCKS) return api.post('/ai/valuation', input)

  await delay(1400) // let the UI show its thinking state

  const { type = 'apartment', area = 1200, beds = 2, baths = 2, year = 2010, condition = 'good' } =
    input

  const psf = BASE_PSF[type] ?? 600
  const ageFactor = Math.max(0.72, 1 - (2026 - Number(year)) * 0.004)
  const roomFactor = 1 + (Number(beds) - 2) * 0.035 + (Number(baths) - 2) * 0.02
  const condFactor = CONDITION_MULTIPLIER[condition] ?? 1

  const estimate = Math.round((Number(area) * psf * ageFactor * roomFactor * condFactor) / 1000) * 1000
  const spread = 0.062 // ±6.2% band

  return {
    estimate,
    low: Math.round((estimate * (1 - spread)) / 1000) * 1000,
    high: Math.round((estimate * (1 + spread)) / 1000) * 1000,
    confidence: 94,
    pricePerSqft: Math.round(estimate / Number(area)),
    forecast12m: 4.6,
    comparables: [
      { address: '22 Marlow Court', price: Math.round(estimate * 0.96), area: Math.round(area * 0.94), soldAt: '2026-05-19' },
      { address: '9 Ridgeway Close', price: Math.round(estimate * 1.03), area: Math.round(area * 1.07), soldAt: '2026-04-02' },
      { address: '141 Beaufort Lane', price: Math.round(estimate * 0.99), area: Math.round(area * 1.01), soldAt: '2026-06-11' },
    ],
    drivers: [
      { label: 'Location score', impact: 12.4 },
      { label: 'Floor area', impact: 8.1 },
      { label: 'Build year', impact: -3.2 },
      { label: 'Condition', impact: 5.7 },
    ],
  }
}

/** Streaming is handled server-side; this mock just resolves the full reply. */
export async function askConcierge(message, context = {}) {
  if (!USE_MOCKS) return api.post('/ai/concierge', { message, context })

  await delay(900)
  return {
    reply:
      'I found four homes matching that brief within your budget. The strongest match is Azure Cliff Residence — 5 beds, ocean frontage, and it is priced 3.4% below our valuation. Want me to book a viewing?',
    suggestions: ['Book a viewing', 'Show me cheaper options', 'What are the service charges?'],
  }
}
