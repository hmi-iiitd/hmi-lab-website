# M3 completion gate

**Faculty decision:** **M3 ACCEPTED** (implementation head `12cce86`; clarification `7a43cfd`)  
**Merge status:** **BLOCKED** — awaiting independent approving review from an eligible GitHub collaborator (ADR-004; no invites sent)  
**Date:** 2026-11-04  
**Branch:** `feat/m3-publications` (PR #1)  
**Do not start M3.5 or M4** without explicit approval. **STOP after M3 closure.**

Identity prep on this PR (ADR-003 authoritative): canonical approved description + three-theme/tag architecture only. Homepage hero rewrite, `/about/`, logo swap, and metadata remain **deferred to M3.5**.

## Deliverables checklist

| # | Item | Status |
|---|---|---|
| 1 | Publication inventory + reconciliation | `docs/publications/M3-RECONCILIATION.md` — **68** keys; **32** public papers (31 published + 1 accepted); **2** incomplete; **6** excluded; **5** patents; **22** unresolved; **59** bibliography **candidates** after dedup (not 59 verified papers) |
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

## Merge + closure sequence (after approving review)

1. Confirm CI `quality` still green and branch protection unchanged.  
2. Merge PR #1 into `main` via the protected GitHub workflow (no admin bypass).  
3. Confirm GitHub Pages deployment of the merge commit.  
4. Live staging smoke: publications archive, ESL page, CHI 2024 page, search/filter, BibTeX, mobile, draft exclusion; verify M3 content (not prior M2-only set).  
5. Confirm historic repo and institutional production domain were **not** modified.  
6. Issue final **M3 closure report** (merge SHA, deploy URL, browser results, nonblocking backlog) — then **STOP**.

## Outstanding risks / follow-ups

1. **Independent approving review** — sole Write collaborator is the PR author; ADR-004 proposes a trusted HMI lab member with repo-scoped Write (invite only after explicit owner approval).  
2. **22 unresolved historical source keys** — nonblocking backlog; not silently excluded.  
3. **ISS 2026 magnetic/UFO** — incomplete; unpublished pending DOI.  
4. **CHI HM** — evidence recorded; residual faculty confirmation note optional.  
5. **ESL** — accepted/public; proceedings DOI pending.  
6. **Patents** — application vs granted unverified at IPO/EPO.

## Integrity stance

Scientific accuracy over completeness. Archive = **32** verified/accepted records currently available. The **59** deduplicated intake entries are **bibliography candidates**, not 59 verified published papers.
