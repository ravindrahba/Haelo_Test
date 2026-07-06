// Central content model for HAELO by HBA.
// Copy is transcribed from the supplied design, with source typos corrected.

export const site = {
  name: 'HAELO',
  parent: 'HBA',
  tagline: 'Most talent advisors understand hiring. We understand design.',
  intro:
    "Born from HBA's global design legacy, HAELO helps ambitious organisations build the teams behind exceptional brands, destinations and experiences.",
  contact: {
    company: 'HAELO LIMITED',
    address: ["Units 1, 10-13, 27, 1/F K11 Atelier", "King's Road, 728 King's Road", 'Quarry Bay, Hong Kong'],
    phone: '+65 4508 6028',
    email: 'info@haelopeople.com',
  },
  social: [
    { label: 'LinkedIn', href: '#', icon: 'linkedin' },
    { label: 'Instagram', href: '#', icon: 'instagram' },
    { label: 'X', href: '#', icon: 'x' },
  ],
} as const

export const nav = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Sectors', to: '/sectors' },
  { label: 'Network', to: '/network' },
  { label: 'Careers', to: '/careers' },
  { label: 'Contact', to: '/contact' },
] as const

export type HeroSlide = {
  id: string
  image: string
  lead: string
  lines: string[]
  accent: number
  caption?: string
  bullets?: string[]
}

export const heroSlides: HeroSlide[] = [
  {
    id: 'future',
    image: '/images/hero-1.webp',
    lead: 'HAELO',
    lines: ['Designs the teams', 'that design', 'the future.'],
    accent: 2, // index of the line to accent in ember
    caption:
      "Born from HBA's global design legacy, HAELO helps ambitious organisations build the teams behind exceptional brands, destinations and experiences.",
  },
  {
    id: 'engage',
    image: '/images/hero-2.webp',
    lead: 'No matter',
    lines: ['how you engage with HAELO,', 'we understand what', 'success requires — and', 'partner with you to', 'achieve it.'],
    accent: 4,
    bullets: ['Defining direction', 'Aligning leadership', 'Shaping teams over time'],
  },
  {
    id: 'origin',
    image: '/images/hero-3.webp',
    lead: 'Born from design',
    lines: ['built for creative', 'organisations.'],
    accent: 1,
    caption:
      'We understand how creative organisations operate because we have helped build them from within.',
  },
]

export const differentiators = [
  'Design intelligence and creative-industry expertise',
  'Global talent networks and long-term partnerships',
  'Cultural alignment and transformative hiring outcomes',
]

export const whyTiles = [
  { eyebrow: 'We understand exceptional', title: 'Creative Talent', image: '/images/why-talent.webp' },
  { eyebrow: 'We understand exceptional', title: 'Creative Business', image: '/images/why-business.webp' },
]

export const sectors = [
  {
    id: 'hospitality',
    title: 'Hospitality and lifestyle',
    body: 'Hotels, resorts and experiential brands requiring design-led talent strategies.',
  },
  {
    id: 'real-estate',
    title: 'Real estate and development',
    body: 'Developers and investors building the next generation of destinations.',
  },
  {
    id: 'design-studios',
    title: 'Design studios and creative agencies',
    body: 'Creative firms scaling teams and building organisational capability.',
  },
  {
    id: 'innovation',
    title: 'Innovation and technology',
    body: 'Design-adjacent businesses transforming industries through creative thinking.',
  },
]

export const services = [
  {
    id: 'team-advisory',
    eyebrow: 'Our Services',
    kicker: 'Team Advisory',
    title: 'Design the organisation your ambition requires.',
    body: 'We help identify the capabilities, leadership and talent required for long-term success.',
    image: '/images/service-advisory.webp',
    align: 'right' as const,
  },
  {
    id: 'talent-identification',
    eyebrow: 'Our Services',
    kicker: 'Talent Identification',
    title: 'Find the people who move the needle.',
    body: 'For organisations that know what they need. We identify and secure exceptional talent across design, hospitality, development and innovation.',
    image: '/images/service-talent.webp',
    align: 'left' as const,
  },
]

export const cities = [
  { name: 'Hong Kong', x: 82.5, y: 45 },
  { name: 'Singapore', x: 79, y: 58 },
  { name: 'Dubai', x: 63, y: 46 },
  { name: 'London', x: 47.5, y: 30 },
  { name: 'New York', x: 27, y: 37 },
  { name: 'Los Angeles', x: 15, y: 40 },
  { name: 'Shanghai', x: 83, y: 40 },
  { name: 'Sydney', x: 90, y: 74 },
]

// Mock listings — structured so a Bullhorn feed can drop in later.
export const jobs = [
  { id: 'j1', title: 'Design Director — Luxury Hospitality', location: 'Dubai, UAE', type: 'Permanent', sector: 'Hospitality and lifestyle' },
  { id: 'j2', title: 'Head of Interiors', location: 'Singapore', type: 'Permanent', sector: 'Design studios and creative agencies' },
  { id: 'j3', title: 'Development Manager — Resorts', location: 'Hong Kong', type: 'Permanent', sector: 'Real estate and development' },
  { id: 'j4', title: 'Creative Technologist', location: 'London, UK', type: 'Contract', sector: 'Innovation and technology' },
  { id: 'j5', title: 'Principal — FF&E Procurement', location: 'New York, USA', type: 'Permanent', sector: 'Hospitality and lifestyle' },
  { id: 'j6', title: 'Brand Experience Lead', location: 'Remote', type: 'Permanent', sector: 'Design studios and creative agencies' },
]
