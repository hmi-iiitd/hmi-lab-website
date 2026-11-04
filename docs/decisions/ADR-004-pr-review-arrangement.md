# ADR-004 — Sustainable PR review for protected `main` (draft proposal)

**Status:** Proposed — **do not invite collaborators without explicit faculty/owner approval**  
**Date:** 2026-11-04  
**Related:** ADR-002 (branch protection), PR #1 M3 merge gate

## Context

`main` requires: pull request, **1** approving review, required check `quality`, and `enforce_admins: true`.  
Today the only collaborator with write access is the PR author (`jainendra2019`), so self-merge of PR #1 is blocked until an eligible second account can approve.

## Proposed arrangement (awaiting owner approval)

1. Identify a **trusted HMI lab member** (e.g. senior PhD / staff collaborator) who can review scientific and engineering changes.  
2. Grant **repository-scoped Write** on `hmi-iiitd/hmi-lab-website` only (not org Owner).  
3. Reviewer responsibilities: approve PRs after CI green; spot-check publication integrity and staging when asked.  
4. Keep `enforce_admins: true` — no bypass of required checks.  
5. Optional later: CODEOWNERS for `src/content/publications/**` once a reviewer is designated.

## Explicit non-actions until approval

- Do **not** invite GitHub users.  
- Do **not** disable or weaken branch protection.  
- Do **not** use admin override / force merge.

## Consequence

M3 PR #1 remains open until an eligible independent review lands; then merge via the protected workflow and verify GitHub Pages staging.
