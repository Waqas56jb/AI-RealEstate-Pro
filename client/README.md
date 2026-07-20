# Estatly — Client

React + Vite + Tailwind v4 frontend for the AI real estate platform.

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production bundle → dist/
npm run preview  # serve the built bundle
```

Copy `.env.example` to `.env.local` when you need to point at a real backend.

## Design tokens

**Every brand decision lives in one `@theme` block** at the top of
[src/index.css](src/index.css). Change a token there and the whole app follows —
no component edits.

| Group | Tokens |
| --- | --- |
| Brand blues | `brand` `brand-dark` `brand-light` `brand-soft` `accent` |
| Navy anchors | `navy` `navy-2` `navy-3` |
| Neutrals | `ink` `muted` `muted-2` `ice` `ice-2` `line` `line-2` |
| Channels | `whatsapp` `whatsapp-dark` `instagram` `voice` |
| Type | `font-display` (Plus Jakarta Sans) · `font-sans` (Inter) · `font-mono` (JetBrains Mono) |

Page background is pure `#ffffff`. Channel accents stay at their real brand
colors so each service is instantly recognisable.

Two named treatments are defined as component utilities in the same file:

- `.text-gradient-drift` — the hero headline. Six-stop gradient at 220% width
  drifting on a 7s loop: `#60a5fa → #a5f3fc → #67e8f9 → #c4b5fd → #93c5fd → #5eead4`.
- `.text-gradient-brand` — logo and small accents, brand blue into cyan.

## Structure

```
src/
├── components/
│   ├── ui/          Button, Card, Badge, Input, Rating, Skeleton, Toast, Logo, BrandIcons
│   ├── layout/      Navbar, Footer, Layout, AuthLayout
│   ├── property/    PropertyCard, PropertyFilters, PropertyGallery, AgentCard
│   └── sections/    Hero, Channels, AIFeatures, PricingTable, FAQ, CTA, ConciergeWidget…
├── pages/           One file per route, all lazy-loaded
├── hooks/           useScrolled, useMediaQuery, useCountUp, useLocalStorage, useLockBodyScroll
├── services/        api.js (fetch wrapper) + properties / ai services
├── context/         AppContext — favourites, compare, session, toasts
├── data/            Mock inventory, agents, site copy, image helper
├── utils/           cn, format, constants
└── routes.jsx       Single route table
```

## Backend integration

Services are the only place that talks to the network. Each function has a mock
branch and a live branch with **identical signatures and return shapes**:

```js
const USE_MOCKS = import.meta.env.VITE_USE_MOCKS !== 'false'
```

Set `VITE_USE_MOCKS=false` once the FastAPI endpoints exist. In development
`vite.config.js` proxies `/api` → `http://localhost:8000`, so no CORS setup is
needed. Expected endpoints:

| Endpoint | Used by |
| --- | --- |
| `GET /api/properties` | Listings page (filters, sort, pagination) |
| `GET /api/properties/{slug}` | Property detail |
| `GET /api/properties/{slug}/similar` | Similar homes |
| `GET /api/properties/featured` | Home page |
| `POST /api/ai/valuation` | Valuation page |
| `POST /api/ai/concierge` | Floating assistant |
| `POST /api/auth/login` · `/register` | Auth pages |

`api.js` reads the bearer token from `localStorage['estatly.token']` and unwraps
FastAPI's `detail` field into an `ApiError`.

## Not yet wired

Built as UI with clearly marked placeholders:

- **Google Maps** — the location block on the detail page is a styled placeholder.
- **Stripe** — pricing CTAs route to `/register`; no checkout session yet.
- **Auth** — `login()` writes a local profile object; no real token exchange.
