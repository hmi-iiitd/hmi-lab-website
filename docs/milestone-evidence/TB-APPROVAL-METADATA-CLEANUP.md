# T-B — Approval metadata consistency cleanup

**Status:** Implementation PR prepared; awaiting faculty merge authorization.  
**Baseline:** `main` @ `e3cad6abbb07f7e1a73e329ff9f97bf50a4e3f44` (I4 merged; CI + Pages OK)  
**Authority:** Inherited T-B drafting contradiction; PI approvals in PR #13 / publication in PR #14.

## Problem

Seven `owner_approved` publication records still ended `tldr_source_note` with:

> Not owner-approved for public display.

That drafting-phase sentence contradicted `tldr_status: owner_approved` and the live approved-only rendering gate.

## Change

Minimal edit only: remove that obsolete sentence from:

1. `epistemic-social-learning.md`
2. `predictive-asd-acoustic-linguistic.md`
3. `trial-pupil-dynamics-adhd.md`
4. `social-robots-autism-care-india.md`
5. `vr-flat-screen-gaming-responses.md`
6. `emotion-recognition-eda.md`
7. `express-ear.md`

Preserved: scientific provenance, DOI/abstract grounding, methodological caveats, historical “Lay draft after PR #13…” wording, `plain_language_tldr`, `tldr_status`, `tldr_approved_at`, `tldr_reviewed_by`, `tldr_review_evidence`.

## Frozen fields (unchanged)

| Field | Status |
|---|---|
| `plain_language_tldr` (7 exact PI strings) | Unchanged |
| `tldr_status` | `owner_approved` |
| `tldr_approved_at` | `2026-11-07` |
| `tldr_reviewed_by` | Unchanged |
| `tldr_review_evidence` (7 PR #13 discussion URLs) | Unchanged |
| Homepage / I2 / I3 / I4 surfaces | Untouched |

## RED → GREEN

| Step | SHA | Notes |
|---|---|---|
| RED | `a30da9e` | Failing source-note consistency tests in `tb-seven-tldr-drafts.test.ts` |
| GREEN | `2a8c806` | Seven-file disclaimer removal |

## Public HTML unchanged

Local `npm run build:staging` SHA-256 comparison (before → after):

| Path | Result |
|---|---|
| `index.html` | SAME |
| Selected Research fragment | SAME |
| `about/index.html` | SAME |
| `publications/index.html` | SAME |
| Seven `papers/*/index.html` | SAME |

`tldr_source_note` is metadata-only and does not render into public HTML.

## Verification

| Check | Result |
|---|---|
| `vitest` (105) | Pass |
| Playwright e2e (107 pass / 1 skip) | Pass |
| `test:a11y` | Pass |
| Stale denial string in publications content | Absent |

## Out of scope

- T-C / T-D remaining TL;DRs
- M4.3 / M4.4
- Production deployment

## CI evidence

| Item | Value |
|---|---|
| PR | *(filled after open)* |
| Head SHA | *(branch tip)* |
| CI | *(filled after Actions)* |

## Recommendation

**PASS** for merging after green CI — **stop; do not merge without separate PI merge instruction.**
