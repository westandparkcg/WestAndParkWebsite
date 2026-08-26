/* ============================================================
   Procedural project imagery — West + Park Commercial Group
   Each scene is one geometry, rendered two ways:
     mode "after"  → duotone navy/gold architectural rendering
     mode "before" → blueprint wireframe of the same geometry
   Identical coordinates in both modes give the before/after
   sliders perfect registration. When real photography arrives,
   swap renderScene() output for <img> tags — nothing else moves.
   ============================================================ */

const W = 800;
const H = 600;

/* ---------- palette ---------- */
const P = {
  skyTop: '#050D1C',
  skyBottom: '#152947',
  ground: '#060F1F',
  mass: '#22304C',
  massDark: '#182540',
  panel: '#3D4A5E',
  panelLight: '#55647C',
  glass: '#10264C',
  glassDeep: '#0B1D3A',
  lit: '#C9A24B',
  litBright: '#E6C77E',
  litDim: '#8A6820',
  accent: '#C9A24B',
  line: '#0B1D3A',
  steel: '#BFC5CC',
  green: '#31504A',
};

/* ---------- primitive helpers ----------
   Each primitive: { d: svg shape attrs string, tag, role } */
function rect(x, y, w, h, role) {
  return { tag: 'rect', attrs: `x="${x}" y="${y}" width="${w}" height="${h}"`, role };
}
function poly(points, role) {
  return { tag: 'polygon', attrs: `points="${points}"`, role };
}
function circle(cx, cy, r, role) {
  return { tag: 'circle', attrs: `cx="${cx}" cy="${cy}" r="${r}"`, role };
}
function lineSeg(x1, y1, x2, y2, role) {
  return { tag: 'line', attrs: `x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"`, role };
}

/* Deterministic pseudo-random, so both modes agree on "random" lit windows */
function seeded(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/* Curtain-wall grid: returns window cells with some lit */
function windowGrid(x, y, w, h, cols, rows, seed, litChance = 0.34, gap = 4) {
  const prims = [];
  const rnd = seeded(seed);
  const cw = (w - gap * (cols - 1)) / cols;
  const ch = (h - gap * (rows - 1)) / rows;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const lit = rnd() < litChance;
      prims.push(rect(x + c * (cw + gap), y + r * (ch + gap), cw, ch, lit ? 'lit' : 'glass'));
    }
  }
  return prims;
}

/* ============================================================
   SCENE GEOMETRIES  (viewBox 0 0 800 600)
   ============================================================ */

const SCENES = {
  /* Mid-rise office HQ — curtain wall, gold entrance canopy */
  tower(prims) {
    prims.push(rect(0, 0, W, 448, 'sky'));
    prims.push(rect(0, 448, W, 152, 'ground'));
    // background low blocks
    prims.push(rect(20, 328, 150, 120, 'massDark'));
    prims.push(...windowGrid(32, 342, 126, 92, 4, 3, 7, 0.2));
    prims.push(rect(660, 300, 130, 148, 'massDark'));
    prims.push(...windowGrid(672, 314, 106, 120, 3, 4, 11, 0.2));
    // main tower
    prims.push(rect(210, 96, 300, 352, 'mass'));
    prims.push(rect(210, 96, 300, 18, 'panel'));         // parapet
    prims.push(...windowGrid(228, 130, 264, 240, 6, 6, 3, 0.4));
    // gold spandrel band
    prims.push(rect(210, 378, 300, 8, 'accent'));
    // lobby glazing
    prims.push(rect(228, 396, 264, 52, 'glassDeep'));
    prims.push(...windowGrid(236, 402, 248, 40, 8, 1, 5, 0.55, 6));
    // entrance canopy
    prims.push(poly('318,396 402,396 412,382 308,382', 'accent'));
    prims.push(rect(352, 404, 4, 44, 'line'));
    // side wing
    prims.push(rect(510, 208, 140, 240, 'panel'));
    prims.push(...windowGrid(524, 224, 112, 200, 3, 5, 9, 0.3));
    // plaza details
    prims.push(rect(120, 448, 560, 6, 'panel'));
    prims.push(circle(160, 432, 16, 'green'));
    prims.push(rect(156, 442, 8, 14, 'massDark'));
    prims.push(circle(586, 432, 16, 'green'));
    prims.push(rect(582, 442, 8, 14, 'massDark'));
    // flag light poles
    prims.push(lineSeg(230, 448, 230, 408, 'steelLine'));
    prims.push(circle(230, 405, 3, 'litDot'));
    prims.push(lineSeg(470, 448, 470, 408, 'steelLine'));
    prims.push(circle(470, 405, 3, 'litDot'));
  },

  /* Corporate lobby interior — reception, pendants, feature wall */
  lobby(prims) {
    prims.push(rect(0, 0, W, 600, 'massDark'));            // room shell
    prims.push(rect(0, 452, W, 148, 'ground'));            // floor
    prims.push(poly('0,452 800,452 800,600 0,600', 'ground'));
    // polished floor reflection strip
    prims.push(rect(0, 452, W, 10, 'panel'));
    // rear feature wall, wood-slat rhythm
    prims.push(rect(90, 96, 430, 356, 'mass'));
    for (let i = 0; i < 21; i++) {
      prims.push(rect(100 + i * 20, 108, 8, 332, 'panelSlat'));
    }
    // brand mark on wall
    prims.push(circle(305, 210, 46, 'accentRing'));
    prims.push(poly('285,236 298,182 306,182 296,222 310,192 318,192 305,236', 'accent'));
    // glazed wall right, city beyond
    prims.push(rect(560, 80, 220, 372, 'glassDeep'));
    prims.push(...windowGrid(572, 96, 196, 340, 4, 6, 13, 0.3));
    prims.push(lineSeg(560, 80, 560, 452, 'mullion'));
    prims.push(lineSeg(670, 80, 670, 452, 'mullion'));
    // reception desk
    prims.push(rect(196, 360, 260, 92, 'panel'));
    prims.push(rect(196, 360, 260, 10, 'accent'));
    prims.push(rect(212, 386, 228, 6, 'massDark'));
    // pendant lights
    for (const px of [150, 320, 490]) {
      prims.push(lineSeg(px, 0, px, 120, 'steelLine'));
      prims.push(circle(px, 132, 14, 'litGlow'));
    }
    // lounge
    prims.push(rect(600, 396, 120, 34, 'panel'));
    prims.push(rect(600, 386, 120, 12, 'accentSoft'));
    prims.push(circle(66, 400, 22, 'green'));
    prims.push(rect(56, 418, 20, 34, 'massDark'));
  },

  /* Distribution / industrial — gabled hall, clerestory, dock doors */
  industrial(prims) {
    prims.push(rect(0, 0, W, 460, 'sky'));
    prims.push(rect(0, 460, W, 140, 'ground'));
    // main hall
    prims.push(poly('90,240 400,160 710,240 710,460 90,460', 'mass'));
    prims.push(poly('90,240 400,160 710,240 710,258 400,180 90,258', 'panel')); // roof edge
    // clerestory band
    prims.push(...windowGrid(150, 280, 500, 34, 10, 1, 17, 0.5, 8));
    // dock doors
    for (let i = 0; i < 4; i++) {
      const dx = 150 + i * 130;
      prims.push(rect(dx, 350, 96, 110, 'glassDeep'));
      prims.push(rect(dx, 350, 96, 8, 'accent'));
      for (let s = 1; s < 5; s++) prims.push(lineSeg(dx, 350 + s * 22, dx + 96, 350 + s * 22, 'mullion'));
    }
    // office pod
    prims.push(rect(660, 330, 120, 130, 'panel'));
    prims.push(...windowGrid(672, 344, 96, 70, 3, 2, 19, 0.5));
    // silo + stack
    prims.push(rect(40, 300, 34, 160, 'panelLight'));
    prims.push(circle(57, 300, 17, 'panelLight'));
    // yard
    prims.push(rect(90, 460, 620, 5, 'panel'));
    prims.push(lineSeg(140, 520, 220, 520, 'steelLine'));
    prims.push(lineSeg(300, 540, 380, 540, 'steelLine'));
  },

  /* Retail flagship — storefront, awning, signage band */
  retail(prims) {
    prims.push(rect(0, 0, W, 452, 'sky'));
    prims.push(rect(0, 452, W, 148, 'ground'));
    // block
    prims.push(rect(110, 130, 580, 322, 'mass'));
    prims.push(rect(110, 130, 580, 16, 'panel'));
    // upper windows
    prims.push(...windowGrid(140, 168, 520, 108, 5, 2, 23, 0.35));
    // signage band
    prims.push(rect(110, 292, 580, 40, 'accent'));
    prims.push(rect(310, 302, 180, 20, 'line'));
    // storefront glazing
    prims.push(rect(140, 348, 520, 104, 'glassDeep'));
    prims.push(...windowGrid(148, 356, 504, 88, 6, 1, 29, 0.65, 8));
    // awnings
    for (let i = 0; i < 3; i++) {
      prims.push(poly(`${150 + i * 180},348 ${310 + i * 180},348 ${296 + i * 180},326 ${164 + i * 180},326`, 'accentSoft'));
    }
    // door
    prims.push(rect(384, 368, 64, 84, 'lit'));
    // street
    prims.push(rect(60, 452, 680, 6, 'panel'));
    prims.push(circle(96, 430, 15, 'green'));
    prims.push(rect(92, 442, 8, 12, 'massDark'));
    prims.push(circle(716, 430, 15, 'green'));
    prims.push(rect(712, 442, 8, 12, 'massDark'));
    prims.push(lineSeg(200, 452, 200, 414, 'steelLine'));
    prims.push(circle(200, 411, 3, 'litDot'));
    prims.push(lineSeg(620, 452, 620, 414, 'steelLine'));
    prims.push(circle(620, 411, 3, 'litDot'));
  },

  /* Medical campus — horizontal banding, drop-off canopy */
  medical(prims) {
    prims.push(rect(0, 0, W, 456, 'sky'));
    prims.push(rect(0, 456, W, 144, 'ground'));
    // stepped massing
    prims.push(rect(120, 180, 340, 276, 'mass'));
    prims.push(rect(430, 250, 260, 206, 'panel'));
    // horizontal ribbon windows
    for (let r = 0; r < 4; r++) {
      prims.push(rect(140, 204 + r * 56, 300, 30, r % 2 ? 'glass' : 'lit'));
      for (let c = 1; c < 8; c++) prims.push(lineSeg(140 + c * 37.5, 204 + r * 56, 140 + c * 37.5, 234 + r * 56, 'mullion'));
    }
    prims.push(...windowGrid(448, 272, 224, 150, 5, 3, 31, 0.3));
    // entrance canopy + cross-free wayfinding blade
    prims.push(rect(240, 396, 190, 60, 'glassDeep'));
    prims.push(...windowGrid(248, 404, 174, 44, 4, 1, 37, 0.6, 6));
    prims.push(poly('210,396 462,396 474,376 198,376', 'accent'));
    prims.push(rect(150, 340, 26, 116, 'accentSoft'));   // blade sign
    // helipad-ish circle garden
    prims.push(circle(700, 500, 34, 'green'));
    prims.push(circle(700, 500, 22, 'ground'));
    // drop-off drive
    prims.push(rect(100, 456, 600, 5, 'panel'));
    prims.push(circle(120, 436, 14, 'green'));
    prims.push(rect(116, 446, 8, 12, 'massDark'));
  },

  /* Hospitality interior — restaurant/bar build-out */
  hospitality(prims) {
    prims.push(rect(0, 0, W, 600, 'massDark'));
    prims.push(rect(0, 440, W, 160, 'ground'));
    // exposed ceiling joists
    for (let i = 0; i < 9; i++) prims.push(rect(40 + i * 88, 0, 10, 84, 'panel'));
    // back bar
    prims.push(rect(80, 150, 330, 290, 'mass'));
    prims.push(rect(96, 170, 298, 120, 'glassDeep'));       // shelving recess
    for (let i = 0; i < 3; i++) prims.push(rect(96, 170 + i * 40, 298, 4, 'accentSoft'));
    for (let i = 0; i < 12; i++) {
      prims.push(rect(110 + i * 24, 186 + (i % 3) * 40 - 16 + 16, 10, 22, i % 3 === 1 ? 'lit' : 'steelBottle'));
    }
    // bar counter
    prims.push(rect(60, 340, 370, 100, 'panel'));
    prims.push(rect(60, 340, 370, 12, 'accent'));
    // stools
    for (const sx of [110, 200, 290, 380]) {
      prims.push(circle(sx, 466, 13, 'accentSoft'));
      prims.push(rect(sx - 3, 476, 6, 40, 'panel'));
    }
    // arched windows right
    for (let i = 0; i < 2; i++) {
      const ax = 500 + i * 150;
      prims.push(rect(ax, 190, 110, 250, 'glassDeep'));
      prims.push(circle(ax + 55, 190, 55, 'glassArch'));
      prims.push(lineSeg(ax + 55, 135, ax + 55, 440, 'mullion'));
      prims.push(lineSeg(ax, 300, ax + 110, 300, 'mullion'));
    }
    // pendants over bar
    for (const px of [140, 245, 350]) {
      prims.push(lineSeg(px, 84, px, 150, 'steelLine'));
      prims.push(poly(`${px - 14},150 ${px + 14},150 ${px + 7},168 ${px - 7},168`, 'litGlow'));
    }
    // tables
    prims.push(rect(480, 460, 90, 10, 'panel'));
    prims.push(rect(516, 470, 10, 50, 'panel'));
    prims.push(rect(630, 460, 90, 10, 'panel'));
    prims.push(rect(666, 470, 10, 50, 'panel'));
  },
};

/* ============================================================
   RENDERERS
   ============================================================ */

const AFTER_FILL = {
  sky: 'url(#wpSky)',
  ground: P.ground,
  mass: P.mass,
  massDark: P.massDark,
  panel: P.panel,
  panelLight: P.panelLight,
  panelSlat: '#2C3A58',
  glass: P.glass,
  glassDeep: P.glassDeep,
  glassArch: P.glass,
  lit: 'url(#wpLit)',
  litGlow: P.litBright,
  litDot: P.litBright,
  accent: P.accent,
  accentSoft: P.litDim,
  accentRing: 'none',
  green: P.green,
  line: P.line,
  steelBottle: P.steel,
};

function renderAfter(prims, id) {
  const body = prims
    .map((p) => {
      const fill = AFTER_FILL[p.role] ?? '#FF00FF';
      if (p.role === 'mullion') return `<${p.tag} ${p.attrs} stroke="${P.line}" stroke-width="3"/>`;
      if (p.role === 'steelLine') return `<${p.tag} ${p.attrs} stroke="${P.panelLight}" stroke-width="4"/>`;
      if (p.role === 'accentRing') return `<${p.tag} ${p.attrs} fill="none" stroke="${P.accent}" stroke-width="4"/>`;
      if (p.tag === 'line') return `<${p.tag} ${p.attrs} stroke="${fill}" stroke-width="4"/>`;
      return `<${p.tag} ${p.attrs} fill="${fill}"/>`;
    })
    .join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Architectural rendering of the completed project">
  <defs>
    <linearGradient id="wpSky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${P.skyTop}"/><stop offset="1" stop-color="${P.skyBottom}"/>
    </linearGradient>
    <linearGradient id="wpLit" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${P.litBright}"/><stop offset="1" stop-color="${P.lit}"/>
    </linearGradient>
  </defs>
  <g>${body}</g>
</svg>`;
}

const BP = {
  bg: '#0A1B36',
  grid: 'rgba(201,162,75,0.10)',
  gridMajor: 'rgba(201,162,75,0.2)',
  stroke: '#8FA6C8',
  strokeKey: '#C9A24B',
  text: '#C9A24B',
};

function renderBefore(prims, id, label) {
  const KEY = new Set(['mass', 'massDark', 'panel', 'panelLight', 'accent', 'accentSoft', 'accentRing']);
  const SKIP = new Set(['sky', 'ground']);
  const body = prims
    .map((p) => {
      if (SKIP.has(p.role)) return '';
      const key = KEY.has(p.role);
      const dash = p.role.startsWith('glass') || p.role === 'lit' ? ' stroke-dasharray="5 5"' : '';
      const stroke = key ? BP.strokeKey : BP.stroke;
      const width = key ? 2 : 1.2;
      return `<${p.tag} ${p.attrs} fill="none" stroke="${stroke}" stroke-width="${width}"${dash}/>`;
    })
    .join('');

  // grid
  let grid = '';
  for (let x = 0; x <= W; x += 40) grid += `<line x1="${x}" y1="0" x2="${x}" y2="${H}" stroke="${x % 200 ? BP.grid : BP.gridMajor}" stroke-width="1"/>`;
  for (let y = 0; y <= H; y += 40) grid += `<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="${y % 200 ? BP.grid : BP.gridMajor}" stroke-width="1"/>`;

  // dimension line + title block
  const annot = `
  <g stroke="${BP.text}" stroke-width="1">
    <line x1="90" y1="36" x2="710" y2="36"/>
    <line x1="90" y1="28" x2="90" y2="44"/>
    <line x1="710" y1="28" x2="710" y2="44"/>
    <line x1="40" y1="120" x2="40" y2="520"/>
    <line x1="32" y1="120" x2="48" y2="120"/>
    <line x1="32" y1="520" x2="48" y2="520"/>
  </g>
  <text x="400" y="26" fill="${BP.text}" font-family="Montserrat, Arial, sans-serif" font-size="13" letter-spacing="3" text-anchor="middle">124'-0"</text>
  <g font-family="Montserrat, Arial, sans-serif">
    <text x="760" y="556" fill="${BP.text}" font-size="12" letter-spacing="2" text-anchor="end">WEST+PARK · ${label}</text>
    <text x="760" y="574" fill="${BP.stroke}" font-size="10" letter-spacing="2" text-anchor="end">SHEET A-101 · NOT FOR CONSTRUCTION</text>
  </g>
  <g stroke="${BP.text}" stroke-width="1.5">
    <path d="M20 20 h18 M20 20 v18" fill="none"/><path d="M780 20 h-18 M780 20 v18" fill="none"/>
    <path d="M20 580 h18 M20 580 v-18" fill="none"/><path d="M780 580 h-18 M780 580 v-18" fill="none"/>
  </g>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Blueprint drawing of the project before construction">
  <rect width="${W}" height="${H}" fill="${BP.bg}"/>
  <g>${grid}</g>
  <g>${body}</g>
  ${annot}
</svg>`;
}

/* ---------- public API ---------- */
export function renderScene(sceneId, mode, label = 'PROJECT') {
  const build = SCENES[sceneId];
  if (!build) throw new Error(`Unknown scene: ${sceneId}`);
  const prims = [];
  build(prims);
  return mode === 'before' ? renderBefore(prims, sceneId, label) : renderAfter(prims, sceneId);
}

export const SCENE_IDS = Object.keys(SCENES);
