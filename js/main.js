/* Homepage */
import { PROJECTS, SERVICES, METHOD, STATS } from './data.js';
import { initChrome, initReveals, mountScenes, projectCard, countUp, REDUCED } from './ui.js';
import { initSliders } from './slider.js';

initChrome();
mountScenes();
initSliders();

/* Stats band */
const statGrid = document.querySelector('[data-stats]');
if (statGrid) {
  statGrid.innerHTML = STATS.map(
    (s) => `<div class="stat-cell"><div class="stat-value" data-v>${REDUCED ? '' : '0'}</div><div class="stat-label">${s.label}</div></div>`
  ).join('');
  const cells = statGrid.querySelectorAll('[data-v]');
  const io = new IntersectionObserver(
    (entries) => {
      if (!entries[0].isIntersecting) return;
      io.disconnect();
      cells.forEach((el, i) => countUp(el, STATS[i].value, { decimals: STATS[i].decimals || 0, suffix: STATS[i].suffix }));
    },
    { threshold: 0.4 }
  );
  io.observe(statGrid);
}

/* Services bento */
const bento = document.querySelector('[data-services]');
if (bento) {
  bento.innerHTML = SERVICES.map(
    (s, i) => `
    <a class="bento-cell" href="/services.html#${s.id}">
      <span class="cell-arrow" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M9 7h8v8"/></svg></span>
      <span class="bento-num">0${i + 1}</span>
      <h3>${s.name}</h3>
      <p>${s.blurb}</p>
      <ul class="bento-points">${s.points.slice(0, i === 0 ? 4 : 2).map((pt) => `<li>${pt}</li>`).join('')}</ul>
    </a>`
  ).join('');
}

/* Featured project rail */
const rail = document.querySelector('[data-rail]');
if (rail) {
  PROJECTS.forEach((p) => rail.append(projectCard(p)));
  const step = () => Math.min(rail.clientWidth * 0.8, 560);
  document.querySelector('[data-rail-prev]')?.addEventListener('click', () => rail.scrollBy({ left: -step(), behavior: 'smooth' }));
  document.querySelector('[data-rail-next]')?.addEventListener('click', () => rail.scrollBy({ left: step(), behavior: 'smooth' }));
}

/* Method rows */
const method = document.querySelector('[data-method]');
if (method) {
  method.innerHTML = METHOD.map(
    (m) => `
    <div class="method-row">
      <div class="method-step">${m.step}</div>
      <div class="method-name">${m.name}<span class="time">${m.time}</span></div>
      <p>${m.text}</p>
    </div>`
  ).join('');
}

initReveals();
