/** Pure validation logic, kept separate so it can be unit-tested without a request object. */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEntry(body) {
  const name = String(body.name || '').trim();
  const phone = String(body.phone || '').trim();
  const company = String(body.company || '').trim();
  const email = String(body.email || '').trim();

  const errors = [];
  if (name.length < 2) errors.push('Please enter your full name.');
  if (phone.replace(/[^0-9]/g, '').length < 7) errors.push('Please enter a valid phone number.');
  if (company.length < 2) errors.push('Please enter your title or company.');
  if (!EMAIL_RE.test(email)) errors.push('Please enter a valid email address.');

  return { valid: errors.length === 0, errors, clean: { name, phone, company, email } };
}
