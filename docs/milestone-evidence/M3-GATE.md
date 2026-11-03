# M3 completion gate

**Recommendation:** **PASS (pending PR review + merge to staging)**  
**Date:** 2026-11-03 (bibliography intake revision)  
**Branch:** `feat/m3-publications` (PR #1)  
**Do not start M3.5 or M4** without explicit approval.

## Deliverables checklist

| # | Item | Status |
|---|---|---|
| 1 | Publication inventory + reconciliation | `docs/publications/M3-RECONCILIATION.md` + `m3-source-classification.json` (68 keys) |
| 2 | Provenance / verification decisions | Per-record YAML + reconciliation; raw bib private |
| 3 | Publications archive + paper pages | 32 public records; `/publications/`, `/papers/[slug]/` |
| 4 | Homepage featured verified research | CHI 2024, ExpressEar, MobiTangibles |
| 5 | RED/GREEN evidence + CI | Reconciliation tests + local `npm run ci` + e2e green |
| 6 | Desktop/mobile screenshots | `m3-publications-*.png` |
| 7 | Staging URL + deployed SHA | After merge to `main` → Pages deploy |
| 8 | Branch-protection verification | ADR-002; probe rejected direct push (GH006) |
| 9 | Risks + PASS/FAIL | See below |

## Branch protection

- PRs required; 1 approving review; required check `quality`; `enforce_admins: true`.
- Direct push to `main` rejected (GH006). M3 ships only via this PR.

## Outstanding risks

1. **NeurIPS 2026 ESL** — public as `accepted` from author bib; proceedings DOI pending.
2. **CHI 2024 Honorable Mention** — not confirmed on ACM awards page; award left null.
3. **ISS 2026 magnetic/UFO** — incomplete; unpublished pending DOI.
4. **~22 historical source keys** — classified unresolved; not silently published.
5. **Patents** — inventoried separately; grant vs application unverified at IPO/EPO.
6. **Solo-maintainer merge** — requires a non-author approving review.
7. **Code/dataset/PDF links** — omitted when unverified.

## Integrity stance

Scientific accuracy over completeness. No invented DOIs, awards, rankings, or artifact links. Conflicts recorded, not silently resolved.
