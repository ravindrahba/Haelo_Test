// Central content model for HAELO by HBA.
// Structure and copy follow the supplied wireframe / flowmap and brand deck.

export const site = {
  name: 'HAELO',
  parent: 'HBA',
  tagline: 'Most talent advisors understand hiring. We understand design.',
  intro:
    "Born from HBA's global design legacy, HAELO helps ambitious organisations build the teams behind exceptional brands, destinations and experiences.",
  contact: {
    company: 'HAELO LIMITED',
    address: ['Units 1, 10-13, 27, 1/F K11 Atelier', "King's Road, 728 King's Road", 'Quarry Bay, Hong Kong'],
    phone: '+65 4508 6028',
    email: 'info@haelopeople.com',
  },
} as const

export const nav = [
  { label: 'Home', to: '/' },
  { label: 'Talent Advisory', to: '/talent-advisory' },
  { label: 'Talent Search', to: '/talent-search' },
  { label: 'Clients', to: '/clients' },
  { label: 'About', to: '/about' },
  { label: 'Insights', to: '/insights' },
] as const

export type HeroSlide = {
  id: string
  image: string
  lead?: string
  lines: string[]
  accent: number
  caption?: string
  bullets?: string[]
}

export const heroSlides: HeroSlide[] = [
  {
    id: 'future',
    image: '/images/hero-1.webp',
    lines: ['HAELO designs the teams', 'that design', 'the future.'],
    accent: 2,
    caption:
      "Born from HBA's global design legacy, HAELO helps ambitious organisations build the teams behind exceptional brands, destinations and experiences.",
  },
  {
    id: 'engage',
    image: '/images/hero-2.webp',
    lines: ['We understand what', 'success requires — and', 'partner with you', 'to achieve it.'],
    accent: 3,
    bullets: ['Defining direction', 'Aligning leadership', 'Shaping teams over time'],
  },
  {
    id: 'origin',
    image: '/images/hero-3.webp',
    lines: ['Born from design,', 'built for creative', 'organisations.'],
    accent: 1,
    caption: 'We understand how creative organisations operate because we have helped build them from within.',
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

// Home — "Built for the design economy"; also the audiences on the Clients page.
export const sectors = [
  { id: 'hospitality', title: 'Hospitality and lifestyle', body: 'Hotels, resorts and experiential brands requiring design-led talent strategies.' },
  { id: 'real-estate', title: 'Real estate and development', body: 'Developers and investors building the next generation of destinations.' },
  { id: 'design-studios', title: 'Design studios and creative agencies', body: 'Creative firms scaling teams and building organisational capability.' },
  { id: 'innovation', title: 'Innovation and technology', body: 'Design-adjacent businesses transforming industries through creative thinking.' },
]

// Home — "Two ways to work with HAELO"
export const services = [
  {
    id: 'talent-advisory',
    eyebrow: 'Two ways to work with HAELO',
    kicker: 'Talent Advisory',
    title: 'Design the organisation your ambition requires.',
    body: 'For organisations defining future capability, team structures and leadership needs — we shape the teams before the roles are filled.',
    image: '/images/service-advisory.webp',
    to: '/talent-advisory',
    align: 'right' as const,
  },
  {
    id: 'talent-search',
    eyebrow: 'Two ways to work with HAELO',
    kicker: 'Talent Search',
    title: 'Find the people who move the needle.',
    body: 'For organisations that know what they need — we identify and secure exceptional talent across design, hospitality, development and innovation.',
    image: '/images/service-talent.webp',
    to: '/talent-search',
    align: 'left' as const,
  },
]

// ---- Talent Advisory page ---------------------------------------------------
export const advisoryServices = [
  { title: 'Team Design', body: 'Shape the structure and composition of your team to drive future growth.' },
  { title: 'Leadership Planning', body: 'Identify and plan for the leadership roles that will define your organisation’s trajectory.' },
  { title: 'Talent Mapping', body: 'Assess internal and external talent to align with your strategic objectives.' },
  { title: 'Organisation Reviews', body: 'Evaluate current structures and processes to ensure alignment with your goals.' },
  { title: 'Hiring Frameworks', body: 'Develop robust hiring strategies for consistency and lasting impact.' },
  { title: 'Creative Capability Planning', body: 'Design the skillsets and creative strengths your organisation needs next.' },
]

// ---- Talent Search page -----------------------------------------------------
export const searchDisciplines = [
  'Interior Design',
  'Architecture',
  'Project Management',
  'Brand & Marketing',
  'Business Development',
  'Graphics & Branding',
  'BIM & Digital Design',
  'Creative Leadership',
]

export const whyChoose = [
  { title: 'Global Reach', body: 'Access to exceptional talent across more than 25 international markets.' },
  { title: 'Creative Industry Expertise', body: 'Built within one of the world’s leading design businesses.' },
  { title: 'Exclusive Access', body: 'Relationships and networks beyond visible talent markets.' },
  { title: 'Long-Term Fit', body: 'People selected for where your organisation is heading, not simply where it is today.' },
]

// ---- Clients page -----------------------------------------------------------
export const clientTypes = [
  {
    title: 'Hospitality & Lifestyle',
    body: 'Hotels, resorts, operators and hospitality brands building exceptional guest experiences, service cultures and hospitality teams.',
  },
  {
    title: 'Developers & Destination Creators',
    body: 'Developers and investors creating hotels, communities and experiences — responsible for bringing ambitious visions to life.',
  },
  {
    title: 'Design Studios & Creative Businesses',
    body: 'Architecture, interior design, branding and multidisciplinary practices scaling without losing the culture and creativity that made them successful.',
  },
  {
    title: 'Innovation & Technology',
    body: 'Businesses shaping the future of design, experience and the built environment — building capability in emerging and rapidly evolving fields.',
  },
]

export const caseStudies = [
  {
    title: 'Building a New Market Presence',
    location: 'Spain',
    challenge: 'Establish a new studio presence in Spain.',
    approach: 'Mapped talent across the wider Spanish market to identify a creative leader capable of building both team and business.',
    outcome: 'Secured the leadership appointment that helped establish HBA’s presence in Madrid.',
  },
  {
    title: 'Building Future Capability',
    location: 'Asia Pacific',
    challenge: 'Build internal AI and technology capability.',
    approach: 'Identified architects and designers operating at the intersection of design, technology and innovation.',
    outcome: 'Helped establish a dedicated R&D function that has since expanded across the organisation.',
  },
  {
    title: 'Finding Entrepreneurial Leadership',
    location: 'United Arab Emirates',
    challenge: 'Strengthen and grow a regional lighting design practice.',
    approach: 'Targeted entrepreneurial leaders from founder-led businesses rather than traditional corporate candidates.',
    outcome: 'Secured a senior leader who now drives the growth of the regional practice.',
  },
  {
    title: 'Strengthening Multidisciplinary Capability',
    location: 'Hong Kong',
    challenge: 'Support the OneHBA vision through integrated design leadership.',
    approach: 'Conducted a confidential search for a leader spanning architecture, interiors and team leadership.',
    outcome: 'Appointed a Partner-level leader to strengthen HBA’s multidisciplinary offering.',
  },
]

// ---- Insights / About -------------------------------------------------------
export const stats = [
  { value: '60+', label: 'Years of design leadership, via HBA' },
  { value: '4', label: 'Continents served' },
  { value: '300+', label: 'Teams built' },
  { value: '1,200+', label: 'Leaders placed' },
]

export const founder = {
  quote:
    'HAELO was created to move beyond transactional hiring — bringing a more strategic, design-led approach to talent. Working closely with senior leadership, and combining deep industry relationships with HBA’s global insight, we shape teams that perform and endure.',
  name: 'Doris Li',
  role: 'Founder, HAELO',
}

// The Team — "We are Embedded Talent Advisors" (deck p.11)
export const team = [
  { name: 'Doris Li', role: 'HR & Talent Acquisition Director', location: 'Singapore', photo: '/images/team/doris.webp' },
  { name: 'Viola Zhang', role: 'Talent Acquisition Manager', location: 'Hong Kong', photo: '/images/team/viola.webp' },
  { name: 'Emma Hallend', role: 'Senior Talent Acquisition Specialist', location: 'Japan', photo: '/images/team/emma.webp' },
  { name: 'Katherine Costa', role: 'Senior Talent Acquisition Specialist', location: 'Italy', photo: '/images/team/katherine.webp' },
  { name: 'Czarina Laya', role: 'Talent Acquisition Specialist', location: 'Thailand', photo: '/images/team/czarina.webp' },
  { name: 'Ema Volkova', role: 'Talent Acquisition Coordinator', location: 'Spain', photo: '/images/team/ema.webp' },
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
