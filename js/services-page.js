/* Services page: detailed rows, each linked to a proving project */
import { SERVICES, PROJECTS } from './data.js';
import { initChrome, initReveals } from './ui.js';

initChrome();

const PROOF = {
  'preconstruction': 'northgate-medical',
  'construction-management': 'harrow-street-collective',
  'general-contracting': 'granite-line-logistics',
  'design-build': 'meridian-commons',
  'facility-services': 'atlas-center-lobby',
};

const rows = document.querySelector('[data-service-rows]');
rows.innerHTML = SERVICES.map((s, i) => {
  const proof = PROJECTS.find((p) => p.id === PROOF[s.id]);
  return `
  <div class="service-row reveal" id="${s.id}">
    <div class="service-num">0${i + 1}</div>
    <div class="service-main">
      <h2>${s.name}</h2>
      <p>${s.blurb}</p>
      <p class="service-proof">Proof: <a class="gold" href="/project.html?id=${proof.id}">${proof.name}</a> — ${proof.size}, ${proof.duration}, ${proof.stats[0][0].toLowerCase()} ${proof.stats[0][1].toLowerCase()}.</p>
    </div>
    <div class="service-side">
      <h3>What's included</h3>
      <ul>${s.points.map((pt) => `<li>${pt}</li>`).join('')}</ul>
    </div>
  </div>`;
}).join('');

initReveals();
