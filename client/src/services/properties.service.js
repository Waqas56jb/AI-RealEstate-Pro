import { properties, propertyBySlug } from '@/data/properties'
import { api } from './api'

/**
 * Set VITE_USE_MOCKS=false once the FastAPI backend is running. Every function
 * below keeps the same signature and return shape either way, so no component
 * changes when the switch flips.
 */
const USE_MOCKS = import.meta.env.VITE_USE_MOCKS !== 'false'

const delay = (ms = 320) => new Promise((resolve) => setTimeout(resolve, ms))

function applyFilters(list, filters = {}) {
  const {
    query = '',
    type = 'all',
    status = 'all',
    beds = 'any',
    minPrice,
    maxPrice,
    amenities = [],
  } = filters

  return list.filter((property) => {
    if (query) {
      const haystack =
        `${property.title} ${property.city} ${property.region} ${property.address}`.toLowerCase()
      if (!haystack.includes(query.toLowerCase())) return false
    }
    if (type !== 'all' && property.type !== type) return false
    if (status !== 'all' && property.status !== status) return false
    if (beds !== 'any') {
      const min = Number.parseInt(beds, 10)
      if (beds.endsWith('+') ? property.beds < min : property.beds !== min) return false
    }
    if (minPrice != null && property.price < minPrice) return false
    if (maxPrice != null && property.price > maxPrice) return false
    if (amenities.length && !amenities.every((a) => property.features.includes(a))) {
      return false
    }
    return true
  })
}

function applySort(list, sort = 'recommended') {
  const sorted = [...list]
  switch (sort) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price)
    case 'newest':
      return sorted.sort((a, b) => new Date(b.listedAt) - new Date(a.listedAt))
    case 'area-desc':
      return sorted.sort((a, b) => b.area - a.area)
    default:
      return sorted.sort((a, b) => b.aiScore - a.aiScore)
  }
}

export async function fetchProperties({ filters, sort, page = 1, pageSize = 9 } = {}) {
  if (!USE_MOCKS) {
    return api.get('/properties', { params: { ...filters, sort, page, page_size: pageSize } })
  }

  await delay()
  const filtered = applySort(applyFilters(properties, filters), sort)
  const start = (page - 1) * pageSize
  return {
    items: filtered.slice(start, start + pageSize),
    total: filtered.length,
    page,
    pageSize,
    hasMore: start + pageSize < filtered.length,
  }
}

export async function fetchPropertyBySlug(slug) {
  if (!USE_MOCKS) return api.get(`/properties/${slug}`)

  await delay(240)
  const property = propertyBySlug(slug)
  if (!property) throw new Error('Property not found')
  return property
}

export async function fetchSimilar(slug, limit = 3) {
  if (!USE_MOCKS) return api.get(`/properties/${slug}/similar`, { params: { limit } })

  await delay(200)
  const current = propertyBySlug(slug)
  if (!current) return []
  return properties
    .filter((p) => p.slug !== slug)
    .map((p) => ({
      property: p,
      // Cheap stand-in for the real embedding distance the backend returns.
      score:
        (p.type === current.type ? 40 : 0) +
        (p.status === current.status ? 20 : 0) +
        Math.max(0, 40 - Math.abs(p.price - current.price) / (current.price / 40)),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.property)
}

export async function fetchFeatured() {
  if (!USE_MOCKS) return api.get('/properties/featured')

  await delay(180)
  return properties.filter((p) => p.featured)
}
