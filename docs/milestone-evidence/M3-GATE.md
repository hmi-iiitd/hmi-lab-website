# M3 completion gate

**Recommendation:** **PASS (pending PR review + merge to staging)**  
**Date:** 2026-11-03  
**Branch:** `feat/m3-publications`  
**Do not start M4** without explicit approval.

## Deliverables checklist

| # | Item | Status |
|---|---|---|
| 1 | Publication inventory + reconciliation | `docs/publications/M3-RECONCILIATION.md` |
| 2 | Provenance / verification decisions | Per-record YAML + reconciliation |
| 3 | Publications archive + paper pages | `/publications/`, `/papers/[slug]/` |
| 4 | Homepage featured verified research | CHI 2024, ExpressEar, MobiTangibles |
| 5 | RED/GREEN evidence + CI | `M3-TEST-LOG.md`; local `npm run ci` + e2e green |
| 6 | Desktop/mobile screenshots | `m3-publications-*.png` |
| 7 | Staging URL + deployed SHA | After merge to `main` → Pages deploy |
| 8 | Branch-protection verification | ADR-002; probe rejected direct push (GH006) |
| 9 | Risks + PASS/FAIL | See below |

## Branch protection

- PRs required; 1 approving review; required check `quality`; `enforce_admins: true`.
- Direct push to `main` rejected (GH006). M3 ships only via this PR.

## Outstanding risks

1. **NeurIPS 2026 ESL** — incomplete; unpublished until DOI/authors verified.
2. **CHI 2024 Honorable Mention** — not confirmed on ACM awards page; award left null.
3. **Faculty dossier PDF** — missing from workspace; bibliography not claimed complete.
4. **Historic posters/companions** — not Crossref-audited; excluded from verified set.
5. **Solo-maintainer merge** — requires a second GitHub account review (or documented temporary exception).
6. **Code/dataset/PDF links** — omitted when unverified.

## Integrity stance

Scientific accuracy over completeness. No invented DOIs, awards, rankings, or artifact links. Conflicts recorded, not silently resolved.
