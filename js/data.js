/* ============================================================
   Project case-study data — West + Park Commercial Group
   PLACEHOLDER CONTENT: every field is meant to be replaced with
   real project facts. Structure is final; words are not.
   ============================================================ */

export const PROJECTS = [
  {
    id: 'meridian-commons',
    name: 'Meridian Commons HQ',
    sector: 'Office',
    service: 'Design Build',
    location: 'Westfield Business District',
    scene: 'tower',
    size: '86,000 SF',
    duration: '14 months',
    delivery: 'Design-Build',
    year: '2025',
    summary:
      'A six-story corporate headquarters delivered design-build — from first sketch to ribbon cutting in fourteen months, two weeks ahead of schedule.',
    challenge:
      'The client had outgrown three separate buildings and needed a consolidated headquarters on a fast-track schedule, on a tight urban infill site with two active neighbors.',
    solution:
      'We ran preconstruction and design in parallel, locked the structural package early, and prefabricated the curtain-wall assemblies off-site. Just-in-time deliveries kept the site — and the neighbors — moving.',
    stats: [
      ['Delivered', '2 weeks early'],
      ['Change orders', '< 1.5% of contract'],
      ['Recordable incidents', '0'],
    ],
    quote: {
      text: 'West + Park ran this job like they owned the building. Every decision came to us early, priced, and with a recommendation.',
      author: 'D. Whitmore',
      role: 'Director of Facilities, Meridian Financial',
    },
  },
  {
    id: 'granite-line-logistics',
    name: 'Granite Line Logistics Center',
    sector: 'Industrial',
    service: 'General Contracting',
    location: 'North Corridor Industrial Park',
    scene: 'industrial',
    size: '240,000 SF',
    duration: '11 months',
    delivery: 'GC — Competitive Bid',
    year: '2024',
    summary:
      'A quarter-million square feet of tilt-up distribution space with 28 dock positions, delivered through a winter build without losing a day to weather.',
    challenge:
      'The pro-forma only worked if the facility was receiving freight before peak season — an 11-month ceiling with a winter concrete schedule in the middle of it.',
    solution:
      'We re-sequenced the pour schedule around enclosure, heated the slab curing, and self-performed the concrete package to control the critical path directly.',
    stats: [
      ['Schedule', 'On time'],
      ['Tilt panels', '118 set in 19 days'],
      ['Recordable incidents', '0'],
    ],
    quote: {
      text: 'They told us in week two which decisions would matter in month nine. That is what kept this building on schedule.',
      author: 'R. Calloway',
      role: 'VP Development, Granite Line Partners',
    },
  },
  {
    id: 'harrow-street-collective',
    name: 'The Harrow Street Collective',
    sector: 'Retail',
    service: 'Construction Management',
    location: 'Harrow Street, Old Market',
    scene: 'retail',
    size: '42,000 SF',
    duration: '9 months',
    delivery: 'CM at-Risk',
    year: '2025',
    summary:
      'A tired 1960s retail block reborn as a flagship mixed-retail destination — new storefronts, new systems, and three anchor tenants opened on one coordinated day.',
    challenge:
      'Three tenant fit-outs with three different designers had to land inside one shell renovation — with the street staying open for business the entire time.',
    solution:
      'As CM we became the single point of coordination: one logistics plan, one master schedule, weekly tenant alignment. Night work handled the noisy scopes; the sidewalk never closed.',
    stats: [
      ['Tenant openings', '3 on one day'],
      ['Street closures', '0'],
      ['Repeat client', 'Yes — 2 further sites'],
    ],
    quote: {
      text: 'Coordinating three tenants through one renovation should have been chaos. It was the calmest project I have run.',
      author: 'S. Ibarra',
      role: 'Asset Manager, Old Market Holdings',
    },
  },
  {
    id: 'northgate-medical',
    name: 'Northgate Medical Pavilion',
    sector: 'Healthcare',
    service: 'Preconstruction',
    location: 'Northgate Health Campus',
    scene: 'medical',
    size: '58,000 SF',
    duration: '16 months',
    delivery: 'Design-Build',
    year: '2024',
    summary:
      'An outpatient pavilion with imaging, surgery, and clinic floors — built to hospital-grade standards on an active healthcare campus.',
    challenge:
      'The site sat forty feet from an operating emergency department. Vibration, dust, and utility tie-ins all had to happen without interrupting patient care for a single hour.',
    solution:
      'Preconstruction mapped every utility shutdown eight months ahead. Tie-ins ran in planned overnight windows with hospital staff in the room, and vibration monitoring streamed live to campus facilities.',
    stats: [
      ['Unplanned outages', '0'],
      ['ICRA compliance', '100% audited'],
      ['Delivered', 'On budget'],
    ],
    quote: {
      text: 'They treated our patients like their clients. Every shutdown was planned to the minute and executed to the minute.',
      author: 'M. Osei',
      role: 'COO, Northgate Health',
    },
  },
  {
    id: 'foundry-hall',
    name: 'Foundry Hall',
    sector: 'Hospitality',
    service: 'General Contracting',
    location: 'South Foundry District',
    scene: 'hospitality',
    size: '12,500 SF',
    duration: '7 months',
    delivery: 'GC — Negotiated',
    year: '2025',
    summary:
      'A century-old machine shop converted into a restaurant hall and bar — original steel exposed, every system behind it brand new.',
    challenge:
      'The building predated its own drawings. Behind every wall was a surprise, and the operator had a hard opening date tied to festival season.',
    solution:
      'We laser-scanned the entire structure in week one, priced discovery allowances honestly up front, and kept a standing owner-architect huddle twice a week so surprises became decisions within days, not weeks.',
    stats: [
      ['Opened', 'On the announced date'],
      ['Original steel retained', '92%'],
      ['Discovery overrun', 'Under allowance'],
    ],
    quote: {
      text: 'Old buildings punish contractors who guess. West + Park never guessed — they scanned, they priced, they told the truth.',
      author: 'J. Marsh',
      role: 'Owner, Foundry Hall Hospitality',
    },
  },
  {
    id: 'atlas-center-lobby',
    name: 'Atlas Center Repositioning',
    sector: 'Office',
    service: 'Facility Services',
    location: 'Atlas Center, Financial Quarter',
    scene: 'lobby',
    size: '18,000 SF',
    duration: '5 months',
    delivery: 'CM at-Risk',
    year: '2026',
    summary:
      'A dated Class-B lobby and amenity floor repositioned to Class-A — completed nights and weekends in a fully occupied tower.',
    challenge:
      'Six hundred people badge through this lobby every morning. The owner needed a transformation their tenants would notice and a construction project they would not.',
    solution:
      'All demolition and deliveries ran between 7 PM and 5 AM behind a finished temporary corridor. Tenants left on Friday and found a new feature wall on Monday — five Mondays in a row.',
    stats: [
      ['Tenant complaints', '0 formal'],
      ['Building occupancy', '100% throughout'],
      ['Leasing velocity', '+31% post-completion'],
    ],
    quote: {
      text: 'Our tenants experienced the renovation as a series of pleasant surprises. That is the highest compliment I can pay a contractor.',
      author: 'L. Fontaine',
      role: 'GM, Atlas Center',
    },
  },
];

export const SECTORS = ['All', ...new Set(PROJECTS.map((p) => p.sector))];

export const SERVICES = [
  {
    id: 'preconstruction',
    name: 'Preconstruction',
    blurb:
      'Budgets you can bank on before the first drawing is finished — estimating, constructability review, value engineering, and schedule modeling.',
    points: ['Conceptual & milestone estimating', 'Constructability reviews', 'Value engineering with real options', 'Long-lead procurement strategy'],
  },
  {
    id: 'construction-management',
    name: 'Construction Management',
    blurb:
      'One accountable partner managing cost, schedule, and quality with open books — CM at-risk or agency, sized to your project.',
    points: ['CM at-risk & agency CM', 'Open-book cost control', 'Master scheduling & logistics', 'Multi-stakeholder coordination'],
  },
  {
    id: 'general-contracting',
    name: 'General Contracting',
    blurb:
      'Hard-bid or negotiated, we deliver the documents as drawn — with self-performed concrete and carpentry keeping the critical path in our own hands.',
    points: ['Lump-sum & negotiated contracts', 'Self-performed key trades', 'Aggressive, honest scheduling', 'Zero-surprise closeout'],
  },
  {
    id: 'design-build',
    name: 'Design Build',
    blurb:
      'One contract, one team, one number. We carry design and construction together so scope, budget, and schedule never argue.',
    points: ['Single-source accountability', 'Architect-led partnerships', 'Guaranteed maximum price', 'Fast-track delivery'],
  },
  {
    id: 'facility-services',
    name: 'Facility Services',
    blurb:
      'The partnership continues after the ribbon cutting — occupied renovations, tenant improvements, maintenance programs, and emergency response.',
    points: ['Occupied-building renovation', 'Tenant improvements', 'Planned maintenance programs', '24/7 emergency response'],
  },
];

export const METHOD = [
  {
    step: '01',
    name: 'Discover',
    time: 'Weeks 1–2',
    text: 'We listen first. Site walk, goals, constraints, budget reality — you leave the first meeting knowing whether your project is feasible and what it will take.',
  },
  {
    step: '02',
    name: 'Define',
    time: 'Weeks 2–6',
    text: 'Preconstruction turns intent into numbers: estimates, schedule model, procurement plan, and the risks named out loud — before you commit.',
  },
  {
    step: '03',
    name: 'Design',
    time: 'Months 2–5',
    text: 'Working alongside your architect (or bringing ours), we price the design as it develops so the budget and the drawings never drift apart.',
  },
  {
    step: '04',
    name: 'Deliver',
    time: 'Construction',
    text: 'A dedicated superintendent, a weekly owner report you can read in five minutes, and a site your neighbors will compliment. Zero-surprise is the standard.',
  },
  {
    step: '05',
    name: 'Stand Behind',
    time: 'Years 1–2+',
    text: 'A written two-year workmanship warranty, an 11-month walkthrough before it expires, and a facilities team on call after it does.',
  },
];

export const STATS = [
  { value: 25, suffix: '+', label: 'Years building' },
  { value: 400, suffix: '+', label: 'Projects delivered' },
  { value: 87, suffix: '%', label: 'Repeat & referral clients' },
  { value: 0.68, suffix: '', label: 'Safety EMR', decimals: 2 },
];
