/* Public raffle entry form */
const loadedAt = Date.now();
const form = document.querySelector('[data-raffle-form]');
const status = document.querySelector('[data-raffle-status]');
const card = document.querySelector('[data-raffle-card]');

form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!form.reportValidity()) return;

  const btn = form.querySelector('button[type="submit"]');
  btn.disabled = true;
  status.className = 'raffle-status';
  status.textContent = 'Entering…';

  const d = new FormData(form);
  const payload = {
    name: d.get('name'),
    phone: d.get('phone'),
    company: d.get('company'),
    email: d.get('email'),
    notes: d.get('notes'),
    _honey: d.get('_honey'),
    _loadedAt: loadedAt,
  };

  const FALLBACK = 'Something went wrong. Please try again or ask our booth staff for help.';

  try {
    const res = await fetch('/api/raffle', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    // A non-JSON response (network/server misconfiguration) should never
    // surface a raw parser error to a raffle entrant.
    const out = await res.json().catch(() => null);
    if (!out) {
      console.error('raffle: non-JSON response', res.status);
      throw new Error(FALLBACK);
    }
    if (!res.ok || !out.ok) throw new Error(out.message || FALLBACK);

    card.innerHTML = `
      <div class="raffle-success">
        <span class="check" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L20 7"/></svg>
        </span>
        <h1>${out.duplicate ? "You're Already In" : "You're Entered"}</h1>
        <p class="lede">${out.duplicate ? 'We updated your details — good luck!' : 'Good luck! We’ll announce the winner after the show.'}</p>
      </div>`;
  } catch (err) {
    console.error('raffle: submit failed', err);
    status.className = 'raffle-status is-error';
    status.textContent = err.message || FALLBACK;
    btn.disabled = false;
  }
});
