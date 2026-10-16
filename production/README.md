# AbrilCodes 2026: production package

Drop-in replacement for the current one-page site in `DavidAbril411/AbrilCodes` (Next.js 15, next-intl, static export).

## Install

From the repo root, on a clean branch:

```bash
git checkout -b redesign-2026
bash path/to/production/install.sh
npm run build        # static export to ./out
npx serve out        # check /en and /es locally
git add -A && git commit -m "Redesign 2026; archive v1"
```

On Windows run it from Git Bash.

## What the script does

**Archives v1 (moved, nothing deleted)** into `archive/v1/`:
- `src/app/[locale]/page.tsx`, `src/app/layout.tsx`, `src/app/globals.css`
- `src/components/`, `src/data/`, `src/images/`

`archive/` is excluded in `tsconfig.json`, so it doesn't build. To roll back, move those files back.

**Installs v2:**

| File | Notes |
|---|---|
| `src/components/v2/AbrilSite.tsx` | The whole page as one client component: preloader, hero x-ray, decompiled projects, more builds, whoami, footer, cursor |
| `src/components/v2/AbrilSite.css` | Hover states only |
| `src/app/[locale]/page.tsx` | Renders `<AbrilSite locale={locale} />` (shipped as `src/app/locale/page.tsx`; the script copies it into `[locale]/`) |
| `src/app/layout.tsx` | Same metadata as before; Inter replaced by Geist + Geist Mono and Phosphor icons |
| `src/app/globals.css` | Tailwind removed (nothing uses it anymore) |
| `public/images/` | Logo SVGs, photo cutout + shadow, project screenshots |
| `tsconfig.json` | Only change: `"exclude": ["node_modules", "archive"]` |

**Unchanged:** `src/app/[locale]/layout.tsx` (metadata, JSON-LD), `src/i18n/*`, `src/messages/*` (still used for Meta title/description), `src/lib/site.ts`, `robots.ts`, `sitemap.ts`, `next.config.ts`, `public/og.png`.

## Notes

- **Language toggle** switches in place and rewrites the URL to `/en` or `/es` without reloading, so the intro doesn't replay. Page copy lives inside `AbrilSite.tsx` (`renderVals → t`), not in `messages/*.json`.
- **Props** on `<AbrilSite>`: `preloader`, `crosshair` (custom cursor), `showStatus` (whoami section + "Open to work" pill). All default to `true`.
- **Editing projects:** look for `featured` (OrionLogistics, Cappy) and `bento` (More builds) in `renderVals()`. Add a `url` and `urlLabel` to show a link.
- **Type-checking** is disabled for this file (`// @ts-nocheck`, `/* eslint-disable */`) because it drives the DOM imperatively for the animations. The rest of the repo stays strict.
- Fonts and icons load from Google Fonts and unpkg, as in the design.
- `npm uninstall framer-motion swiper react-icons` is optional. v2 doesn't use them, but the archived code does.
