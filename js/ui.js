/* Shared chrome: header behavior, mobile nav, reveals, scene mounting, cards */
import { renderScene } from './scenes.js';

const PARAMS = new URLSearchParams(location.search);
export const STATIC_MODE = PARAMS.has('static');
export const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches || STATIC_MODE;
if (STATIC_MODE) document.documentElement.classList.add('static-mode');

/* Dev aid: ?solo=<section-id> shows only that section (with ?static=1). */
const SOLO = PARAMS.get('solo');
if (SOLO) {
  const style = document.createElement('style');
  style.textContent = `body > *:not(main), main > *:not(#${CSS.escape(SOLO)}) { display: none !important; } #${CSS.escape(SOLO)} { padding-top: 2rem; }`;
  document.head.append(style);
}

export function initChrome() {
  const header = document.querySelector('[data-header]');
  const toggle = document.querySelector('[data-nav-toggle]');
  const nav = document.getElementById('mainNav');

  let lastY = window.scrollY;
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 24);
    // hide on scroll down, show on scroll up (desktop nicety)
    if (y > 420 && y > lastY + 6 && !nav.classList.contains('open')) header.classList.add('hidden');
    else if (y < lastY - 6 || y < 420) header.classList.remove('hidden');
    lastY = y;
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  if (toggle) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });
    nav.addEventListener('click', (e) => {
      if (e.target.closest('a')) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  // aria-current on nav
  const path = location.pathname.replace(/\/$/, '') || '/index.html';
  nav?.querySelectorAll('a[href]').forEach((a) => {
    const href = a.getAttribute('href');
    if (href !== '/' && path.endsWith(href)) a.setAttribute('aria-current', 'page');
  });
}

export function initReveals() {
  const targets = document.querySelectorAll('.reveal, .reveal-stagger, [data-hero]');
  if (REDUCED) {
    targets.forEach((t) => t.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      }
    },
    { threshold: 0.15 }
  );
  targets.forEach((t) => io.observe(t));
}

/* Mount procedural scenes into any [data-scene] element */
export function mountScenes(root = document) {
  root.querySelectorAll('[data-scene]').forEach((el) => {
    if (el.dataset.mounted) return;
    el.dataset.mounted = '1';
    const mode = el.dataset.mode || 'after';
    el.innerHTML = renderScene(el.dataset.scene, mode, el.dataset.label || 'PROJECT');
  });
}

/* Project card: rendered "after", blueprint "before" appears on hover */
export function projectCard(p) {
  const a = document.createElement('a');
  a.className = 'project-card';
  a.href = `/project.html?id=${p.id}`;
  a.innerHTML = `
    <div class="card-media">
      <span class="media-tag">${p.sector}</span>
      <div class="media-after" data-scene="${p.scene}" data-mode="after" aria-hidden="true"></div>
      <div class="media-before" data-scene="${p.scene}" data-mode="before" data-label="${p.name.toUpperCase()}" aria-hidden="true"></div>
    </div>
    <div class="card-body">
      <h3>${p.name}</h3>
      <p class="card-meta">
        <span>${p.location}</span><span class="dot">◆</span>
        <span>${p.size}</span><span class="dot">◆</span>
        <span>${p.service}</span>
      </p>
    </div>`;
  mountScenes(a);
  return a;
}

/* Animated count-up stat */
export function countUp(el, value, { decimals = 0, suffix = '', duration = 1600 } = {}) {
  const fmt = (v) =>
    v.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;
  if (REDUCED) {
    el.textContent = fmt(value);
    return;
  }
  const t0 = performance.now();
  const tick = (t) => {
    const k = Math.min(1, (t - t0) / duration);
    const eased = 1 - Math.pow(1 - k, 3);
    el.textContent = fmt(value * eased);
    if (k < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
