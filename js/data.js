/* ============================================================
   Project case-study data — West + Park Commercial Group
   Projects below are REAL W+P work (healthcare / occupied
   facilities). Fields marked TODO are awaiting details from
   the owner — facility names, sizes, dates, and photos.
   ============================================================ */

export const PROJECTS = [
  {
    id: 'medical-office-renovation',
    name: 'Medical Office Renovation',
    sector: 'Interior Renovation',
    service: 'General Contracting',
    location: 'Regional Medical Center', // TODO: real facility/campus name
    scene: 'lobby',
    size: 'Full office suite', // TODO: real SF / room count
    duration: 'Fast-track', // TODO: real schedule
    delivery: 'General Contracting',
    year: '2026', // TODO: confirm
    summary:
      'A complete interior turnover — walls, ceilings, and flooring — delivered inside a working medical facility without interrupting the day’s operations.',
    challenge:
      'The office sits inside an active healthcare environment: staff working, patients nearby, and no tolerance for dust, noise, or downtime spilling beyond the work zone.',
    solution:
      'We sequenced the work trade by trade behind sealed containment — demolition, framing and drywall, ceilings, then flooring — with clean daily turnovers so the facility ran normally through the entire renovation.',
    stats: [
      ['Scope', 'Walls · ceilings · floors'],
      ['Setting', 'Occupied facility'],
      ['Operations disrupted', 'None'],
    ],
  },
  {
    id: 'evs-closet-renovation',
    name: 'EVS Closet Rebuild',
    sector: 'Interior Renovation',
    service: 'General Contracting',
    location: 'Regional Medical Center', // TODO: real facility name
    scene: 'evsroom',
    size: 'Back-of-house service space', // TODO: real dimensions
    duration: 'Short-cycle', // TODO: real schedule
    delivery: 'General Contracting',
    year: '2026', // TODO: confirm
    summary:
      'Walls, ceilings, floors, and new shelving — a back-of-house environmental-services space rebuilt to the same standard as the front of the house.',
    challenge:
      'EVS spaces work hard: constant traffic, water, chemicals, and equipment. The rebuild had to stand up to daily hospital use — and the department couldn’t pause while it happened.',
    solution:
      'We rebuilt the room surface by surface with durable, cleanable finishes and installed storage shelving planned around how the EVS team actually works, keeping their operation running out of temporary space in the meantime.',
    stats: [
      ['Scope', 'Walls · ceilings · floors · shelving'],
      ['Finishes', 'Hospital-grade, cleanable'],
      ['EVS operations', 'Maintained throughout'],
    ],
  },
  {
    id: 'or-flooring',
    name: 'Operating Room Flooring',
    sector: 'Clinical Environments',
    service: 'Facility Services',
    location: 'Surgical suite, Regional Medical Center', // TODO: real facility name
    scene: 'surgical',
    size: 'Operating room', // TODO: number of ORs / SF
    duration: 'Scheduled OR downtime', // TODO: real window
    delivery: 'Facility Services',
    year: '2026', // TODO: confirm
    summary:
      'Complete flooring replacement inside an operating room — the most protocol-heavy square footage in any building, returned to service clean and on schedule.',
    challenge:
      'An OR floor isn’t a flooring job; it’s an infection-control operation. Every hour the room is down is a surgery not happening, and every step is governed by hospital protocols.',
    solution:
      'We worked inside the hospital’s infection-control requirements — containment, negative air, terminal-clean handoff — and compressed the flooring replacement into the scheduled downtime window so the OR came back online as planned.',
    stats: [
      ['Environment', 'Operating room'],
      ['Protocols', 'Infection-control compliant'],
      ['Return to service', 'On schedule'],
    ],
  },
  {
    id: 'emergency-leak-response',
    name: 'Same-Day Leak Response',
    sector: 'Emergency Response',
    service: 'Facility Services',
    location: 'Acute-care hospital', // TODO: real facility name
    scene: 'corridor',
    size: 'Affected wall & finishes', // TODO: real extent
    duration: 'Same day',
    delivery: 'Emergency call-out',
    year: '2026', // TODO: confirm
    summary:
      'An active leak inside a hospital, stopped — then sheetrock, insulation, and vinyl replaced and finished within the same day.',
    challenge:
      'Water was moving through an occupied hospital wall. In healthcare, a leak isn’t an inconvenience — it’s an infection-control and compliance problem that gets worse by the hour.',
    solution:
      'We stopped the leak, opened and dried the assembly, and replaced the sheetrock, insulation, and vinyl finish in one continuous same-day operation — the corridor closed in the morning was back in service that night.',
    stats: [
      ['Response', 'Same day, start to finish'],
      ['Scope', 'Sheetrock · insulation · vinyl'],
      ['Leak', 'Stopped and rebuilt'],
    ],
  },
  {
    id: 'water-shutdown-support',
    name: 'Campus Water Shutdown Support',
    sector: 'Facility Operations',
    service: 'Facility Services',
    location: 'Hospital-wide', // TODO: real facility name
    scene: 'medical',
    size: 'Entire campus',
    duration: 'Planned shutdown window', // TODO: real duration
    delivery: 'Labor support',
    year: '2026', // TODO: confirm
    summary:
      'Skilled labor support for a hospital-wide water shutdown and decontamination — with portable facilities keeping staff operational the entire time.',
    challenge:
      'Decontaminating a hospital’s water system means shutting water off across an entire campus that can never actually stop working. Hundreds of staff still need functioning facilities.',
    solution:
      'We supplied and coordinated the labor for the shutdown and decontamination sequence, and stood up portable facilities across the campus so clinical and support staff worked through the entire window without interruption.',
    stats: [
      ['Scale', 'Hospital-wide'],
      ['Staff facilities', 'Maintained throughout'],
      ['Patient care', 'Uninterrupted'],
    ],
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
      'Hard-bid or negotiated, we deliver the documents as drawn — with self-performed key trades keeping the critical path in our own hands.',
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
