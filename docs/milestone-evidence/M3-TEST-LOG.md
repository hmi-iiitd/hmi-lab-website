# M3 test log (RED → GREEN → REFACTOR)

**Branch:** `feat/m3-publications`  
**Latest gate cleanup:** 2026-11-03  
**Public archive:** 32 papers (31 published + 1 accepted NeurIPS ESL)

## RED

- Content integrity, reconciliation (68 keys), identity architecture (ADR-003), BibTeX, draft exclusion, archive/filter e2e, paper pages.
- M3.5 UI contracts written and **skipped** until a separate PR.

## GREEN

- 32 public verified/accepted records; patents and drafts excluded.
- ESL accepted with NeurIPS poster + CDNM provenance; no fabricated DOI.
- CHI 2024 HM award evidenced (first-author site + HMI materials; SIGCHI program corroboration); faculty confirmation noted.
- Three Interactive Intelligence themes + independent application tags.

## FULL SUITE

| Gate | Result |
|---|---|
| `npm run lint` | pass |
| `npm run typecheck` | 0 errors |
| `npm test` (Vitest) | pass (identity + reconciliation suites included) |
| `npm run validate:content` | pass |
| `npm run build:staging` | 36 pages |
| `npm run test:e2e` | pass (M3.5 specs skipped) |
| `npm run ci` | exit 0 |
| GitHub Actions `quality` | required on PR #1 |

## Evidence screenshots

- `docs/milestone-evidence/m3-publications-desktop.png`
- `docs/milestone-evidence/m3-publications-mobile.png`
