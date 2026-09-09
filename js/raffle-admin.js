/* Admin page: password-gated fetch + render + CSV export.
   The token is kept only in sessionStorage (cleared when the tab
   closes) — never localStorage, never in the URL. */
const SESSION_KEY = 'raffleAdminToken';

const gate = document.querySelector('[data-admin-gate]');
const gateStatus = document.querySelector('[data-admin-gate-status]');
const gateForm = document.querySelector('[data-admin-form]');
const gateBtn = gateForm.querySelector('button[type="submit"]');
const view = document.querySelector('[data-admin-view]');
const rows = document.querySelector('[data-admin-rows]');
const empty = document.querySelector('[data-admin-empty]');
const countEl = document.querySelector('[data-admin-count]');
const viewStatus = document.querySelector('[data-admin-view-status]');
const csvLink = document.querySelector('[data-admin-csv]');

function esc(s) {
  const d = document.createElement('div');
  d.textContent = s ?? '';
  return d.innerHTML;
}

function fmtDate(iso) {
  if (!iso) return '—';
  try {
    return new Date(iso).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
  } catch {
    return iso;
  }
}

/** Clears any leftover status text/state left on the (currently hidden) gate panel. */
function resetGateStatus() {
  gateStatus.textContent = '';
  gateStatus.className = 'raffle-status';
}

async function loadEntries(token) {
  const res = await fetch('/api/raffle', { headers: { Authorization: `Bearer ${token}` } });
  const out = await res.json().catch(() => null);
  if (!out) {
    console.error('raffle-admin: non-JSON response', res.status);
    throw Object.assign(new Error('Could not reach the server. Please try again.'), { status: res.status });
  }
  if (!res.ok || !out.ok) throw Object.assign(new Error(out.message || 'Failed to load entries.'), { status: res.status });
  return out;
}

function renderEntries(out) {
  countEl.textContent = String(out.entries.length);
  csvLink.href = '#';
  csvLink.onclick = null;

  if (!out.configured) {
    rows.innerHTML = '';
    empty.hidden = false;
    empty.innerHTML = 'Storage isn\'t connected yet — entries are still arriving by email in the meantime. See the README for Airtable setup.';
    return;
  }
  if (out.entries.length === 0) {
    rows.innerHTML = '';
    empty.hidden = false;
    empty.innerHTML = 'No entries yet.';
    return;
  }
  empty.hidden = true;
  rows.innerHTML = out.entries
    .map(
      (e) => `<tr>
        <td>${esc(e.name)}</td>
        <td>${esc(e.phone)}</td>
        <td>${esc(e.company)}</td>
        <td><a href="mailto:${esc(e.email)}" class="gold">${esc(e.email)}</a></td>
        <td>${fmtDate(e.submittedAt)}</td>
      </tr>`
    )
    .join('');
}

function lock() {
  sessionStorage.removeItem(SESSION_KEY);
  view.hidden = true;
  gate.hidden = false;
  resetGateStatus();
  document.getElementById('admin-token').value = '';
}

async function unlockWith(token) {
  const out = await loadEntries(token);
  sessionStorage.setItem(SESSION_KEY, token);
  gate.hidden = true;
  view.hidden = false;
  resetGateStatus();
  renderEntries(out);

  csvLink.onclick = (e) => {
    e.preventDefault();
    fetch('/api/raffle?format=csv', { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'raffle-entries.csv';
        document.body.append(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
      });
  };

  document.querySelector('[data-admin-refresh]').onclick = () => {
    viewStatus.textContent = 'Refreshing…';
    loadEntries(token)
      .then((o) => {
        viewStatus.textContent = '';
        renderEntries(o);
      })
      .catch((err) => {
        // A 401 means the token was revoked/rotated server-side — log out
        // fully rather than showing a stale table with no way to retry.
        if (err.status === 401) {
          lock();
          showGateError(err);
          return;
        }
        viewStatus.textContent = err.message || 'Could not refresh — try again.';
      });
  };
  document.querySelector('[data-admin-logout]').onclick = lock;
}

function showGateError(err) {
  gateStatus.className = 'raffle-status is-error';
  gateStatus.textContent = err.status === 401 ? 'Incorrect password.' : err.message;
}

gateForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const token = document.getElementById('admin-token').value.trim();
  gateBtn.disabled = true;
  gateStatus.className = 'raffle-status';
  gateStatus.textContent = 'Checking…';
  try {
    await unlockWith(token);
  } catch (err) {
    showGateError(err);
  } finally {
    gateBtn.disabled = false;
  }
});

// Auto-unlock if a valid token is already in this tab's session.
const saved = sessionStorage.getItem(SESSION_KEY);
if (saved) unlockWith(saved).catch(() => sessionStorage.removeItem(SESSION_KEY));
