export const PROPERTY_TYPES = [
  { value: 'all', label: 'All types' },
  { value: 'villa', label: 'Villa' },
  { value: 'apartment', label: 'Apartment' },
  { value: 'penthouse', label: 'Penthouse' },
  { value: 'townhouse', label: 'Townhouse' },
  { value: 'loft', label: 'Loft' },
  { value: 'estate', label: 'Estate' },
]

export const LISTING_STATUS = [
  { value: 'all', label: 'Any status' },
  { value: 'sale', label: 'For sale' },
  { value: 'rent', label: 'For rent' },
  { value: 'new', label: 'New build' },
]

export const SORT_OPTIONS = [
  { value: 'recommended', label: 'AI recommended' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'newest', label: 'Newest first' },
  { value: 'area-desc', label: 'Largest first' },
]

export const BED_OPTIONS = ['any', '1', '2', '3', '4', '5+']

export const PRICE_BOUNDS = { min: 0, max: 12_000_000 }

export const AMENITIES = [
  'Private pool',
  'Sea view',
  'Smart home',
  'Gym',
  'Concierge',
  'Parking',
  'Garden',
  'Furnished',
  'Pet friendly',
  'Solar',
]
