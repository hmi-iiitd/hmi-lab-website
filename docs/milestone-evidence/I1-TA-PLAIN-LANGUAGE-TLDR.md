# I1 / T-A — Canonical plain-language TL;DR infrastructure

**Status:** Implemented on PR — **awaiting faculty review; not merged.**  
**Baseline:** `main` @ `c0fce4f2d5fbb3470192d0d3cf6e1e923d8d9063`  
**Plan:** `docs/proposals/M421-EDITORIAL-VISUAL-REFINEMENT.md` (PR #11)  
**Authorization:** I1 / T-A only (2026-11-07)  
**PR:** https://github.com/hmi-iiitd/hmi-lab-website/pull/12  
**Head SHA:** `f751c67953c0671668f7147ac9242880a0fb1882`  
**CI:** https://github.com/hmi-iiitd/hmi-lab-website/actions/runs/42377775477 (success)

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

| Commit | Role |
|---|---|
| `9ae2a69` | RED — failing schema/helper/UI tests + e2e stubs |
| `f751c67` | GREEN — schema, helper, UI fallbacks, fixture metadata, tests green |

## File-level summary

| Path | Change |
|---|---|
| `src/lib/content/schemas.ts` | Optional TL;DR fields + `owner_approved` refinement |
| `src/lib/plain-language-tldr.ts` | `getApprovedPlainLanguageTldr` |
| `src/lib/publications.ts` | `isListablePublication` for fixture-enabled listings |
| `SelectedResearch.astro` / `publications/index.astro` / `papers/[slug].astro` | Approved-only conditional render |
| `test-fixture-synthetic-interaction.md` | Fictional approved TL;DR for e2e only |
| `tests/content/i1-plain-language-tldr.test.ts` / `tests/e2e/i1-plain-language-tldr.spec.ts` | Gates + three-surface fixture coverage |

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
