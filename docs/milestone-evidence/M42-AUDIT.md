# M4.2 independent audit — gated Research Story template

**PR:** #10 (`feat/m42-research-story-template`)  
**Audited head (pre-audit-fix):** `cb858522`  
**Recommendation:** **CONDITIONAL PASS** — merge only after faculty ack of residual limitations; **do not** publish flagships or start M4.3/M4.4 from this PR alone.

## 1. File-level change summary

| Path | Role |
|---|---|
| `src/lib/content/schemas.ts` | `researchArtifactSchema` + gated `projectSchema` (owner sign-off, sections, placeholder ban) |
| `src/lib/content/validate.ts` | Project Zod validation; published stories must reference verified public pubs |
| `scripts/validate-content.ts` | Missing approved media check; **unreferenced `public/research` media blocked** |
| `src/lib/projects.ts` | `isPublicProject`, `canonicalPublicationForStory` |
| `src/pages/projects/[slug].astro` | Public routes only for `published: true` |
| `src/components/ResearchStory.astro` | Appendix A storytelling template (text-first; optional artifact) |
| `src/content/projects/esl-research-story.md` | Unpublished ESL scaffold (`published: false`) |
| `tests/content/m42-research-story.test.ts` | Schema / draft / Appendix landmarks / media policy |
| `tests/e2e/m42-research-story.spec.ts` | Draft exclusion, 404, M4.1/homepage freeze regression |
| `docs/proposals/M4-RESEARCH-THEMES-AND-FLAGSHIPS.md` | Milestone status aligned to template-only M4.2 |

**Unchanged (frozen):** homepage copy, typography tokens, About philosophy, logo, identity constants.

## 2. Appendix A template checklist

| Requirement | Status |
|---|---|
| Scientific question + contribution | Present (`problem`, `contribution`) |
| Optional verified artifact | Optional `artifact`; image/video with caption, kind, source, alt; video needs transcript; `controls` + `preload="none"` (no autoplay) |
| Method | Present |
| 1–2 findings | `findings` max 2; ≥1 required when published |
| Limitations / scope | Required when published |
| Resources + citation from canonical pub | `publicationResourceLinks` + `toBibtex(paper)`; no project-local resource URL fields |
| Programme interpretation separated | Label: “Programme interpretation · Not a separate empirical finding” |
| Text-only readable / no-JS | Server-rendered HTML; no client runtime required for prose |
| Accepted ≠ published | ESL status surfaced as Accepted + proceedings caveat |

## 3. Scientific-integrity & media-safety (enforced vs documented)

**Enforced by schema/build/CI:**

- Draft `published: false` → no static path; Research index / homepage / themes show no project link; e2e asserts 404.
- Published requires: exactly one `publication_id`, problem/contribution/methodology/limitations/programme_interpretation, ≥1 finding, `scientific_owner` + `scientific_owner_approved_at` date.
- Placeholder tokens (`TODO_`, lorem, `TBD`) fail Zod when published.
- Artifact permission must be `"approved"`; path confined to `research/…`; pending media cannot be modeled in schema.
- Published artifact files must exist under `public/`; **orphan files under `public/research/` fail validate-content**.
- Linked publication must be verified public (`published` or `accepted`).

**Not machine-enforceable (residual — human M4.3/M4.4 gates):**

- Finding text accuracy vs the PDF/paper body.
- That `scientific_owner` string matches a consented author (no allowlist / signature).
- Clinical/participant sensitivity of prose beyond placeholder heuristics.
- That unapproved media never enter git history outside `public/research` (e.g. other paths) — only `public/research` is scanned.

## 4. Test-first evidence

| Commit | Role |
|---|---|
| `d4fe51e` | RED — failing schema/draft gate tests |
| `074b9ec` | GREEN — template, gates, unpublished ESL draft |
| Follow-ups | Typing, fixture/docs alignment |
| Audit follow-up | Placeholder + Appendix landmark tests; orphan media scan; theme/homepage freeze e2e |

Full local `npm run ci` + targeted Playwright (m42 + m4 theme + positioning) executed during audit.

## 5. Rendered review evidence

- **No public Research Story HTML** is generated while ESL remains unpublished (build lists `projects/[slug].astro` with zero routes) — expected for M4.2.
- Draft exclusion verified via e2e (404 + no nav links).
- Desktop/mobile storytelling/a11y of the **rendered** template cannot be fully screenshot-validated until a faculty-approved published fixture exists (M4.4). Template landmarks are unit-asserted against `ResearchStory.astro`.

## 6. Weaknesses / limitations

1. No published fixture → limited Playwright coverage of axe/reflow/no-JS on the story page itself.  
2. Owner approval is declarative metadata, not cryptographic consent.  
3. Scientific claim truthfulness remains owner-reviewed.  
4. Award text (e.g. CHI HM) is inherited via the paper record link, not duplicated in the story chrome (acceptable; confirm in M4.4 copy review).

## 7. Recommendation

**CONDITIONAL PASS** for merging the **template + draft-only** M4.2 PR after faculty acknowledgment of §3 residuals and §5 render gap.

**Hold / out of scope:** publishing ESL/ADHD/CHI/MobiTangibles pages; M4.3 evidence audits as completed gates; M4.4; production.
