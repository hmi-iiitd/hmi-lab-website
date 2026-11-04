# M3.5 typography & text-alignment refinement

**Branch:** `feat/m35-typography-alignment`  
**Scope:** Narrow readability pass after M3.5 merge. Design system frozen otherwise (Georgia + Source Sans 3, warm ivory / deep ink / muted teal, official HMI logo, approved identity copy).

## Changes

| Surface | Change |
|---|---|
| Global | `text-align: start` default; no `text-align: justify` anywhere |
| Application Pathways | Titles 18–20px (`--text-app-title`); summaries 16–17px (`--text-app-body`); section lead 17–19px (`--text-app-lead`); line-height ~1.6; slightly more card padding / grid gap |
| About | Body paragraphs 18–20px (`--text-about`); line-height 1.62; measure `--measure-prose` 45rem; **approved five-paragraph copy unchanged** |
| Research / pubs / papers | Secondary text ≥16px (`--text-secondary`); paper authors/venue/prose classes; publication filters reflow with rem-based `auto-fit` under 200% text enlarge |
| Decorative labels | Remain 12–13px via `--text-label` |

## Verification

| Check | Result |
|---|---|
| Viewports 320 / 390 / 768 / 1024 / 1440 | No horizontal overflow; H1 visible |
| 200% root font-size (home, about, publications) | No overflow; brand/logo remain usable; no brand/menu overlap |
| Left alignment | Body, About prose, application chips, research descriptions, publication authors/venues: `start`/`left` |
| Justification | Absent from CSS and computed styles |
| Historical milestone PNGs | Unchanged (M2 / M3 / M3.5 logo / identity / readability) |

## Evidence crops (100% scale, new filenames only)

- `m35-type-refine-applications-desktop.png` / `-mobile.png`
- `m35-type-refine-about-desktop.png` / `-mobile.png`
- `m35-type-refine-research-desktop.png`
- `m35-type-refine-publications-desktop.png` / `-mobile.png`

Runtime Playwright output continues to write only under `test-results/screenshots/` via `runtimeScreenshotPath()`.

## Tests

- `tests/unit/typography-alignment.test.ts`
- `tests/e2e/m35-type-refine.spec.ts`
- Existing typography / readability / identity suites retained
