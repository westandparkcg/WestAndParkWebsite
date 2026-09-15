/* Expo kiosk: full-screen before/after browser for an iPad left on a table. */
import { KIOSK_PROJECTS } from './kiosk-data.js';
import { initSliders } from './slider.js';
import { REDUCED } from './ui.js';

const sliderWrap = document.querySelector('[data-kiosk-slider-wrap]');
const titleEl = document.querySelector('[data-kiosk-title]');
const locationEl = document.querySelector('[data-kiosk-location]');
const indexEl = document.querySelector('[data-kiosk-index]');
const totalEl = document.querySelector('[data-kiosk-total]');
const dotsEl = document.querySelector('[data-kiosk-dots]');
const prevBtn = document.querySelector('[data-kiosk-prev]');
const nextBtn = document.querySelector('[data-kiosk-next]');

totalEl.textContent = KIOSK_PROJECTS.length;

dotsEl.innerHTML = KIOSK_PROJECTS.map(
  (p, i) => `<button class="kiosk-dot" type="button" role="tab" aria-label="${p.name}" data-kiosk-dot="${i}"></button>`
).join('');
const dots = [...dotsEl.querySelectorAll('[data-kiosk-dot]')];

let current = 0;

function render(index) {
  current = (index + KIOSK_PROJECTS.length) % KIOSK_PROJECTS.length;
  const p = KIOSK_PROJECTS[current];

  const slider = document.createElement('div');
  slider.className = 'ba-slider';
  slider.dataset.ba = '';
  slider.dataset.start = '50';
  slider.dataset.beforeSrc = p.before;
  slider.dataset.afterSrc = p.after;
  slider.dataset.label = p.name.toUpperCase();
  sliderWrap.replaceChildren(slider);
  initSliders(sliderWrap);

  titleEl.textContent = p.name;
  locationEl.textContent = p.location;
  indexEl.textContent = current + 1;
  dots.forEach((d, i) => d.classList.toggle('active', i === current));
}

prevBtn.addEventListener('click', () => render(current - 1));
nextBtn.addEventListener('click', () => render(current + 1));
dots.forEach((d, i) => d.addEventListener('click', () => render(i)));

document.addEventListener('keydown', (e) => {
  if (document.activeElement?.classList.contains('ba-range')) return;
  if (e.key === 'ArrowLeft') render(current - 1);
  if (e.key === 'ArrowRight') render(current + 1);
});

/* Swipe to browse projects — ignored when the gesture starts on the
   before/after slider itself, which owns horizontal drag for comparing. */
let touchStartX = null;
document.querySelector('.kiosk-shell').addEventListener(
  'touchstart',
  (e) => {
    if (e.target.closest('[data-ba]')) {
      touchStartX = null;
      return;
    }
    touchStartX = e.touches[0].clientX;
  },
  { passive: true }
);
document.querySelector('.kiosk-shell').addEventListener(
  'touchend',
  (e) => {
    if (touchStartX == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 60) render(current + (dx < 0 ? 1 : -1));
    touchStartX = null;
  },
  { passive: true }
);

render(0);

if (!REDUCED) {
  document.documentElement.classList.add('kiosk-animated');
}
