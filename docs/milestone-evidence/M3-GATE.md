# M3 completion gate

**Recommendation:** **PASS pending independent approving review, then merge to GitHub staging only**  
**Date:** 2026-11-03 (final cleanup)  
**Branch:** `feat/m3-publications` (PR #1)  
**Do not start M3.5 or M4** without explicit approval.

Identity prep on this PR (ADR-003): canonical approved description + three-theme/tag architecture only. Homepage hero rewrite, `/about/`, logo swap, and metadata are **M3.5**.

## Deliverables checklist

| # | Item | Status |
|---|---|---|
| 1 | Publication inventory + reconciliation | `docs/publications/M3-RECONCILIATION.md` — **68** keys; **32** public papers (31 published + 1 accepted); **2** incomplete; **6** excluded; **5** patents; **22** unresolved; **59** unique research works after 4 dup pairs |
| 2 | Provenance / verification decisions | Per-record YAML + reconciliation; raw bib private |
| 3 | Publications archive + paper pages | Labeled as verified records currently available |
| 4 | Homepage featured verified research | CHI 2024 (HM evidenced), ExpressEar, MobiTangibles |
| 5 | RED/GREEN evidence + CI | `M3-TEST-LOG.md`; full local + GitHub `quality` |
| 6 | Desktop/mobile screenshots | `m3-publications-*.png` |
| 7 | Staging URL + deployed SHA | After merge to `main` → Pages deploy |
| 8 | Branch-protection verification | ADR-002; enforce_admins; PR + review + `quality` |
| 9 | Risks + PASS/FAIL | See below |

## Branch protection

- PRs required; 1 approving review; required check `quality`; `enforce_admins: true`.
- Direct push to `main` rejected (GH006). Merge authorized to **staging only** after independent approval.

## Outstanding risks / follow-ups

1. **22 unresolved historical source keys** — documented backlog; not silently excluded.  
2. **ISS 2026 magnetic/UFO** — incomplete; unpublished pending DOI.  
3. **CHI HM** — evidence recorded; faculty confirmation requested to close residual note.  
4. **ESL** — accepted/public; proceedings DOI pending.  
5. **Patents** — application vs granted unverified at IPO/EPO.  
6. **Solo-maintainer merge** — requires non-author approving review.

## Integrity stance

Scientific accuracy over completeness. Archive = verified subset currently available, not the full historical bibliography.
