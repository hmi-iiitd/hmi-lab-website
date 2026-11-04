# M4 planning — Research themes and selected flagship pages

**Status:** Planning only — **do not implement** until explicit faculty approval.  
**Base:** Staging at `96205585` (research positioning + visual design **frozen**).  
**Out of scope until separately approved:** M5+; institutional production (`hmi.iiitd.edu.in`); homepage/typography/logo/identity revisions.

---

## 1. PRD reconciliation (four themes → Interactive Intelligence)

The contractual PRD (`HMI_WEBSITE_PRD.md` §10 M4, §8 RES-01, §11) still describes a **four-theme** structure and an exploratory punchline. ADR-003 and the frozen M3.5/M3.5-positioning work supersede that for scientific identity.

| PRD (as written) | Approved / frozen reality | M4 implication |
|---|---|---|
| Four research themes (RES-01) | **Three** primary themes: Perception & Understanding · Learning & Coordination · Interaction & Adaptation | Theme index + **three** theme detail pages only |
| Punchline “Intelligence is an interaction.” | “Intelligence emerges through interaction.” | Do not reintroduce superseded copy |
| M4: “four theme pages” | Three theme slugs already in `src/content/research-areas/` | `/research/{theme-slug}/` × 3 |
| Flagship priority list includes HaptiDrag / ExpressEar as early exemplars | Faculty M4 candidates: **ESL, ADHD Sci Rep, CHI 2024 social robotics, MobiTangibles** | Plan and audit these four; HaptiDrag/ExpressEar deferred to M9-style expansion |
| Homepage featured cards may deep-link to project pages | Homepage featured set and copy **frozen** | M4 may add routes and “View project” links **only** where assets are cleared; do not rewrite hero/themes/pathways/About philosophy |
| Interactive ESL demo (DEMO-01 / M9) | Optional, scientifically validated later | **Out of M4 MVP** |

**Change-control note:** Implementing three themes instead of four is an explicit ADR-003-aligned correction of the PRD milestone text, not a silent scope change. A short ADR addendum (or PRD errata) should accompany the first M4 implementation PR if approved.

---

## 2. Proposed M4 objectives

Tell the lab’s scientific story through:

1. **Three research-theme pages** that list only verified, published publications linked by `research_areas`.
2. A **reusable flagship-project template** for enhanced showcases (problem → contribution → methodology → evidence → findings → limitations → resources).
3. **Up to four candidate showcases** (below), gated by evidence/asset clearance.
4. An **evidence and permissions audit** before any figure, photo, video, or participant-related material is published.
5. A **minimum viable acceptance gate** of **three** scientific-owner-reviewed showcase pages (PRD M4 gate), with all three theme pages also shipping in the same milestone unless faculty narrows further.
6. A **test-first** plan that blocks unsupported claims and false resource links.

Frozen and unchanged in M4: homepage copy, typography tokens, original HMI logo, three-theme titles/summaries, Research Philosophy, Application Pathways taxonomy/intro, and punchline.

---

## 3. Theme pages (`/research/{theme-slug}/`)

### 3.1 Routes and sources

| Theme id | Title | Existing summary (verbatim — do not rewrite for loop narrative) |
|---|---|---|
| `perception-understanding` | Perception & Understanding | Current `research-areas` summary |
| `learning-coordination` | Learning & Coordination | Current `research-areas` summary |
| `interaction-adaptation` | Interaction & Adaptation | Current `research-areas` summary |

**Page content (proposed):**

- Theme title + existing one-sentence summary (canonical from content collection).
- Optional short “organising lens” sentence **only if** faculty re-approves reuse of the Research-page feedback-loop lede locally; default = **no new philosophy copy** on theme pages.
- Ordered list of **verified public** publications with `research_areas` containing the theme id (same provenance rules as archive).
- Links to `/papers/{slug}/` and, when a cleared flagship exists, `/projects/{project-slug}/`.
- Explicit empty-state if a theme temporarily has zero public papers (must not invent fillers).
- No fabricated “active projects,” people blocks, or methods sections without verified content.

### 3.2 Navigation

- Research index already lists themes → add deep links to theme pages.
- Homepage theme cards may point to theme pages **without** changing card titles/summaries.
- Preserve existing publications filter `?theme=` behaviour.

---

## 4. Flagship-project template (`/projects/{slug}/`)

### 4.1 Required sections (PROJ-01 aligned)

| Section | Rule |
|---|---|
| Scientific problem / question | Owner-approved wording; not a second slogan |
| Contribution | Tied to the paper’s actual claims |
| Methodology | Accurate to the paper; no invented protocols |
| Evidence | Only cleared figures/tables/photos/video; caption + source + permission state |
| Findings | Paraphrase only what the paper supports; no clinical overclaim |
| Limitations / scope | Mandatory; include synthetic/lab/scope boundaries when relevant (e.g. ESL) |
| Resources | DOI/PDF/code/dataset/video/slides **only if URL verified and public**; never invent |

### 4.2 Template behaviour

- Generated from extended `projects` content + linked `publication_ids` (schema extension required at implementation time).
- Paper bibliographic facts remain owned by the publication record (CON-01).
- Distinguish **empirical figure** vs **illustrative schematic** in captions and metadata.
- Accessible media fallback: text alternative required; video needs captions/transcript when used.
- No-JS readable core (problem, findings, limitations, resource list as plain links).

### 4.3 Schema extension (proposal — not implemented)

Extend `projectSchema` only after approval, e.g.:

- `problem`, `contribution`, `methodology`, `findings`, `limitations` (markdown or structured fields)
- `assets[]` with `path`, `caption`, `kind` (`empirical` \| `illustrative`), `permission` (`approved` \| `pending` \| `denied`), `owner`, `source`
- `resource_overrides` forbidden unless matching verified publication URLs
- `scientific_owner`, `content_verified_at`, `published` remains false until owner sign-off

Draft projects stay `published: false` (current placeholder pattern).

---

## 5. Four candidate showcases — evidence audit (preliminary)

Preliminary status from **current** publication records on `main`. All media/permissions rows require paper-owner completion before publish.

### 5.1 NeurIPS 2026 — Epistemic Social Learning (ESL)

| Field | Current known state |
|---|---|
| Slug / id | `epistemic-social-learning` / `esl-neurips-2026` |
| Theme(s) | `learning-coordination` |
| Status | **Accepted** (not formal proceedings); no DOI |
| Public URLs | NeurIPS poster listing; PDF/code/dataset/video **null** |
| Risks | Overclaiming proceedings publication; inventing regret plots or game results; shipping code link before release |
| Required owner actions | Confirm abstract/highlights/limitations wording; approve any schematic; decide PDF/code release; clear synthetic-scope language |
| Participant media | None expected (computational / synthetic setting) |

### 5.2 Sci Rep 2026 — Trial-level pupil dynamics (ADHD)

| Field | Current known state |
|---|---|
| Slug / id | `trial-pupil-dynamics-adhd` / `trial-pupil-adhd-2026` |
| Theme(s) | `perception-understanding` |
| Applications | neurodevelopment, health |
| Status | Published; DOI verified |
| Public URLs | DOI; code/dataset/video **null** in content |
| Risks | Clinical overgeneralization; unauthorized pupil/participant imagery; implying diagnostic product claims |
| Required owner actions | Approve findings/limitations copy; figure permissions from paper/SI; confirm no identifiable participant imagery without consent documentation |
| Participant media | **High sensitivity** — default to publisher figures under license or text-only until clearance |

### 5.3 CHI 2024 — Social robots for autism care (Honorable Mention)

| Field | Current known state |
|---|---|
| Slug / id | `social-robots-autism-care-india` / `chi-2024-social-robots-india` |
| Theme(s) | `interaction-adaptation`, `learning-coordination` |
| Applications | autism, neurodevelopment, health, social-robotics |
| Status | Published; award recorded |
| Risks | Photos of educators/children/settings without permission; overgeneralizing qualitative findings |
| Required owner actions | Asset inventory from CHI paper/author materials; written permission for each photo/figure; findings language reviewed for scope |
| Participant / field media | **High sensitivity** |

### 5.4 MobiTangibles — IEEE TVCG 2024

| Field | Current known state |
|---|---|
| Slug / id | `mobitangibles` / `mobitangibles-2024` |
| Theme(s) | `interaction-adaptation`, `perception-understanding` |
| Attribution | collaborative |
| Status | Published; DOI verified |
| Public URLs | DOI; code/dataset/video **null** in content |
| Risks | Technique photography/video without coauthor/venue clearance |
| Required owner actions | Approve method/limitations copy; clear photos/video; confirm collaborative attribution on project page |

### 5.5 Shared audit checklist (per showcase)

Before `published: true` on a project:

- [ ] Scientific owner named and recorded  
- [ ] Every claim maps to paper text or an approved paraphrase  
- [ ] Limitations section present  
- [ ] Each asset has caption, kind (empirical/illustrative), permission, and source  
- [ ] No fabricated code/PDF/dataset/video URLs  
- [ ] Accessibility: alt text / transcript as applicable  
- [ ] Legal/ethics: participant-related media cleared or omitted  

**Do not fabricate** experimental results, figures, code links, clinical claims, or demonstrations.

---

## 6. Minimum viable scope — initial three-page acceptance gate

Aligned with PRD M4 gate (“three exemplary project pages reviewed by scientific owners”):

### MVP-A (recommended)

1. **Three theme pages** live and linked from Research index / homepage theme cards.  
2. **Reusable project template** implemented and covered by tests.  
3. **Exactly three** of the four showcases published after owner review — **proposed default trio for gate:**  
   - ESL (programme-defining AI / multi-agent)  
   - CHI 2024 social robotics (interaction + application pathway)  
   - MobiTangibles **or** ADHD Sci Rep (faculty chooses one interactive-systems vs sensing exemplar for the third slot)  
4. Fourth showcase remains draft until assets clear (still audited in parallel).

### MVP-B (narrower, if media clearance blocks)

- Three theme pages + template + **two** showcases public + one structured empty/draft project page **not** linked from homepage featured cards.

**Homepage freeze:** Featured publication cards already link to paper pages; upgrading a card to a project deep-link is optional and must not change card titles/order/copy.

---

## 7. Test-first implementation plan (when approved)

### 7.1 Content / unit (Vitest)

- Exactly three published primary themes; theme page generation for each slug.  
- Theme page lists only publications whose `research_areas` include that theme and that pass publishability.  
- Project → publication relation resolves; unknown `publication_ids` fail CI.  
- `published: true` projects require limitations + verified resources + asset permission ≠ `pending` for any visible media.  
- No public project may expose `code_url`/`pdf_url`/etc. that are null or non-http(s).  
- Approved About body hash / positioning constants remain unchanged (regression).  

### 7.2 E2E (Playwright)

- Homepage → theme page → paper page path.  
- Research index links to each theme.  
- Flagship page renders required sections; missing media shows accessible fallback, not broken `<img>`.  
- Responsive media at 320 / 390 / 768 / 1024 / 1440; no horizontal overflow.  
- axe scan on theme + project templates.  
- Keyboard reachability of resource links; no-JS readable abstract/findings/limitations.  

### 7.3 Prohibitions enforced in tests

- Fail if project markdown contains placeholder claim tokens (e.g. `TODO_FINDING`, lorem).  
- Fail if illustrative assets are labeled as empirical (metadata invariant).  
- Fail if ESL page claims DOI/proceedings publication while publication record has `doi: null` / accepted-only status.  

### 7.4 Evidence for the M4 gate

- Owner sign-off checklist per published showcase.  
- Screenshots (runtime dir only; do not overwrite historical milestone PNGs).  
- CI green on the implementation PR; staging smoke after merge.  

---

## 8. Proposed milestones (implementation sequencing — gated)

| Step | Deliverable | Exit criteria |
|---|---|---|
| **M4.0** | Faculty approval of this plan + MVP trio selection + ADR/PRD errata for three themes | Written approval |
| **M4.1** | Schema + theme pages + tests (no new flagship copy) | Theme routes green; frozen identity regressions pass |
| **M4.2** | Project template + one draft showcase (unpublished) | Template tests green; no public project yet |
| **M4.3** | Evidence audit completion for chosen trio | Owner checklists filed |
| **M4.4** | Publish three showcases on staging | Scientific owner review; a11y; no unsupported claims |
| **M4.5** | Optional fourth showcase | Same bar as M4.4 |

Coding starts only at **M4.1** after **M4.0** approval.

---

## 9. Risks

| Risk | Mitigation |
|---|---|
| PRD still says four themes | Explicit reconciliation in this doc + ADR/PRD errata before coding |
| Media/permissions delay CHI or ADHD showcases | Choose MVP trio that can clear; keep others draft |
| Pressure to invent ESL plots/code links | Tests + accepted-only status guards; no demo in M4 |
| Clinical/HRI overclaim | Mandatory limitations; owner review; omit sensitive media by default |
| Scope creep into people/news/production | Hard stop after M4.4/M4.5; M5+ and production separately gated |
| Accidental homepage/identity edits | Regression tests on frozen constants and About hash |

---

## 10. Explicit non-goals (M4)

- No homepage, About philosophy, Application Pathways, or typography redesign.  
- No new slogans or competing punchlines.  
- No ESL interactive belief demo.  
- No new application tags.  
- No production deploy.  
- No fabrication of results, figures, code links, clinical claims, or demonstrations.  
- No copying historic licensed assets without clearance (LEG-01).  

---

## 11. Approval checklist (faculty)

- [ ] Accept three-theme reconciliation of PRD M4 / RES-01  
- [ ] Accept flagship template section list  
- [ ] Select MVP trio among ESL / ADHD Sci Rep / CHI 2024 / MobiTangibles  
- [ ] Confirm scientific owners for each selected showcase  
- [ ] Approve evidence-audit process before any media lands in `public/`  
- [ ] Authorize start of **M4.1** (theme pages only) or full M4.1–M4.4 sequence  

**Stop here until explicit approval.** No M4 coding, no production changes.
