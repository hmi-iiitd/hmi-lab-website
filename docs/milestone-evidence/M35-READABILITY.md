# M3.5 readability & editorial corrections

**PR:** #3 (`feat/m3.5-identity`)  
**Palette retained:** `#F8F7F3` / `#1C3437` / `#556663` / teal accents / Georgia + Source Sans 3 / official HMI logo.

## Editorial

| Item | Resolution |
|---|---|
| Minsky quote | Restored faculty §16.1 / p.163 emotion quotation |
| Featured set | ESL (Accepted) → CHI 2024 HM → Sci Rep ADHD → MobiTangibles |
| ExpressEar | Remains in publications archive; not homepage-featured |
| Section numbers | 01 Selected · 02 Themes · 03 Applications · 04 People · 05 News |
| Feature viz | Explicitly labeled decorative / not study data |

## Typography tokens

Defined in `src/styles/tokens.css` (`--text-display` … `--text-footer`). Critical UI no longer uses 10–12px for essential content; decorative labels stay at 12–13px via `--text-label`.

## Contrast (unit-tested)

| Pair | Requirement |
|---|---|
| `#1C3437` on `#F8F7F3` / `#FEFDF9` | ≥ 7:1 |
| `#556663` on `#F8F7F3` | ≥ 4.5:1 |
| `#1F6A63` on `#F8F7F3` | ≥ 4.5:1 (small links/labels) |
| `#748781` control border on paper | ≥ 3:1 non-text |

## Layout

- Theme grid: **3** columns (wide) → 2 (tablet) → 1 (mobile)
- Publication filters: **5** fields on wide screens
- Publication titles wrap; links underlined without hover-only affordance

## Evidence

- `m35-readability-*-desktop.png` / `*-mobile.png`
- `m35-readability-{homepage,about,publications}-desktop-crop.png` (100%-scale text crops)
- Tests: `tests/content/m35-editorial.test.ts`, `tests/unit/typography-tokens.test.ts`, `tests/e2e/m35-readability.spec.ts`
