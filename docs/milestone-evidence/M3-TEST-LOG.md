# M3 test log (RED → GREEN → REFACTOR)

**Branch:** `feat/m3-publications`  
**Date:** 2026-11-03

## RED

- Added `tests/content/m3-publications.test.ts` covering unique IDs/DOIs/slugs, author metadata, status/year validity, theme relations, draft exclusion, BibTeX escaping, and publishable filtering.
- Added `tests/e2e/publications.spec.ts` covering archive listing, search/filter progressive enhancement, paper pages (BibTeX + DOI), screenshots, and no-JS full list.
- Updated homepage e2e so Selected Research asserts verified featured papers (not M2 placeholders).

Initial failures (expected): missing publication records, incomplete schemas (`verification_status`, `lab_attribution`, provenance), archive/filter UI absent, paper pages lacking BibTeX, homepage still on placeholders.

## GREEN

- Extended Zod publication schema with verification fields and lab attribution.
- Added Crossref-verified publication Markdown (16 published) plus incomplete ESL candidate and draft fixture.
- Implemented `src/lib/publications.ts` and `src/lib/bibtex.ts`.
- Built `/publications/` archive with year/theme/type filters and search; permanent `/papers/[slug]/` pages.
- Wired homepage Selected Research to verified featured set.
- Fixed filter visibility: author CSS `display: grid` overrode HTML `[hidden]`; added `.pub[hidden] { display: none !important; }` and moved filter script to `public/js/publications-filter.js`.

## FULL SUITE (local)

| Gate | Result |
|---|---|
| `npm run lint` | pass |
| `npm run typecheck` | 0 errors |
| `npm test` (Vitest) | 12/12 |
| `npm run validate:content` | 18 pubs (16 publishable + 2 unpublished) |
| `npm run build:staging` | 20 pages |
| `npm run test:e2e` | 25/25 |
| `npm run ci` | exit 0 |

## Evidence screenshots

- `docs/milestone-evidence/m3-publications-desktop.png`
- `docs/milestone-evidence/m3-publications-mobile.png`
