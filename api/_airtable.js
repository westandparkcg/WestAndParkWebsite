/* Small Airtable REST client — no SDK dependency, just fetch.
   Kept isolated so the pure logic (CSV, validation, mapping) can be
   unit-tested without needing real Airtable credentials. */

const API_BASE = 'https://api.airtable.com/v0';

export function airtableConfigured() {
  return Boolean(process.env.AIRTABLE_API_KEY && process.env.AIRTABLE_BASE_ID);
}

function tableUrl(path = '') {
  const base = process.env.AIRTABLE_BASE_ID;
  const table = encodeURIComponent(process.env.AIRTABLE_TABLE_NAME || 'Raffle Entries');
  return `${API_BASE}/${base}/${table}${path}`;
}

function authHeaders() {
  return {
    Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
    'Content-Type': 'application/json',
  };
}

/** Escape a value for safe use inside an Airtable formula string literal. */
export function escapeAirtableFormulaValue(value) {
  return String(value).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

/** Find one record by exact case-insensitive email match. Returns record or null. */
export async function findEntryByEmail(email) {
  const formula = `LOWER({Email})="${escapeAirtableFormulaValue(String(email).toLowerCase())}"`;
  const url = `${tableUrl()}?filterByFormula=${encodeURIComponent(formula)}&maxRecords=1`;
  const res = await fetch(url, { headers: authHeaders() });
  if (!res.ok) throw new Error(`Airtable lookup failed: ${res.status}`);
  const data = await res.json();
  return data.records?.[0] || null;
}

export async function createEntry(fields) {
  const res = await fetch(tableUrl(), {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ fields, typecast: true }),
  });
  if (!res.ok) throw new Error(`Airtable create failed: ${res.status} ${await res.text()}`);
  return res.json();
}

export async function updateEntry(recordId, fields) {
  const res = await fetch(tableUrl(`/${recordId}`), {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify({ fields, typecast: true }),
  });
  if (!res.ok) throw new Error(`Airtable update failed: ${res.status} ${await res.text()}`);
  return res.json();
}

/** Fetch every record in the table, newest first (paginates automatically). */
export async function listAllEntries() {
  const records = [];
  let offset;
  do {
    const url = `${tableUrl()}?pageSize=100&sort[0][field]=Submitted At&sort[0][direction]=desc${offset ? `&offset=${offset}` : ''}`;
    const res = await fetch(url, { headers: authHeaders() });
    if (!res.ok) throw new Error(`Airtable list failed: ${res.status}`);
    const data = await res.json();
    records.push(...data.records);
    offset = data.offset;
  } while (offset);
  return records;
}
