# ADR-002 — Branch protection for `main`

**Status:** Accepted (2026-11-03)  
**Context:** M2 was merged by direct push while classic branch protection listed a required `quality` check but `enforce_admins` was **false**, so the org admin bypassed PR + status checks.

## Decision

Configure GitHub classic branch protection on `main` as:

- Require pull request before merging
- Require approving review count: **1**
- Require status check: **`quality`** (strict)
- **Enforce admins: true**
- Linear history: true
- Force pushes / deletions: disabled

## Verification

Non-destructive probe (2026-11-03): pushing a feature-branch commit directly to `main` was rejected with:

`GH006: Protected branch update failed` — “Changes must be made through a pull request” and “Required status check quality is expected.”

## Consequence

All M3+ work ships via feature branch → PR → CI `quality` → human approval → merge. Solo-maintainer merges require an approving review from an account other than the PR author (or temporary protection adjustment documented in an ADR).
