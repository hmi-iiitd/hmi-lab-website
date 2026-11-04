# HMI official logo

**Canonical artwork:** historic `images/logo/logo_new.jpg` from `hmi-iiitd/hmi-iiitd.github.io` (read-only copy; historic repo untouched).

**Site assets:** `public/brand/` — self-contained; the staging site does not load logo bytes from the historic repository.

## Source decision

| File | Role |
|---|---|
| `logo_new.jpg` | **Approved official logo** — full color lockup (Devanagari emblem + figures + “HUMAN-MACHINE INTERACTION”). Used as master. |
| `logo.png` (historic) | Alternate monochrome mark with different framing. Inspected; **not** a higher-quality encoding of `logo_new`, and **not** used as the site brand. |

See `logo-provenance.json` for SHA-256 checksums and derivative pixel sizes.

## Derivatives

| Asset | Use |
|---|---|
| `logo-master.jpg` | Verbatim approved master |
| `logo.png` | Full lockup, transparent, max ~1200px |
| `logo-header.png` | Header / mobile brand image |
| `logo-footer.png` | Footer brand image |
| `favicon-*.png` / `favicon.ico` | Emblem crop on warm paper (legible at tiny sizes) |
| `apple-touch-icon.png`, `icon-*.png` | Homescreen / PWA-style icons |
| `og-image.png` | Social sharing (`1200×630`) |

All derivatives preserve aspect ratio. Favicons use a faithful emblem crop (exclude wordmark band) so the mark stays recognizable at 16–32px.
