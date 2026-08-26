/* Projects index: filterable case-study grid */
import { PROJECTS, SECTORS } from './data.js';
import { initChrome, initReveals, projectCard } from './ui.js';

initChrome();

const grid = document.querySelector('[data-grid]');
const filters = document.querySelector('[data-filters]');

PROJECTS.forEach((p) => {
  const card = projectCard(p);
  card.dataset.sector = p.sector;
  grid.append(card);
});

filters.innerHTML = SECTORS.map(
  (s, i) => `<button class="filter-btn" aria-pressed="${i === 0}" data-sector="${s}">${s}</button>`
).join('');

filters.addEventListener('click', (e) => {
  const btn = e.target.closest('.filter-btn');
  if (!btn) return;
  filters.querySelectorAll('.filter-btn').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
  const sector = btn.dataset.sector;
  grid.querySelectorAll('.project-card').forEach((card) => {
    card.classList.toggle('filtered-out', sector !== 'All' && card.dataset.sector !== sector);
  });
});

initReveals();
