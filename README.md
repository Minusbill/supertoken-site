# SuperToken Website

The static product website for SuperToken, an AI gateway that provides one API entry point for leading text, image, and video models.

## Pages

- `index.html`: Single-screen dashboard homepage — headline + price board (text / image / video), data strip, and a tab panel (quickstart, routing, models, FAQ).
- `models.html`: Model plaza — text / image / video sections with search, type and vendor filters, copy-ID buttons.
- `pricing.html`: Text (input / output vs. provider list price), image (per request) and video (per second) pricing tables.
- `status.html`: Service status. Stays in a "not connected" state until a `status.json` is served next to it (see `status.example.json`); nothing is hard-coded as healthy.
- `docs.html`: Documentation landing page (the nav links to the full docs at docs.supertoken.cc).

Chinese / English toggle (persisted in `localStorage`), light theme only, responsive down to 390px.

## Design system

Tokens live at the top of `site.css` (paper `#f6f5f1`, ink `#14171c`, brand green `#1f6f5a`, savings green `#0e8a5f`). Display / numerals use Bricolage Grotesque, CJK / body text uses Noto Sans SC, code uses IBM Plex Mono — all loaded from Google Fonts with system fallbacks (PingFang SC / Microsoft YaHei) so the page still renders if the font host is slow or blocked.

Shared nav, footer, language toggle, tabs, copy buttons, model filters and the status renderer are in `site.js`. No framework, no CDN scripts; vendor logos are local SVGs in `assets/logos/`.

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:5173/` to preview the site.

## Production Build

```bash
npm run build
```

The deployable static files are generated in `dist/`.
