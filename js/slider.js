/* Accessible before/after slider.
   Built on a real <input type="range"> so keyboard, touch, and
   screen-reader semantics come for free; the thumb is invisible
   and the whole surface drags. */
import { renderScene } from './scenes.js';
import { REDUCED } from './ui.js';

export function initSliders(root = document) {
  root.querySelectorAll('[data-ba]').forEach((slider) => {
    if (slider.dataset.init) return;
    slider.dataset.init = '1';

    const scene = slider.dataset.scene;
    const label = slider.dataset.label || 'PROJECT';
    const start = Number(slider.dataset.start || 42);

    slider.innerHTML = `
      <div class="ba-pane ba-after">${renderScene(scene, 'after')}</div>
      <div class="ba-pane ba-before">${renderScene(scene, 'before', label)}</div>
      <div class="ba-divider"><span class="ba-handle" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7l-5 5 5 5M16 7l5 5-5 5"/></svg>
      </span></div>
      <span class="ba-chip before">Before — the plan</span>
      <span class="ba-chip after">After — the build</span>
      <input class="ba-range" type="range" min="0" max="100" step="1" value="${start}"
             aria-label="Comparison slider: reveal the blueprint (left) versus the finished project (right)" />`;

    const range = slider.querySelector('.ba-range');
    const set = (v) => slider.style.setProperty('--ba', `${v}%`);
    set(start);
    range.addEventListener('input', () => set(range.value));

    // Direct pointer dragging anywhere on the surface
    const fromEvent = (e) => {
      const r = slider.getBoundingClientRect();
      const x = (e.touches ? e.touches[0].clientX : e.clientX) - r.left;
      const v = Math.max(0, Math.min(100, (x / r.width) * 100));
      range.value = v;
      set(v);
    };
    let dragging = false;
    slider.addEventListener('pointerdown', (e) => {
      dragging = true;
      slider.setPointerCapture(e.pointerId);
      fromEvent(e);
    });
    slider.addEventListener('pointermove', (e) => dragging && fromEvent(e));
    slider.addEventListener('pointerup', () => (dragging = false));
    slider.addEventListener('pointercancel', () => (dragging = false));

    // Discovery nudge on first scroll-into-view
    if (!REDUCED) {
      const io = new IntersectionObserver(
        (entries) => {
          if (!entries[0].isIntersecting) return;
          io.disconnect();
          const t0 = performance.now();
          const nudge = (t) => {
            const k = (t - t0) / 1200;
            if (k >= 1 || dragging) {
              set(range.value);
              return;
            }
            set(start + Math.sin(k * Math.PI * 2) * 7);
            requestAnimationFrame(nudge);
          };
          requestAnimationFrame(nudge);
        },
        { threshold: 0.5 }
      );
      io.observe(slider);
    }
  });
}
