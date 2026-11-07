# I1 / T-A — Canonical plain-language TL;DR infrastructure

**Status:** Implemented on PR — **awaiting faculty review; not merged.**  
**Baseline:** `main` @ `c0fce4f2d5fbb3470192d0d3cf6e1e923d8d9063`  
**Plan:** `docs/proposals/M421-EDITORIAL-VISUAL-REFINEMENT.md` (PR #11)  
**Authorization:** I1 / T-A only (2026-11-07)

## Scope delivered

| Item | Done |
|---|---|
| Optional TL;DR schema fields + `owner_approved` invariants | Yes |
| `getApprovedPlainLanguageTldr` single helper | Yes |
| Conditional render on Selected Research, archive, paper pages | Yes |
| Missing/unapproved → no empty chrome | Yes |
| Isolated fictional fixture for positive path (`INCLUDE_TEST_FIXTURES` / `dist-e2e`) | Yes |
| Staging `dist/` excludes fixture markers | Yes |
| Real paper TL;DR content / T-B drafting | **Out of scope** |
| I2–I4 homepage/layout/seven-card changes | **Out of scope** |

## RED → GREEN

| Commit role | Purpose |
|---|---|
| RED | Failing schema/helper/UI tests + e2e stubs |
| GREEN | Schema, helper, UI fallbacks, fixture metadata, tests green |

## Invariants

- `owner_approved` requires nonempty TL;DR, reviewer, `YYYY-MM-DD` date, source note, and `tldr_review_evidence`.
- Helper returns text only when those constraints hold; drafts never render.
- Review-evidence string is structural — not independent proof of consent.
- Existing publications parse with default `tldr_status: missing`.

## Residual limitations

- No real approved TL;DRs yet (by design).
- Fixture appears in Playwright preview listings only when `INCLUDE_TEST_FIXTURES=1`.
- T-B content drafting and I2–I4 require separate PI authorization.

## Recommendation

**PASS** for merging I1/T-A infrastructure after faculty ack of residuals — **stop; do not merge without separate PI merge instruction.**
