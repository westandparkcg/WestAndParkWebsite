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
- **Phone, email, address, license #** are placeholders scattered in the HTML —
  search for `555-0175`, `westandparkcg.com`, `#000000`, `1200 Commerce Way`.
- **Team roster** placeholders are in [js/about.js](js/about.js).
- **Contact form** currently drafts an email via `mailto:`; point it at a real
  form backend (Formspree/Basin/your endpoint) in [js/contact.js](js/contact.js).
- **Brand tokens** (colors, type scale, spacing) are in [css/tokens.css](css/tokens.css).
- **Logo**: [assets/wp-mark.png](assets/wp-mark.png) is the primary mark (navy P —
  light backgrounds and the favicon); [assets/wp-mark-reverse.png](assets/wp-mark-reverse.png)
  is the dark-background variant (white P) used in the site header/footer, per the
  brand board. Both were extracted from the official logo sheet with transparent
  backgrounds; to swap in higher-res exports, replace the files under the same names.

## Dev conveniences

- `?static=1` — disables all animation and shows every section instantly.
- `?static=1&solo=<section-id>` — renders a single section at the top of the
  page (e.g. `/?static=1&solo=method`). Useful for visual review.
- `prefers-reduced-motion` is fully respected in normal mode.
