/** Minimal RFC-4180-ish CSV serializer — quotes only when needed. */
export function toCsvField(value) {
  const s = value == null ? '' : String(value);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export function toCsv(rows, columns) {
  const header = columns.map((c) => toCsvField(c.label)).join(',');
  const body = rows.map((row) => columns.map((c) => toCsvField(c.get(row))).join(',')).join('\n');
  return `${header}\n${body}\n`;
}
