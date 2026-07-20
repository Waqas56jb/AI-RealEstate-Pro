import { avatar, photo } from './images'

export const site = {
  name: 'Estatly',
  tagline: 'Real estate, answered by AI',
  email: 'hello@estatly.ai',
  phone: '+1 (415) 555-0100',
  address: '450 Mission Street, San Francisco, CA 94105',
}

export const navLinks = [
  { label: 'Buy', to: '/listings?status=sale' },
  { label: 'Rent', to: '/listings?status=rent' },
  { label: 'AI Valuation', to: '/valuation' },
  { label: 'Agents', to: '/agents' },
  { label: 'Pricing', to: '/pricing' },
]

export const footerNav = [
  {
    title: 'Product',
    links: [
      { label: 'Browse listings', to: '/listings' },
      { label: 'AI valuation', to: '/valuation' },
      { label: 'Agent network', to: '/agents' },
      { label: 'Pricing', to: '/pricing' },
      { label: 'Dashboard', to: '/dashboard' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Contact', to: '/contact' },
      { label: 'Careers', to: '/about#careers' },
      { label: 'Press', to: '/about#press' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Market reports', to: '/about#reports' },
      { label: 'Buyer guide', to: '/about#guide' },
      { label: 'API docs', to: '/about#api' },
      { label: 'Status', to: '/about#status' },
    ],
  },
]

export const stats = [
  { value: 128000, suffix: '+', label: 'Listings indexed' },
  { value: 2.4, suffix: 's', label: 'Median AI reply', decimals: 1 },
  { value: 96, suffix: '%', label: 'Valuation accuracy' },
  { value: 41, suffix: 'k', label: 'Deals closed' },
]

/** Channel accents stay at their real brand colors — instant recognition. */
export const channels = [
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    color: 'var(--color-whatsapp)',
    hover: 'var(--color-whatsapp-dark)',
    headline: 'Buyers message, AI replies',
    body: 'Enquiries land in WhatsApp and get an answer in seconds — price history, floor plans, and a booked viewing, without an agent touching the thread.',
    metric: '2.4s median reply',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    color: 'var(--color-instagram)',
    hover: '#b81f63',
    headline: 'Every DM qualified',
    body: 'Story replies and DMs are read, scored and routed. Cold traffic is answered politely; qualified buyers reach an agent already briefed.',
    metric: '3.1× more qualified leads',
  },
  {
    id: 'voice',
    name: 'Voice',
    color: 'var(--color-voice)',
    hover: '#d97706',
    headline: 'Calls never go to voicemail',
    body: 'A natural-voice agent picks up on the first ring at any hour, answers from the live listing data, and books the viewing into your calendar.',
    metric: '100% call pickup',
  },
]

export const aiFeatures = [
  {
    icon: 'Sparkles',
    title: 'Instant valuation',
    body: 'A gradient-boosted model trained on 12 million transactions returns a defensible price band in under three seconds — with the comparables that drove it.',
  },
  {
    icon: 'Compass',
    title: 'Recommendation engine',
    body: 'Learns from what a buyer opens, saves and skips. By the tenth listing it is surfacing homes they would never have searched for.',
  },
  {
    icon: 'MessageSquare',
    title: 'Multi-channel concierge',
    body: 'One AI agent across WhatsApp, Instagram and voice. Same context, same tone, same listing data — no lead waits for office hours.',
  },
  {
    icon: 'TrendingUp',
    title: 'Market forecasting',
    body: 'Twelve-month price trajectory per postcode, with the confidence interval shown honestly rather than hidden behind a single number.',
  },
  {
    icon: 'ScanSearch',
    title: 'Photo intelligence',
    body: 'Vision models read every listing image to tag finish quality, natural light and renovation state — so search filters reflect reality, not copywriting.',
  },
  {
    icon: 'ShieldCheck',
    title: 'Fraud screening',
    body: 'Duplicate, stale and misrepresented listings are flagged before publication. 1 in 30 submissions never reaches a buyer.',
  },
]

export const howItWorks = [
  {
    step: '01',
    title: 'Tell us what matters',
    body: 'Budget, commute, school catchment, light, noise. Plain sentences work — the model parses them into structured filters.',
  },
  {
    step: '02',
    title: 'AI shortlists for you',
    body: 'Every listing is scored against your brief and re-ranked as you react. The shortlist tightens with each session.',
  },
  {
    step: '03',
    title: 'Book without the back-and-forth',
    body: 'Pick a slot from the live calendar. The agent arrives already briefed on what you liked and what you rejected.',
  },
  {
    step: '04',
    title: 'Close with the numbers in hand',
    body: 'Valuation band, comparables, and a negotiation position generated from the seller-side signals we can legally observe.',
  },
]

export const testimonials = [
  {
    id: 't1',
    name: 'Priya Raghunathan',
    role: 'Buyer · Seattle',
    photo: avatar('photo-1487412720507-e7ab37603c6f'),
    rating: 5,
    quote:
      'I messaged at 11pm expecting nothing until morning. It answered in seconds, sent the floor plan, and had me booked for Saturday. We closed on that house.',
  },
  {
    id: 't2',
    name: 'Marcus Adeyemi',
    role: 'Principal, Adeyemi Property',
    photo: avatar('photo-1519345182560-3f2917c472ef'),
    rating: 5,
    quote:
      'My team stopped losing weekend leads overnight. The AI qualifies, we close. Our conversion is up 38% on the same ad spend.',
  },
  {
    id: 't3',
    name: 'Elena Vasquez',
    role: 'Investor · Miami',
    photo: avatar('photo-1544005313-94ddf0286df2'),
    rating: 5,
    quote:
      'The valuation came in 4% under the asking price with the comparables attached. I took it to the seller and they moved. That one report paid for the year.',
  },
  {
    id: 't4',
    name: 'James Whitfield',
    role: 'Broker · Chicago',
    photo: avatar('photo-1500648767791-00dcc994a43e'),
    rating: 4,
    quote:
      'I was sceptical about an AI talking to my clients. Six months in, it handles the first three messages better than most junior agents I have hired.',
  },
]

export const pricing = [
  {
    id: 'starter',
    name: 'Starter',
    price: 0,
    period: 'forever',
    tagline: 'For buyers and sellers finding their footing.',
    features: [
      'Unlimited listing search',
      '3 AI valuations per month',
      'Saved searches & alerts',
      'WhatsApp concierge',
      'Community support',
    ],
    cta: 'Start free',
    highlight: false,
  },
  {
    id: 'pro',
    name: 'Professional',
    price: 149,
    period: 'per month',
    tagline: 'For working agents who cannot miss a lead.',
    features: [
      'Everything in Starter',
      'Unlimited AI valuations',
      'All three channels — WhatsApp, Instagram, voice',
      'CRM with lead scoring',
      'Open-house booking engine',
      'Market forecast reports',
      'Priority support',
    ],
    cta: 'Start 14-day trial',
    highlight: true,
    ribbon: 'Best value',
  },
  {
    id: 'brokerage',
    name: 'Brokerage',
    price: null,
    period: 'custom',
    tagline: 'For teams running multiple offices.',
    features: [
      'Everything in Professional',
      'Unlimited seats & offices',
      'Custom model fine-tuning',
      'White-label buyer portal',
      'API & webhook access',
      'SSO / SAML',
      'Dedicated success manager',
    ],
    cta: 'Talk to sales',
    highlight: false,
  },
]

export const faqs = [
  {
    q: 'How accurate is the AI valuation?',
    a: 'Median absolute error is 3.8% against closed sale prices over the last four quarters. Every estimate ships with a confidence band and the comparables behind it — if the model is unsure, the band widens rather than the number lying to you.',
  },
  {
    q: 'Will buyers know they are talking to an AI?',
    a: 'Yes. The assistant identifies itself in the first message on every channel. In practice disclosure has not hurt conversion — buyers care far more about a fast, accurate answer than about who typed it.',
  },
  {
    q: 'Can it hand over to a human agent?',
    a: 'At any point. You set the handover rules — budget threshold, intent score, or an explicit request. The agent receives the full transcript and a one-paragraph brief, so nobody repeats themselves.',
  },
  {
    q: 'Which markets do you cover?',
    a: 'Full coverage across the United States, Canada, the UAE and the UK. Valuation models are market-specific; recommendation and concierge features work anywhere you have listings.',
  },
  {
    q: 'How does it connect to my existing CRM?',
    a: 'Native integrations for Salesforce, HubSpot and Follow Up Boss, plus a REST API and webhooks for everything else. Most teams are live inside a day.',
  },
  {
    q: 'What happens to my data?',
    a: 'Your listings and conversations are yours. We do not train shared models on your data, and you can export or delete everything from the dashboard at any time.',
  },
]

export const categories = [
  {
    label: 'Villas',
    type: 'villa',
    count: 3120,
    image: photo('photo-1613490493576-7fde63acd811', { w: 800 }),
    span: 'lg:col-span-2 lg:row-span-2',
  },
  {
    label: 'Apartments',
    type: 'apartment',
    count: 8940,
    image: photo('photo-1560518883-ce09059eeffa', { w: 700 }),
  },
  {
    label: 'Penthouses',
    type: 'penthouse',
    count: 1240,
    image: photo('photo-1502005229762-cf1b2da7c5d6', { w: 700 }),
  },
  {
    label: 'Townhouses',
    type: 'townhouse',
    count: 2610,
    image: photo('photo-1518391846015-55a9cc003b25', { w: 700 }),
  },
  {
    label: 'Estates',
    type: 'estate',
    count: 540,
    image: photo('photo-1564013799919-ab600027ffc6', { w: 700 }),
  },
]

export const cities = [
  { name: 'New York', count: 12480, image: photo('photo-1519501025264-65ba15a82390', { w: 700 }) },
  { name: 'Miami', count: 6210, image: photo('photo-1571003123894-1f0594d2b5d9', { w: 700 }) },
  { name: 'Chicago', count: 5340, image: photo('photo-1477959858617-67f85cf4f1df', { w: 700 }) },
  { name: 'Los Angeles', count: 9870, image: photo('photo-1480714378408-67cf0d13bc1b', { w: 700 }) },
  { name: 'Seattle', count: 4120, image: photo('photo-1523905330026-b8bd1f5f320e', { w: 700 }) },
  { name: 'Austin', count: 3760, image: photo('photo-1576941089067-2de3c901e126', { w: 700 }) },
]

export const partners = [
  'Sotheby’s',
  'Compass',
  'Knight Frank',
  'RE/MAX',
  'Savills',
  'Douglas Elliman',
  'JLL Residential',
  'Christie’s',
]

export const aboutValues = [
  {
    title: 'Speed is the product',
    body: 'The agent who answers first wins the deal. Everything we build is measured against how fast a buyer gets a real answer.',
  },
  {
    title: 'Show the working',
    body: 'A number without its comparables is a guess. Every AI output on this platform can be traced back to the data that produced it.',
  },
  {
    title: 'Agents, amplified',
    body: 'We are not replacing agents. We are deleting the 4am admin so they can do the part only a human can do.',
  },
]

export const officeImages = [
  photo('photo-1497366754035-f200968a6e72', { w: 900 }),
  photo('photo-1522071820081-009f0129c71c', { w: 900 }),
  photo('photo-1600880292203-757bb62b4baf', { w: 900 }),
]
