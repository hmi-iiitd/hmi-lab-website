# M3.5 — Official HMI logo integration (priority slice)

**Scope:** Mandatory official logo integration only. Homepage/About punchline rollout remains deferred unless separately approved.  
**Branch:** `feat/m3.5-logo`  
**Historic / production:** untouched (assets copied into this repo via read-only GitHub API).

## Source decision

- **Approved:** historic `images/logo/logo_new.jpg` → `public/brand/logo-master.jpg`
- **Inspected:** historic `images/logo/logo.png` — alternate monochrome mark; **not** used (not a higher-quality encoding of `logo_new`)

## Integration

| Surface | Asset |
|---|---|
| Header / mobile | `brand/logo-header.png` via `BrandLogo.astro` |
| Footer | `brand/logo-footer.png` on paper plate for contrast on night footer |
| Favicon | `brand/favicon.ico` + PNG sizes (emblem crop on warm paper) |
| Social | `brand/og-image.png` + Open Graph / Twitter meta in `BaseLayout.astro` |

Provisional CSS `.brand-mark` circle mark removed from live header styles.

## Evidence

- Unit/content: `tests/content/m35-logo-assets.test.ts`
- E2E: `tests/e2e/m35-logo.spec.ts`
- Screenshots: `m35-logo-desktop.png`, `m35-logo-mobile.png`, `m35-logo-header-*.png`
