/* Contact page: form handling + 60-second project planner */
import { initChrome, initReveals } from './ui.js';

initChrome();

/* ---------- Form ----------
   Delivers via FormSubmit to westandparkcg@gmail.com.
   NOTE: the very first submission triggers a one-time activation
   email from FormSubmit to that inbox — click "Activate" once and
   all future submissions arrive normally.
   When the company domain email is ready, change INBOX below. */
const INBOX = 'westandparkcg@gmail.com';
const form = document.querySelector('[data-contact-form]');
const status = document.querySelector('[data-form-status]');
form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!form.reportValidity()) return;
  const btn = form.querySelector('button[type="submit"]');
  btn.disabled = true;
  status.textContent = 'Sending…';
  const d = new FormData(form);
  d.append('_subject', `New project inquiry — ${d.get('name')}`);
  d.append('_template', 'table');
  d.append('_captcha', 'false');
  try {
    const res = await fetch(`https://formsubmit.co/ajax/${INBOX}`, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: d,
    });
    const out = await res.json();
    if (!res.ok || String(out.success) !== 'true') throw new Error(out.message || String(res.status));
    status.textContent = 'Sent — thank you. A project executive will reply within one business day.';
    form.reset();
  } catch {
    status.textContent = `Something went wrong sending the form. Please email ${INBOX} directly.`;
  } finally {
    btn.disabled = false;
  }
});

/* ---------- Planner ---------- */
const STEPS = [
  {
    q: 'What are you building?',
    key: 'type',
    opts: [
      ['New construction', 'Ground-up building'],
      ['Renovation', 'Reposition an existing space'],
      ['Tenant build-out', 'Fit out a leased space'],
      ['Facility program', 'Ongoing maintenance & small projects'],
    ],
  },
  {
    q: 'Roughly how big?',
    key: 'size',
    opts: [
      ['Under 10,000 SF', ''],
      ['10,000–50,000 SF', ''],
      ['50,000–150,000 SF', ''],
      ['150,000+ SF', ''],
    ],
  },
  {
    q: 'When do you need it?',
    key: 'when',
    opts: [
      ['As soon as possible', ''],
      ['Within 12 months', ''],
      ['12–24 months out', ''],
      ['Still exploring', ''],
    ],
  },
];

/* Rough planning guidance keyed by [type][size] — placeholder ranges, tune with real history */
const GUIDANCE = {
  'New construction': { durations: ['8–12 months', '10–16 months', '14–22 months', '18–30 months'], method: 'Design-Build for one contract and a guaranteed maximum price' },
  'Renovation': { durations: ['3–6 months', '5–9 months', '8–14 months', '12–20 months'], method: 'CM at-Risk so pricing firms up as discovery resolves' },
  'Tenant build-out': { durations: ['2–4 months', '4–7 months', '6–10 months', '9–14 months'], method: 'General Contracting on your landlord’s or our drawings' },
  'Facility program': { durations: ['Ongoing', 'Ongoing', 'Ongoing', 'Ongoing'], method: 'A Facility Services agreement with response-time SLAs' },
};

const planner = document.querySelector('[data-planner]');
const answers = {};
let step = 0;

function renderStep() {
  const bars = STEPS.map((_, i) => `<span class="${i < step ? 'done' : ''}"></span>`).join('');
  if (step < STEPS.length) {
    const s = STEPS[step];
    planner.innerHTML = `
      <div class="planner-progress" aria-hidden="true">${bars}<span></span></div>
      <p class="kicker">60-Second Project Planner</p>
      <h3>${s.q}</h3>
      <div class="planner-options">
        ${s.opts.map(([label, hint]) => `<button type="button" class="planner-opt" data-val="${label}"><span>${label}</span>${hint ? `<span class="hint">${hint}</span>` : ''}</button>`).join('')}
      </div>
      ${step > 0 ? '<button type="button" class="planner-back" data-back>← Back</button>' : ''}`;
  } else {
    const g = GUIDANCE[answers.type];
    const sizeIdx = STEPS[1].opts.findIndex(([l]) => l === answers.size);
    planner.innerHTML = `
      <div class="planner-progress" aria-hidden="true">${STEPS.map(() => '<span class="done"></span>').join('')}<span class="done"></span></div>
      <p class="kicker">What to Expect</p>
      <h3>Here's your starting point</h3>
      <dl class="planner-result">
        <div class="row"><dt>Project</dt><dd>${answers.type} · ${answers.size}</dd></div>
        <div class="row"><dt>Typical construction time</dt><dd>${g.durations[sizeIdx]}</dd></div>
        <div class="row"><dt>Likely best fit</dt><dd>${g.method}</dd></div>
        <div class="row"><dt>Your timeline</dt><dd>${answers.when}</dd></div>
        <div class="row"><dt>Next step</dt><dd>A free site walk &amp; feasibility talk</dd></div>
      </dl>
      <p class="form-note" style="margin-top:1rem">Real numbers come from a real conversation — this is honest ballpark, not a quote.</p>
      <p style="margin-top:1rem"><a class="btn btn-gold" href="#form" data-prefill>Use this in my inquiry <span class="arrow">→</span></a></p>
      <button type="button" class="planner-back" data-back>← Start over</button>`;
  }
}

planner?.addEventListener('click', (e) => {
  const opt = e.target.closest('.planner-opt');
  const back = e.target.closest('[data-back]');
  const prefill = e.target.closest('[data-prefill]');
  if (opt) {
    answers[STEPS[step].key] = opt.dataset.val;
    step += 1;
    renderStep();
  } else if (back) {
    step = Math.max(0, step - 1);
    if (step === 0) Object.keys(answers).forEach((k) => delete answers[k]);
    renderStep();
  } else if (prefill) {
    const msg = document.getElementById('cf-msg');
    const type = document.getElementById('cf-type');
    if (msg && !msg.value) msg.value = `Planner summary: ${answers.type}, ${answers.size}, timeline: ${answers.when}.\n\nDetails: `;
    if (type) {
      const map = { 'New construction': 'New construction', 'Renovation': 'Renovation / repositioning', 'Tenant build-out': 'Tenant build-out', 'Facility program': 'Facility services / maintenance' };
      type.value = map[answers.type] || 'Not sure yet';
    }
    msg?.focus();
  }
});
if (planner) renderStep();

initReveals();
