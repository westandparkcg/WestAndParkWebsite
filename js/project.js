/* Case study page: renders one project from ?id= */
import { PROJECTS } from './data.js';
import { initChrome, initReveals } from './ui.js';
import { initSliders } from './slider.js';

initChrome();

const id = new URLSearchParams(location.search).get('id') || PROJECTS[0].id;
const idx = Math.max(0, PROJECTS.findIndex((p) => p.id === id));
const p = PROJECTS[idx];
const prev = PROJECTS[(idx - 1 + PROJECTS.length) % PROJECTS.length];
const next = PROJECTS[(idx + 1) % PROJECTS.length];

document.title = `${p.name} — West + Park Commercial Group`;

document.querySelector('[data-case-hero]').innerHTML = `
  <p class="kicker">${p.sector} · ${p.service}</p>
  <h1>${p.name}</h1>
  <p class="lede">${p.summary}</p>`;

document.querySelector('[data-case-body]').innerHTML = `
  <div class="reveal in">
    <div class="ba-slider" data-ba data-scene="${p.scene}" data-label="${p.name.toUpperCase()}"></div>
    <p class="ba-caption"><span>Drag, tap, or use arrow keys — before is the plan, after is the build</span><span>${p.name} · ${p.location}</span></p>
  </div>

  <dl class="case-facts">
    <div class="case-fact"><dt>Location</dt><dd>${p.location}</dd></div>
    <div class="case-fact"><dt>Size</dt><dd>${p.size}</dd></div>
    <div class="case-fact"><dt>Schedule</dt><dd>${p.duration}</dd></div>
    <div class="case-fact"><dt>Delivery</dt><dd>${p.delivery}</dd></div>
    <div class="case-fact"><dt>Completed</dt><dd>${p.year}</dd></div>
  </dl>

  <div class="case-narrative">
    <div>
      <h3>The Challenge</h3>
      <p>${p.challenge}</p>
    </div>
    <div>
      <h3>How We Delivered</h3>
      <p>${p.solution}</p>
    </div>
  </div>

  <div class="case-outcomes">
    ${p.stats.map(([lab, val]) => `<div class="case-outcome"><div class="val">${val}</div><div class="lab">${lab}</div></div>`).join('')}
  </div>

  <blockquote class="case-quote">
    “${p.quote.text}”
    <footer><strong class="gold">${p.quote.author}</strong> — ${p.quote.role}</footer>
  </blockquote>

  <nav class="case-nav" aria-label="More projects">
    <a class="btn-line" href="/project.html?id=${prev.id}">← ${prev.name}</a>
    <a class="btn-line" href="/projects.html">All projects</a>
    <a class="btn-line" href="/project.html?id=${next.id}">${next.name} →</a>
  </nav>`;

initSliders();
initReveals();
