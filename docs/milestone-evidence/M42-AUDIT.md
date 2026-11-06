# M4.2 independent audit — gated Research Story template

**PR:** #10 (`feat/m42-research-story-template`)  
**Prior audited head:** `8ba1d8d` (CONDITIONAL PASS — rendered-template gap)  
**Fixture-closure head:** _(filled after push; see §8)_  
**Recommendation:** **PASS** for merging the **template + draft-only + isolated fixture tests** M4.2 PR after faculty acknowledgment of residual human gates in §3. **Do not** publish flagships or start M4.3/M4.4 from this PR alone. **Stop before merging until faculty sign-off.**

## 1. File-level change summary

| Path | Role |
|---|---|
| `src/lib/content/schemas.ts` | `researchArtifactSchema` + gated `projectSchema`; `test_fixture` on pub/project |
| `src/lib/content/validate.ts` | Fixture stories may link only fixture pubs; public stories only verified public pubs |
| `src/lib/test-fixtures.ts` | `INCLUDE_TEST_FIXTURES=1` build switch |
| `src/lib/publications.ts` / `src/lib/projects.ts` | `isPublic*` excludes fixtures; `isRenderable*` env-gates fixtures |
| `scripts/validate-content.ts` | Orphan `public/research` ban; staging dist bans `TEST_ONLY_FICTIONAL` / fixture slugs; fixtures must stay text-only |
| `src/components/ResearchStory.astro` | Appendix A storytelling template (text-first; optional artifact) |
| `src/pages/projects/[slug].astro` / `papers/[slug].astro` | Static paths via `isRenderable*` |
| `src/pages/research/index.astro` | Project listings use `isPublicProject` (fixtures never listed) |
| `src/content/projects/esl-research-story.md` | Unpublished ESL scaffold (`published: false`) |
| `src/content/projects/test-fixture-research-story.md` | **Fictional** `test_fixture` story (text-only) |
| `src/content/publications/test-fixture-synthetic-interaction.md` | **Fictional** Accepted fixture publication |
| `package.json` / `playwright.config.ts` | `build:staging:e2e` → `dist-e2e`; Playwright serves fixture build only |
| `tests/content/m42-research-story.test.ts` | Schema / draft / Appendix landmarks / fixture isolation |
| `tests/unit/test-fixtures.test.ts` | Public vs renderable gate unit tests |
| `tests/e2e/m42-research-story.spec.ts` | Public exclusion + full rendered fixture suite |
| `src/styles/components.css` | Narrow-viewport wrap for long titles / BibTeX (no token or copy changes) |

**Unchanged (frozen):** homepage copy, typography tokens, About philosophy, logo, identity constants.

## 2. Appendix A template checklist

| Requirement | Status |
|---|---|
| Scientific question + contribution | Present (`problem`, `contribution`) |
| Optional verified artifact | Optional `artifact`; fixtures forbidden from shipping artifacts |
| Method / findings / limitations | Present; findings max 2 |
| Resources + citation from canonical pub | `publicationResourceLinks` + `toBibtex(paper)` |
| Programme interpretation separated | Label: “Programme interpretation · Not a separate empirical finding” |
| Text-only readable / no-JS | Server-rendered; e2e no-JS on fixture |
| Accepted ≠ published | Fixture Accepted + proceedings caveat; ESL remains Accepted on theme pages |

## 3. Scientific-integrity & media-safety (enforced vs documented)

**Enforced by schema/build/CI:**

- Draft `published: false` → no static path; Research index / homepage / themes show no project link; e2e asserts ESL 404.
- `test_fixture: true` never appears in `isPublicPublication` / `isPublicProject` listings.
- Fixture routes exist **only** when `INCLUDE_TEST_FIXTURES=1` (Playwright `dist-e2e`); normal `build:staging` emits **zero** project routes.
- Staging dist scan fails on `TEST_ONLY_FICTIONAL`, fixture slugs, and draft markers.
- Fixtures cannot authorize `public/research` media; orphan research media blocked.
- Published requires owner fields + sections; placeholder tokens fail Zod.
- **Recorded `scientific_owner` + approval date are not independent proof of consent.**

**Not machine-enforceable (residual — human M4.3/M4.4 gates):**

- Finding text accuracy vs the PDF/paper body.
- That `scientific_owner` matches a consented author (no allowlist / signature).
- Clinical/participant sensitivity of prose beyond placeholder heuristics.

## 4. Test-first evidence

| Commit / step | Role |
|---|---|
| `d4fe51e` → `074b9ec` | RED→GREEN template + unpublished ESL |
| `8ba1d8d` | Independent audit (CONDITIONAL PASS — render gap) |
| Fixture closure (this update) | Fictional fixture + env-gated paths + rendered e2e + staging isolation |

**Local verification (fixture closure):**

- `npm run ci` — lint, typecheck, 69 unit/content tests, validate-content, staging build, re-validate dist.
- Staging build: **40 pages**, `projects/[slug].astro` with **zero routes**; no fixture paper route; no `public/research`; dist scan clean of fixture markers.
- `npm run test:e2e` — **84 passed** (1 skipped), including 13 M4.2 cases on fixture-enabled `dist-e2e`.

## 5. Rendered review evidence (fixture)

Isolated fictional story at `/projects/test-fixture-research-story/` (fixture build only):

| Check | Result |
|---|---|
| Full Appendix A section hierarchy | Pass |
| Text-only (no figure/video) | Pass |
| Viewports 320 / 390 / 768 / 1024 / 1440 — no horizontal overflow | Pass |
| Axe serious/critical | Pass |
| Keyboard (skip link → main; resource link focus) | Pass |
| No-JS readability | Pass |
| Canonical paper link + Accepted labeling | Pass |
| Verified Publisher link present; DOI/PDF/Code/Dataset/Video/Slides/Project absent | Pass |
| Public surfaces never list fixture / ESL story | Pass |

## 6. Staging isolation proof

After `npm run build:staging` + `npm run validate:content`:

- Zero public flagship Research Story routes.
- Zero test-fixture HTML/JS/CSS/JSON markers in `dist/`.
- Zero unapproved research media under `public/research/`.
- Playwright never overwrites staging `dist/` (uses `dist-e2e/`, gitignored).

## 7. Weaknesses / limitations

1. Owner approval remains declarative metadata, not cryptographic consent.  
2. Scientific claim truthfulness remains owner-reviewed.  
3. Fixture content lives in the repo as marked `test_fixture` source; it must never be promoted without removing `test_fixture` and completing human gates.

## 8. CI evidence (fill after push)

| Item | Value |
|---|---|
| PR | https://github.com/hmi-iiitd/hmi-lab-website/pull/10 |
| Head SHA | `_pending_push_` |
| CI run | `_pending_ci_` |

## 9. Recommendation

**PASS** — close the M4.2 rendered-template testing gap with an isolated fictional fixture. Safe to merge **after faculty sign-off** on §3 residuals.

**Hold / out of scope:** publishing ESL/ADHD/CHI/MobiTangibles pages; treating owner date as consent; M4.3 evidence audits as completed gates; M4.4; production deploys from this PR.
