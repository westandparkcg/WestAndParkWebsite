/* Admin page: password-gated fetch + render + CSV export.
   The token is kept only in sessionStorage (cleared when the tab
   closes) — never localStorage, never in the URL. */
const SESSION_KEY = 'raffleAdminToken';

const gate = document.querySelector('[data-admin-gate]');
const gateStatus = document.querySelector('[data-admin-gate-status]');
const view = document.querySelector('[data-admin-view]');
const rows = document.querySelector('[data-admin-rows]');
const empty = document.querySelector('[data-admin-empty]');
const countEl = document.querySelector('[data-admin-count]');
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

async function unlockWith(token) {
  const out = await loadEntries(token);
  sessionStorage.setItem(SESSION_KEY, token);
  gate.hidden = true;
  view.hidden = false;
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

  document.querySelector('[data-admin-refresh]').onclick = () => loadEntries(token).then(renderEntries).catch(showGateError);
  document.querySelector('[data-admin-logout]').onclick = () => {
    sessionStorage.removeItem(SESSION_KEY);
    view.hidden = true;
    gate.hidden = false;
    document.getElementById('admin-token').value = '';
  };
}

function showGateError(err) {
  gateStatus.className = 'raffle-status is-error';
  gateStatus.textContent = err.status === 401 ? 'Incorrect password.' : err.message;
}

document.querySelector('[data-admin-form]').addEventListener('submit', async (e) => {
  e.preventDefault();
  const token = document.getElementById('admin-token').value.trim();
  gateStatus.textContent = 'Checking…';
  gateStatus.className = 'raffle-status';
  try {
    await unlockWith(token);
  } catch (err) {
    showGateError(err);
  }
});

// Auto-unlock if a valid token is already in this tab's session.
const saved = sessionStorage.getItem(SESSION_KEY);
if (saved) unlockWith(saved).catch(() => sessionStorage.removeItem(SESSION_KEY));
