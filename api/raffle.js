import { airtableConfigured, findEntryByEmail, createEntry, updateEntry, listAllEntries } from './_airtable.js';
import { validateEntry } from './_validate.js';
import { toCsv } from './_csv.js';

/* Redundant delivery: every entry also emails the team via the same
   FormSubmit alias already activated for the main contact form, so
   nothing is lost even before Airtable is configured. */
const NOTIFY_ALIAS = '8bec16101fee2a495d41a4f33cac4898';
const SOURCE_LABEL = 'Expo QR — West+Park Raffle';

async function notifyByEmail(entry) {
  const body = new URLSearchParams({
    name: entry.name,
    email: entry.email,
    phone: entry.phone,
    'title/company': entry.company,
    _subject: `New raffle entry — ${entry.name}`,
    _template: 'table',
    _captcha: 'false',
  });
  const res = await fetch(`https://formsubmit.co/ajax/${NOTIFY_ALIAS}`, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });
  if (!res.ok) throw new Error(`FormSubmit notify failed: ${res.status}`);
}

async function handlePost(req, res) {
  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }
  body = body || {};

  // Honeypot + minimum-time-on-page anti-bot checks. Fail "successfully"
  // (no details) so automated submitters don't learn why they were dropped.
  const honeypotFilled = Boolean(body._honey);
  const loadedAt = Number(body._loadedAt) || 0;
  const tooFast = loadedAt > 0 && Date.now() - loadedAt < 1500;
  if (honeypotFilled || tooFast) {
    console.warn('raffle: dropped suspected bot submission', { honeypotFilled, tooFast });
    return res.status(200).json({ ok: true });
  }

  const { valid, errors, clean } = validateEntry(body);
  if (!valid) return res.status(400).json({ ok: false, message: errors[0] });

  let dbOk = false;
  let duplicate = false;
  if (airtableConfigured()) {
    try {
      const existing = await findEntryByEmail(clean.email);
      const fields = {
        Name: clean.name,
        Phone: clean.phone,
        'Title / Company': clean.company,
        Email: clean.email,
      };
      if (existing) {
        duplicate = true;
        await updateEntry(existing.id, { ...fields, 'Updated At': new Date().toISOString() });
      } else {
        await createEntry({ ...fields, 'Submitted At': new Date().toISOString(), Source: SOURCE_LABEL });
      }
      dbOk = true;
    } catch (err) {
      console.error('raffle: Airtable write failed', err);
    }
  }

  let emailOk = false;
  try {
    await notifyByEmail(clean);
    emailOk = true;
  } catch (err) {
    console.error('raffle: notification email failed', err);
  }

  if (!dbOk && !emailOk) {
    return res.status(502).json({ ok: false, message: 'Something went wrong saving your entry. Please try again or ask our booth staff for help.' });
  }
  return res.status(200).json({ ok: true, duplicate });
}

function requireAdmin(req, res) {
  const configuredToken = process.env.RAFFLE_ADMIN_TOKEN;
  if (!configuredToken) {
    res.status(503).json({ ok: false, message: 'Admin access is not configured yet.' });
    return false;
  }
  const header = req.headers.authorization || '';
  const provided = header.startsWith('Bearer ') ? header.slice(7) : '';
  if (!provided || provided !== configuredToken) {
    res.status(401).json({ ok: false, message: 'Invalid admin token.' });
    return false;
  }
  return true;
}

const COLUMNS = [
  { label: 'Name', get: (r) => r.fields.Name },
  { label: 'Phone', get: (r) => r.fields.Phone },
  { label: 'Title / Company', get: (r) => r.fields['Title / Company'] },
  { label: 'Email', get: (r) => r.fields.Email },
  { label: 'Submitted At', get: (r) => r.fields['Submitted At'] },
];

async function handleGet(req, res) {
  if (!requireAdmin(req, res)) return;

  if (!airtableConfigured()) {
    return res.status(200).json({ ok: true, configured: false, entries: [] });
  }

  let records;
  try {
    records = await listAllEntries();
  } catch (err) {
    console.error('raffle: Airtable list failed', err);
    return res.status(502).json({ ok: false, message: 'Could not load entries right now.' });
  }

  if (req.query?.format === 'csv') {
    const csv = toCsv(records, COLUMNS);
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="raffle-entries.csv"');
    return res.status(200).send(csv);
  }

  const entries = records.map((r) => ({
    id: r.id,
    name: r.fields.Name || '',
    phone: r.fields.Phone || '',
    company: r.fields['Title / Company'] || '',
    email: r.fields.Email || '',
    submittedAt: r.fields['Submitted At'] || '',
    updatedAt: r.fields['Updated At'] || '',
  }));
  return res.status(200).json({ ok: true, configured: true, entries });
}

export default async function handler(req, res) {
  if (req.method === 'POST') return handlePost(req, res);
  if (req.method === 'GET') return handleGet(req, res);
  res.setHeader('Allow', 'GET, POST');
  return res.status(405).json({ ok: false, message: 'Method not allowed.' });
}
