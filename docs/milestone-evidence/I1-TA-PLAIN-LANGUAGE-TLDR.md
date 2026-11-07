# I1 / T-A — Canonical plain-language TL;DR infrastructure

**Status:** **CONDITIONAL PASS** addressed — Selected Research cardinality restored; awaiting faculty merge authorization. **Not merged.**  
**Baseline:** `main` @ `c0fce4f2d5fbb3470192d0d3cf6e1e923d8d9063`  
**Plan:** `docs/proposals/M421-EDITORIAL-VISUAL-REFINEMENT.md` (PR #11)  
**Authorization:** I1 / T-A only (2026-11-07)  
**PR:** https://github.com/hmi-iiitd/hmi-lab-website/pull/12  
**Faculty review:** GitHub review #5812505604 (CONDITIONAL PASS — cardinality fix)

## Scope delivered

| Item | Done |
|---|---|
| Optional TL;DR schema fields + `owner_approved` invariants | Yes |
| `getApprovedPlainLanguageTldr` single helper | Yes |
| Conditional render on Selected Research, archive, paper pages | Yes |
| Missing/unapproved → no empty chrome | Yes |
| Isolated fictional fixture for positive path (`INCLUDE_TEST_FIXTURES` / `dist-e2e`) | Yes |
| Staging `dist/` excludes fixture markers / synthetic TL;DR | Yes |
| Frozen Selected Research cardinality (`slice(1, 4)`) | Yes (restored after review) |
| Real paper TL;DR content / T-B drafting | **Out of scope** |
| I2–I4 homepage/layout/seven-card changes | **Out of scope** |

## RED → GREEN → review fix

| Commit / step | Role |
|---|---|
| `9ae2a69` | RED — failing schema/helper/UI tests + e2e stubs |
| `f751c67` | GREEN — schema, helper, UI fallbacks, fixture metadata |
| Follow-up | Restore `featured.slice(1, 4)`; fixture `featured_rank: 2` for e2e top-four; regression tests |

## File-level summary

| Path | Change |
|---|---|
| `src/lib/content/schemas.ts` | Optional TL;DR fields + `owner_approved` refinement |
| `src/lib/plain-language-tldr.ts` | `getApprovedPlainLanguageTldr` |
| `src/lib/publications.ts` | `isListablePublication` for fixture-enabled listings |
| `SelectedResearch.astro` | Approved-only TL;DR; **`featured.slice(1, 4)`** cardinality |
| `publications/index.astro` / `papers/[slug].astro` | Approved-only conditional render |
| `test-fixture-synthetic-interaction.md` | Fictional approved TL;DR; test-only rank **2** |
| `scripts/validate-content.ts` | Dist ban includes `TEST_ONLY_FICTIONAL summary:` |
| I1 content + e2e tests | Gates, three-surface fixture path, **1+3 homepage cards** |

## Invariants

- `owner_approved` requires nonempty TL;DR, reviewer, `YYYY-MM-DD` date, source note, and `tldr_review_evidence`.
- Helper returns text only when those constraints hold; drafts never render.
- Review-evidence string is structural — not independent proof of consent.
- Existing publications parse with default `tldr_status: missing`.
- Public homepage Selected Research remains **one primary + three secondary** cards; future `featured` records beyond four do not auto-expand the module before I2.

## Residual limitations

- No real approved TL;DRs yet (by design).
- Fixture appears in Playwright preview listings only when `INCLUDE_TEST_FIXTURES=1`.
- T-B content drafting and I2–I4 require separate PI authorization.

## CI evidence

| Item | Value |
|---|---|
| PR | https://github.com/hmi-iiitd/hmi-lab-website/pull/12 |
| Head SHA | _(filled after push of cardinality fix)_ |
| CI | _(filled after green run)_ |

## Recommendation

**PASS** for merging I1/T-A after this cardinality correction and green CI — **stop; do not merge without separate PI merge instruction.**
