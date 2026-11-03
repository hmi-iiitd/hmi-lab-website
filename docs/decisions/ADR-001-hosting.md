# ADR-001 — Hosting topology and staging (M0/M1)

**Status:** Accepted for staging path **S1** (public repo + GitHub Pages project site), contingent on pre-public security audit  
**Date:** 2026-11-03  
**Working repo:** `hmi-iiitd/hmi-lab-website`  
**Production domain:** https://hmi.iiitd.edu.in/ (READ-ONLY until explicit M8 approval)  
**Historic repo:** `hmi-iiitd/hmi-iiitd.github.io` (READ-ONLY; never overwrite)

Operational details that identify internal network addresses or server software versions are kept in the operator’s **private ops store**, not in this public repository.

---

## Decision

1. Develop exclusively in `hmi-iiitd/hmi-lab-website`.
2. Use **S1**: public GitHub repository + GitHub Pages **project** staging at `/hmi-lab-website/` once the security audit passes and Pages is enabled.
3. Keep production on the institutional host until an approved M8 cutover. Variant A (Pages+DNS) vs B (institutional static deploy) remains undecided.
4. Astro `site`/`base` must support staging subpath and future production root `/` without hardcoded staging URLs in content.

---

## Verified findings (non-sensitive)

| Fact | Evidence class |
|---|---|
| Historic repo is private; last push May 2023; GitHub Pages disabled; contains static HTML + PHP; no Actions workflows | GitHub API / tree inspection |
| Live homepage HTML/CSS stack differs from the May 2023 Git snapshot (fonts, asset paths, title, much newer Last-Modified) | HTTP fetch compare |
| Live site is served by an institutional web server (not GitHub Pages) | Response headers / DNS authority (IIIT nameservers) |
| Some legacy pathnames from the historic tree still return HTTP 200 on the live host alongside newer assets | Path probes |
| Org plan reported free; no existing org repos with Pages enabled at audit time | GitHub API |

**Conclusion:** The historic GitHub repository is **not** the current deployment source of `hmi.iiitd.edu.in`. Residual path overlap suggests an earlier shared lineage that later diverged on the institutional host.

---

## Staging configuration (S1)

| Environment | Location | Notes |
|---|---|---|
| Dev | Local `astro dev` | No production credentials |
| CI | GitHub Actions on PRs / `main` | Required checks; no prod deploy |
| Staging | `https://hmi-iiitd.github.io/hmi-lab-website/` | `base: '/hmi-lab-website/'`, `noindex`, no prod analytics |
| Production | Unchanged institutional domain | Manual, human-approved only |

Draft / unverified research content must never ship in the published staging build.

---

## Blocker classification

See [`../M0-BLOCKERS.md`](../M0-BLOCKERS.md): **staging-required** vs **production-migration-only**.

---

## Explicit exclusions

- No edits to institutional DNS, TLS, or live site files from this project’s routine PRs.
- No changes to the historic repository.
- No automatic production publish from staging merges.
