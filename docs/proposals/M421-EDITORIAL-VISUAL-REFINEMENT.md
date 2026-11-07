# M4.2.1 — Editorial and visual refinement (planning proposal)

**Status:** PLANNING ONLY — documentation PR; **do not implement or merge site changes without faculty approval.**  
**Baseline:** `main` @ `7006a76ea05dbb083753b84cbba6f85ac840db1b`  
**Staging reference:** https://hmi-iiitd.github.io/hmi-lab-website/  
**Preserves:** Interactive Intelligence programme, three research themes, approved fonts/colours/logo, institutional branding, genuine Minsky §16.1 quotation, verified publication records (no silent substitution).

**Out of scope for this PR:** site code, schema, featured ranks, media uploads, Research Story publication, M4.3/M4.4, production.

---

## Recommendation (executive)

| Decision | Proposal |
|---|---|
| Overall milestone | **CONDITIONAL PASS** as a planning package — ready for faculty sign-off on §12; implementation only after explicit approval |
| Homepage identity hierarchy | Promote **Interactive Intelligence** to H1; keep **Intelligence emerges through interaction.** as secondary lead |
| Composition | Prefer **refined left-aligned editorial stack** with tighter vertical rhythm; offer restrained two-column desktop as Option B |
| Selected Research layout | **Option A** — one prominent feature + six compact cards (faculty-preferred) |
| Feature paper | **Epistemic Social Learning** as primary feature; **ASD/AIIMS** and **ADHD** as elevated priority cards among the six |
| HMI proposition | Place in About → Research Philosophy, clearly labeled **HMI-authored (Minsky-inspired)**, never as a Minsky quote |
| TL;DR | Optional schema + phased rollout A→D; never a hard required field on existing records |

---

## 1. Diagnosis — homepage and About (`7006a76` / staging)

### 1.1 Homepage

| Element | Current state | Diagnosis |
|---|---|---|
| Eyebrow | `Interactive Intelligence · IIIT-Delhi` | Programme name is secondary chrome, not the hero signal |
| H1 | `Intelligence emerges through interaction.` (`PUNCHLINE`) | Punchline dominates; brand-test fails if nav is ignored — identity reads as a slogan site |
| Lead | Approved `HERO_INTRODUCTION` | Sound scientifically; competes with tall display H1 + large hero padding |
| Hero art | Decorative SVG, absolute, low opacity | Acceptable atmosphere; does not substitute for research depth |
| Vertical space | `.hero` padding `clamp(4.2rem…7.5rem)` / `clamp(3.2rem…5.2rem)`; section padding similarly generous | Faculty “excessive whitespace” concern is credible on large viewports |
| Selected Research | 1 large feature (decorative viz + ESL) + **3** mini-cards (CHI, ADHD, MobiTangibles) | Under-represents faculty’s seven-paper portfolio; MobiTangibles displaces VR/EDA/ExpressEar/ASD; ASD missing entirely from homepage |
| Themes / pathways | Intact Interactive Intelligence structure | Keep; do not redefine |
| Alignment | Left-aligned prose (`text-align: start`); no global justify | Correct — preserve |

### 1.2 About

| Element | Current state | Diagnosis |
|---|---|---|
| Approved description | Five-paragraph canonical body | Keep verbatim unless faculty re-opens identity freeze |
| Research Philosophy | Question + two paragraphs | Natural home for the new HMI proposition (adjacent, not replacing) |
| Minsky quote | Authentic §16.1 / p.163, correctly cited | **Must preserve**; do not overwrite with the HMI-authored line |

### 1.3 Frozen-identity implication

M3.5 / positioning approvals froze `PUNCHLINE` as homepage H1. Elevating **Interactive Intelligence** to H1 is an **identity hierarchy change** requiring explicit faculty approval and an ADR/identity-constant update — not a silent CSS tweak.

---

## 2. Revised homepage identity hierarchy

### Proposed (before → after)

| Role | Before (frozen) | After (proposed) |
|---|---|---|
| Eyebrow | Interactive Intelligence · IIIT-Delhi | Human–Machine Interaction · IIIT-Delhi *(or retain IIIT-Delhi only)* |
| **H1** | Intelligence emerges through interaction. | **Interactive Intelligence** |
| Secondary statement | *(absorbed into H1)* | **Intelligence emerges through interaction.** (lead / deck, not italic fragment inside H1) |
| Supporting paragraph | `HERO_INTRODUCTION` | Keep approved wording unless faculty revises |
| CTAs | Research / Publications / About | Unchanged |

### Rationale

- Brand-first: programme name becomes the hero-level signal.
- Punchline remains the intellectual claim, not a competing brand.
- Matches faculty direction without inventing a third slogan.

### Approval impact

Update `RESEARCH_IDENTITY` / `PUNCHLINE` usage in `src/lib/identity.ts`, homepage markup, meta description pattern, and freeze regressions in e2e that assert H1 === `PUNCHLINE`.

---

## 3. Whitespace and composition options

**Shared constraints:** no global `text-align: justify`; preserve mobile, 200% zoom, approved type tokens, colours, logo; keep skip-link / landmarks.

### Option W1 — Refined left-aligned editorial *(recommended)*

- Reduce hero and section `padding-block` one step (still using `clamp`, not fixed large voids).
- Keep single-column hero copy; tighten `hero-bottom` gap; move CTAs under the lead rather than far end of a wide flex row.
- Selected Research: denser card grid with consistent left edges; shorten section intros.
- **Pros:** Matches existing editorial language; safest for a11y/zoom; least layout risk.  
- **Cons:** Less “magazine” drama on ultra-wide screens.

### Option W2 — Restrained two-column desktop

- Desktop (≥1024px): H1 + secondary statement in left column (~55%); lead + CTAs in right column; stack on mobile.
- Same reduced vertical padding as W1.
- **Pros:** Addresses empty right-of-copy space without a third column of clutter.  
- **Cons:** Needs careful focus order and 200% reflow tests; more CSS surface area.

**Do not:** full-bleed justified blocks; hover-only nav; heavy motion; fabricated data viz in the feature panel (current decorative SVG should stay labeled non-empirical or be retired if cards carry real TL;DRs).

---

## 4. HMI research proposition treatment

**Proposed text (faculty-authored):**

> The question is not whether intelligent machines can interact, but whether intelligence for human worlds can emerge without interactional learning.

**Classification:** HMI-authored, Minsky-inspired rhetorical parallel — **not** an authentic Marvin Minsky quotation.

### Recommended placement

1. **Primary:** About → Research Philosophy, immediately after the philosophy body, **before** the authentic Minsky blockquote.  
2. **Labeling:** e.g. section label `HMI research proposition` + figcaption `Human–Machine Interaction Research Group · Interactive Intelligence programme statement (inspired by Minsky’s form of question; not a quotation from Marvin Minsky).`  
3. **Do not** place on the homepage hero (avoids slogan collision with the punchline).  
4. **Optional later:** Research index epigraph — only if About placement is approved and homepage stays clean.

### Preserve

Marvin Minsky, *The Society of Mind* (1986), §16.1, p. 163 — existing citation block unchanged.

---

## 5. Verified epigraph shortlist (3–5)

Use sparingly: **one** epigraph per page max; skip decorative repetition. Page-verify before shipping; secondary citations are not a substitute for checking the source edition.

| # | Text (verified working form) | Attribution | Suggested page | Support |
|---|---|---|---|---|
| 1 | *(existing)* “The question is not whether intelligent machines can have any emotions, but whether machines can be intelligent without any emotions.” | Marvin Minsky, *The Society of Mind* (1986), §16.1, p. 163 | About | Intelligence ↔ affect intellectual lineage |
| 2 | HMI proposition (above) | HMI Research Group (2026 programme statement) | About Philosophy | Interactional learning thesis |
| 3 | “Hence a wealth of information creates a poverty of attention…” *(use contiguous excerpt from Simon 1971, pp. 40–41)* | Herbert A. Simon, “Designing Organizations for an Information-Rich World,” in Greenberger (ed.), *Computers, Communications, and the Public Interest* (Johns Hopkins Press, 1971), pp. 40–41 | Perception & Understanding theme **or** ADHD paper page (contextual, not clinical claim) | Attention as scarce resource |
| 4 | “The world is its own best model.” *(commonly paired in Brooks 1991 with the elaboration that it is always up to date / detailed — quote only the sentence confirmed in the target edition)* | Rodney A. Brooks, “Intelligence without representation,” *Artificial Intelligence* 47 (1991) | Social robotics / Interaction theme / CHI paper page | Embodied interaction vs pure internal models |
| 5 | “Plans are resources for action.” *(widely attributed to Suchman 1987; **faculty must confirm page in the Cambridge edition before site use**)* | Lucy A. Suchman, *Plans and Situated Actions* (Cambridge University Press, 1987) | Interaction & Adaptation theme | Situated HCI / adaptation |

**Reject for now:** unsourced “famous AI quotes,” paraphrase-as-quote, or stacking multiple epigraphs on the homepage.

---

## 6. Seven-paper Selected Research portfolio

### 6.1 Current vs proposed homepage set

| Rank role | Current featured (`featured_rank`) | Proposed seven (faculty FINAL) |
|---|---|---|
| Feature | ESL (1) | ESL (Group A) — keep as primary feature |
| Card | CHI autism care (2) | CHI autism care (Group B) |
| Card | ADHD pupil dynamics (3) | ADHD pupil dynamics (Group B) — elevated |
| Card | MobiTangibles (4) | **Remove from Selected seven** (remain in archive) |
| — | — | **ASD acoustic/linguistic TAI 2024** — elevated; AIIMS collab |
| — | — | VR / flat-screen gaming TAC 2024 |
| — | — | EDA emotion recognition TAC (display year 2021) |
| — | — | ExpressEar IMWUT/UbiComp 2021 |

### 6.2 Scientific justification (balance)

| Paper | Slug | Why it belongs | Claim / presentation bounds |
|---|---|---|---|
| Epistemic Social Learning | `epistemic-social-learning` | Foundational multi-agent learning & coordination under Interactive Intelligence | **Accepted** NeurIPS 2026 only; no invented proceedings/DOI |
| ASD predictive acoustic/linguistic | `predictive-asd-acoustic-linguistic` | Neurodevelopment + multimodal speech; English/Hindi; clinical collaboration | Crossref lists Sheffali Gulati affiliation: *Dept. of Pediatrics, Child Neurology Division, Centre of Excellence and Advanced Research for Childhood Neurodevelopmental Disorders, All India Institute of Medical Sciences, New Delhi*. Label as **collaboration involving AIIMS New Delhi (author affiliation)** — not a blanket “AIIMS-owned study.” Do **not** present the model as a clinically validated standalone diagnostic. |
| Trial-level pupil dynamics ADHD | `trial-pupil-dynamics-adhd` | ADHD, attention, physiological sensing | Preserve observational framing (“reflect…”, “medication-associated modulation”); no independent diagnostic efficacy or causal drug claims |
| Social robots autism care India | `social-robots-autism-care-india` | Human-centered HCI / cultural robotics | Qualitative educator-perception scope; award = CHI 2024 Honorable Mention with residual faculty confirmation note already in content |
| VR vs flat-screen gaming | `vr-flat-screen-gaming-responses` | Immersive + physiological/psychological responses | `lab_attribution: collaborative` |
| EDA emotion recognition | `emotion-recognition-eda` | Foundational physiological affect sensing | Display year **2021**; document 2019 early-access DOI history; `historical-faculty` |
| ExpressEar | `express-ear` | Wearable / interactive systems balance beyond AI & clinical ND | Collaborative wearable sensing |

**Intentionally seven:** dropping autism, ADHD, AIIMS-linked, or physiological sensing work to hit five/six is rejected.

**Archive continuity:** MobiTangibles, listener backchannels, facial emotion transfer, other ND papers, etc. remain fully discoverable via Publications and theme pages.

### 6.3 Suggested Selected Research visual hierarchy

1. **Primary feature:** ESL (programme-defining foundational AI).  
2. **Elevated compact cards (visual weight / order):** ASD (AIIMS collab), ADHD.  
3. **Standard compact cards:** CHI HM, VR gaming, EDA, ExpressEar.  
4. Optional micro-labels: `Foundational AI` · `Neurodevelopment` · `Affective & embodied` — text labels only, not badge clutter.

---

## 7. Selected Research layout comparison

### Option A — One feature + six compact cards *(recommended)*

```
[ Section intro ]
[ ESL — large feature: meta · title · TL;DR · link ]   ← retire or shrink decorative viz if TL;DR carries meaning
[ ASD↑ ] [ ADHD↑ ] [ CHI ]
[ VR   ] [ EDA   ] [ ExpressEar ]
```

- Desktop: feature full-width or 2-col; then 3×2 grid.  
- Mobile: single column, same order.  
- Emphasizes contribution narrative over seven identical bib rows.  
- No autoplay; all links keyboard-reachable.

### Option B — Manually controlled seven-item carousel

- Prev/Next + dots; `aria-live` polite; **no autoplay**; pause visible.  
- Weaker simultaneous comparison; higher a11y implementation cost.  
- Acceptable fallback if faculty rejects denser grids.

**Recommendation:** **Option A**. Use Option B only if faculty prefers sequential storytelling after reviewing a prototype.

**Media:** optional verified research media only with approved provenance (M4.3/M4.4 gates). Until then: text + venue/status only.

---

## 8. Plain-language TL;DR — schema and workflow

### 8.1 Canonical fields (Phase A — optional; non-breaking)

Proposed additions on `publicationDraftSchema` (names indicative):

| Field | Type | Notes |
|---|---|---|
| `plain_language_tldr` | `string` optional | Target 30–50 words; question / contribution or finding / key limitation |
| `tldr_status` | enum | `missing` (default) · `editorial_draft` · `ai_assisted_draft` · `owner_approved` |
| `tldr_drafted_by` | string optional | Editorial/AI assistant attribution |
| `tldr_reviewed_by` | string optional | **Not** proof of consent alone |
| `tldr_approved_at` | `YYYY-MM-DD` optional | Required only when status = `owner_approved` |
| `tldr_source_note` | string optional | PDF/section grounding for reviewers |

**UI rule:** Render TL;DR only when `tldr_status === owner_approved` **or** (faculty-approved staging exception for labeled drafts). Otherwise fall back to authors + venue line (current behaviour).

**Single source of truth:** same field on Selected Research cards, publications archive rows/filters detail, and `papers/[slug]` pages.

### 8.2 Editorial states

| Status | Public site | Meaning |
|---|---|---|
| `missing` | Fallback UI | No summary yet |
| `editorial_draft` / `ai_assisted_draft` | Hidden (or clearly badged on private preview only) | Not faculty/owner approved |
| `owner_approved` | Visible | Scientific owner approved the wording |

**Explicit residual:** a recorded name + date is **not** independent proof of consent (same doctrine as Research Story gates).

### 8.3 Clinical / health copy guardrails

For autism, ADHD, affective computing, health: forbid diagnostic-product language, unverified accuracy boasts, causal medication claims, and over-generalisation. Ground every sentence in the paper; prefer “studied / associated / predictive analysis in evaluated cohorts.”

---

## 9. Coverage inventory — verified public publications

**Count at baseline:** **32** verified public records (`published` + `metadata_verified` + `verification_status: verified` + status `published|accepted`, excluding test fixtures).

### Phase B priority (7 Selected)

1. `epistemic-social-learning`  
2. `predictive-asd-acoustic-linguistic`  
3. `trial-pupil-dynamics-adhd`  
4. `social-robots-autism-care-india`  
5. `vr-flat-screen-gaming-responses`  
6. `emotion-recognition-eda`  
7. `express-ear`  

### Phase C remainder (25) — inventory by year

| Year | Slugs (archive; still need TL;DRs after Phase B) |
|---|---|
| 2025 | `beyond-lab-stress-monitoring`, `context-aware-eeg-emotion-recognition`, `inclusive-education-textbook-images`, `pupil-dynamics-adhd-diagnosis`, `semantic-frame-live-video-comments`, `video-analysis-engine-effectiveness` |
| 2024 | `eden-academic-video-generation`, `eeg-emotional-intelligence-personality`, `effectinet-educational-content`, `engageme-attention-online-learning`, `mobitangibles`, `ontology-ethical-decision-making-ai`, `opacity-transparency-affective-computing`, `pedagogie-inclusive-textbook-images`, `vyaktitvanirdharan-personality-ei` |
| 2023 | `attentionet-eeg-attention`, `ethics-child-robot-under-resourced`, `multisource-transfer-facial-emotion`, `spasht-autism-speech` |
| 2022 | `haptidrag` |
| 2021 | `listener-backchannels` |
| 2020 | `toy-tutor-peer-pet` |
| 2019 | `robot-assisted-intellectual-disabilities`, `robotic-affordances-asd`, `stakeholders-robot-assisted-therapy` |

**Note:** `pupil-dynamics-adhd-diagnosis` (CIBM 2025) is related ADHD work but **not** one of the seven Selected items; keep archive-discoverable; TL;DR in Phase C.

---

## 10. Paper-source requirements and TL;DR drafting plan

### Sources of truth (per paper)

1. Publisher PDF / HTML (DOI).  
2. Crossref metadata (authors, affiliations, dates).  
3. Existing `evidence_note` / `unresolved_notes` in content files.  
4. For awards: SIGCHI/ACM or venue program pages (CHI HM already partially evidenced).

### Drafting procedure

1. Read abstract + conclusion/limitations.  
2. Draft 30–50 words: question → contribution/finding → limitation.  
3. Mark `ai_assisted_draft` or `editorial_draft`.  
4. Paper owner / faculty scientific review → `owner_approved` + date.  
5. Only then enable on Selected / archive / paper page.

### Phase plan

| Phase | Work | Gate |
|---|---|---|
| **A** | Optional schema + fallback UI + tests | Faculty approve schema shape |
| **B** | Draft + approve TL;DRs for the seven | Owner approval before public render |
| **C** | Inventory-driven coverage of remaining 25 | Batch review |
| **D** | Content gate: new promotions require `owner_approved` TL;DR | After C complete; still optional on legacy until backfilled |

---

## 11. Test-first implementation milestones (post-approval)

### M4.2.1-A — Schema & UI fallbacks

- Optional fields parse; existing 32 pubs still validate.  
- Missing TL;DR → no empty heading; archive/paper readable.  
- Unit: status enum; approved-only visibility helper.

### M4.2.1-B — Selected Research seven + Option A layout

- Featured set matches the seven slugs; MobiTangibles not on homepage Selected.  
- ESL Accepted label retained.  
- ASD/ADHD elevated order.  
- E2E: no-JS; viewports 320–1440; axe serious/critical; keyboard to all seven links; no horizontal overflow.  
- Freeze: fonts/colours/logo; no unjustified text.

### M4.2.1-C — Identity hierarchy + composition (if approved)

- H1 / secondary punchline assertions updated.  
- Whitespace option W1 or W2 per sign-off.  
- About: HMI proposition labeled; Minsky intact.

### M4.2.1-D — TL;DR Phase B content

- Seven approved summaries live; draft statuses never leak to staging without badge policy.  
- Reuse identical string on card, archive, paper page.

**Acceptance:** staging build excludes drafts/fixtures as today; no unapproved media; no flagship Research Story publication.

---

## 12. Decisions requiring faculty sign-off

| ID | Decision | Options | Proposal |
|---|---|---|---|
| D1 | Homepage H1 | Keep punchline H1 **vs** Interactive Intelligence H1 | Interactive Intelligence H1 |
| D2 | Punchline role | Retire **vs** secondary deck | Secondary deck |
| D3 | Whitespace | W1 left-aligned tighten **vs** W2 two-column desktop | W1 |
| D4 | HMI proposition | Approve text + About placement + non-Minsky labeling | Approve as specified |
| D5 | Epigraphs | None beyond Minsky+HMI **vs** add Simon/Brooks/Suchman on theme/paper pages | Add only after edition page-check; max one per page |
| D6 | Selected seven | Confirm exact seven; confirm ESL as feature | Confirm faculty list; ESL feature |
| D7 | Layout | Option A grid **vs** Option B carousel | Option A |
| D8 | ASD label | “AIIMS collaboration” wording | Affiliation-accurate collab label (Crossref-backed) |
| D9 | CHI award | Show Honorable Mention prominently | Yes, after closing residual confirmation note |
| D10 | TL;DR schema | Approve optional fields + statuses | Approve Phase A |
| D11 | Implementation order | A→B→C→D as above | Yes |
| D12 | MobiTangibles | Leave homepage Selected | Leave archive-only for Selected module |

---

## Stop conditions (reaffirmed)

- This document is **planning only**.  
- No code, content-record, featured-rank, schema, media, Research Story, M4.3/M4.4, or production changes in this PR.  
- **Do not merge implementation work** until faculty returns §12 decisions.  
- Next scientific milestone after M4.2.1 implementation (if approved): **M4.3** paper-by-paper evidence audit — not page publication.
