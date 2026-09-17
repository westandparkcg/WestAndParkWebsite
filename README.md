# West + Park Commercial Group — Website

A hand-crafted marketing site for **West + Park Commercial Group**, a full-service
commercial construction and management firm. Dark editorial design in the brand
navy/gold (`#0B1D3A` / `#C9A24B`, Montserrat), built as a fast static site with
no framework.

## Run it

```bash
npm install
npm run dev        # dev server at http://localhost:5173
npm run build      # production build → dist/
npm run preview    # serve the production build
```

The whole site ships at roughly **30 KB gzipped** of HTML/CSS/JS (plus Google
Fonts) — deploy `dist/` to any static host (Vercel, Netlify, S3, nginx).

## What's inside

| Page | Purpose |
|---|---|
| `index.html` | Homepage: hero, stat band, signature before/after, services bento, project rail, The West + Park Method, testimonials, trust strip |
| `projects.html` | Filterable case-study grid (by sector) |
| `project.html?id=…` | Case-study template: before/after slider, facts, challenge/solution, outcomes, client quote |
| `services.html` | The five services, each linked to a proving project |
| `about.html` | Story, values, method, safety numbers, team roster |
| `contact.html` | Inquiry form + the 60-second project planner |

## The before/after system

The signature feature. Every project renders **twice from the same geometry** in
[js/scenes.js](js/scenes.js): once as a blueprint wireframe ("before — the plan")
and once as a duotone architectural rendering ("after — the build"). The slider
([js/slider.js](js/slider.js)) is built on a real `<input type="range">`, so
keyboard, touch, and screen-reader support come free.

**When real photography arrives:** shoot before/after pairs from the identical
camera position, then replace the two `renderScene()` panes in `slider.js` (and
the card media in `ui.js`) with `<img>` tags. Nothing else needs to change.

## Editing content

- **All project/service/method/stat copy** lives in [js/data.js](js/data.js) —
  every field is placeholder and meant to be replaced with real facts.
- **Phone**: (551) 365-6366 — real. **Email**: build@westandparkcg.com — real,
  displayed sitewide, but the *form itself* still delivers via a FormSubmit
  alias to the owner's Gmail (see js/contact.js) until that inbox is activated.
- **Address**: 971 US Highway 202N, #8028, Branchburg, NJ 08876 — real.
- **Team roster** placeholders are in [js/about.js](js/about.js).
- **Contact form** currently drafts an email via `mailto:`; point it at a real
  form backend (Formspree/Basin/your endpoint) in [js/contact.js](js/contact.js).
- **Brand tokens** (colors, type scale, spacing) are in [css/tokens.css](css/tokens.css).
- **Logo**: [assets/wp-mark.png](assets/wp-mark.png) is the primary mark (navy P —
  light backgrounds and the favicon); [assets/wp-mark-reverse.png](assets/wp-mark-reverse.png)
  is the dark-background variant (white P) used in the site header/footer, per the
  brand board. Both were extracted from the official logo sheet with transparent
  backgrounds; to swap in higher-res exports, replace the files under the same names.

## Expo raffle (raffle.html)

A standalone lead-capture flow for trade-show booths — not linked from the
main site nav (reached only via direct URL / QR code), backed by a real
database, a password-gated admin table, and a printable QR flyer.

**Pages:**
- `/raffle.html` — the public entry form (name, phone, title/company, email).
  Mobile-first; this is what the QR code points to.
- `/raffle-admin.html` — password-gated table of every entry, with a
  **Download CSV** button and a refresh/lock control. Not linked anywhere —
  bookmark it.
- `/raffle-flyer.html` — a full-bleed, print-ready page with the QR code and
  a "Scan to Win" headline. Open it and use your browser's Print (or
  Print → Save as PDF) to make booth signage.

**How data flows:** `POST /api/raffle` ([api/raffle.js](api/raffle.js)) validates
the submission, writes it to an Airtable table (creating or, if the email
already exists, *updating* the existing row — one entry per person, so
re-submitting can't stuff the raffle), and **also** emails a copy through the
same FormSubmit alias the contact form uses. That email copy means entries
are never lost even before Airtable is configured — `GET /api/raffle` (used
by the admin page) reads straight back from Airtable.

### One-time setup (you need to do this — I can't create third-party accounts for you)

1. **Airtable** (free): create an account at airtable.com → new Base → one
   table named exactly `Raffle Entries` with these fields:
   - `Name` (single line text)
   - `Phone` (single line text)
   - `Title / Company` (single line text)
   - `Email` (email or single line text)
   - `Notes` (long text)
   - `Submitted At` (date, include time)
   - `Updated At` (date, include time)
   - `Source` (single line text)

   Then: account icon → **Developer hub** → **Personal access tokens** → create
   one scoped to `data.records:read` + `data.records:write` on that base.
   Copy the token, and copy the Base ID from the base's API docs page (starts
   with `app...`).

2. **Vercel project → Settings → Environment Variables**, add:
   | Name | Value |
   |---|---|
   | `AIRTABLE_API_KEY` | the personal access token from step 1 |
   | `AIRTABLE_BASE_ID` | the base ID (starts `app...`) |
   | `AIRTABLE_TABLE_NAME` | `Raffle Entries` |
   | `RAFFLE_ADMIN_TOKEN` | a password you make up — this unlocks the admin page |

   Redeploy (or just push any commit) after saving the env vars.

3. Visit `/raffle-admin.html`, enter the `RAFFLE_ADMIN_TOKEN` password you
   picked. Until step 2 is done, the admin page loads fine but says storage
   isn't connected yet — check your email in the meantime, every entry is
   still arriving there.

### Security notes

- The admin page is gated by one shared password (`RAFFLE_ADMIN_TOKEN`), sent
  as a header and checked server-side — never in the URL, never persisted to
  `localStorage` (only `sessionStorage`, cleared when the tab closes). This is
  a lightweight gate appropriate for a small internal tool, not a full
  multi-user login system — don't post the admin URL or password anywhere
  public, and pick a real random password, not something guessable.
- The public form has a honeypot field and a minimum-time-on-page check to
  filter obvious bots; it does not use a CAPTCHA. For a short, staffed expo
  window this is a reasonable trade-off.

### If the raffle URL ever changes

Edit `URL_TO_ENCODE` in [scripts/generate-raffle-qr.mjs](scripts/generate-raffle-qr.mjs),
then run `node scripts/generate-raffle-qr.mjs` to regenerate
`assets/raffle-qr.svg` (used by the flyer) — and update the URL baked into
`raffle-flyer.html` too.

## SEO

The four indexable pages (`index.html`, `services.html`, `about.html`,
`contact.html`) carry: a unique title + meta description (brand + service +
"Branchburg, NJ"), a canonical link, Open Graph/Twitter tags, and
`GeneralContractor` JSON-LD structured data (real NAP — name, address, phone
— plus hours; no fabricated ratings/reviews). `public/robots.txt` and
`public/sitemap.xml` are copied verbatim to the site root by Vite's static
`public/` convention.

**Deliberately excluded from the sitemap and marked `noindex`:** the raffle
pages (temporary campaign content) and `projects.html` / `project.html` (the
Projects section is hidden from nav per owner request, and its case-study
data still has `TODO` placeholders — index it once real facility details
replace them; see the inline comment on each file's `noindex` tag).

**What this can't do:** on-page tags help Google understand and display the
site correctly, but they are a small fraction of local-search ranking. The
highest-leverage things from here are outside this codebase entirely:
- Claim and fully fill out a **Google Business Profile** (this is usually
  the single biggest lever for local "front page" / map-pack visibility).
- Get real client reviews on Google — do not fabricate any; this site
  already deliberately avoids invented testimonials/ratings.
- Consistent NAP (name/address/phone) across any directory the business is
  listed in — it must match the JSON-LD above exactly.
- Backlinks from real, relevant sites (trade associations, suppliers,
  local press, chamber of commerce).
- Once the Projects section is filled with real facility details, unhide it
  and add it back to the sitemap — case studies are strong long-tail content
  (e.g. "hospital operating room flooring contractor NJ").

## Dev conveniences

- `?static=1` — disables all animation and shows every section instantly.
- `?static=1&solo=<section-id>` — renders a single section at the top of the
  page (e.g. `/?static=1&solo=method`). Useful for visual review.
- `prefers-reduced-motion` is fully respected in normal mode.
