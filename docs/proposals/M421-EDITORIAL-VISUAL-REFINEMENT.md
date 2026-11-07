# M4.2.1 — Editorial and visual refinement (planning proposal)

**Status:** **APPROVED** — planning package. PI approved §12 on 2026-11-07 and authorized merge of documentation PR #11.  
**Baseline:** `main` @ `7006a76ea05dbb083753b84cbba6f85ac840db1b`  
**Staging reference:** https://hmi-iiitd.github.io/hmi-lab-website/  
**Preserves:** Interactive Intelligence programme, three research themes, approved fonts/colours/logo, institutional branding, genuine Minsky §16.1 quotation, **all seven selected-paper content records and the canonical bibliography unchanged** (no silent substitution or deletion).

**Out of scope for this PR:** site code, schema, featured ranks, publication markdown edits, media uploads, Research Story publication, M4.3/M4.4, production.

**Implementation:** Merging this documentation PR does **not** authorize website implementation. Workstream **I1** (optional TL;DR schema + helpers + tests only) still requires a separate PI-authorized implementation PR.

---

## Recommendation (executive)

| Topic | PI-approved standing (§12, 2026-11-07) |
|---|---|
| Overall | Planning package **APPROVED**; docs PR #11 merge authorized |
| Homepage identity | **Interactive Intelligence** as H1; punchline as secondary deck (**D1–D2**) |
| Composition | **W1** — refined left-aligned editorial (**D3**) |
| Selected Research layout | **Option A** — one feature + six compact cards (**D7**) |
| Feature paper / seven set | Exact seven in §6; **ESL** feature; elevated ASD + ADHD (**D6**) |
| HMI proposition | About **Research Philosophy prose**, not a second epigraph (**D4**) |
| External epigraphs (Simon/Brooks/Suchman) | **Deferred** (**D5**) |
| AIIMS wording | Precise **co-authorship / author affiliation** only (**D8**) |
| CHI award promo | **Gated** until separately confirmed (**D9**) |
| TL;DR / sequencing / MobiTangibles | **Approved** D10–D12 |
| First implementation PR (when separately authorized) | Optional TL;DR schema + verified-only display helper + missing fallbacks + tests **only** — no unreviewed summary text published |

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
| Research Philosophy | Question + two paragraphs | Natural home for the HMI proposition **as additional philosophy prose** |
| Minsky quote | Authentic §16.1 / p.163, correctly cited | **Sole historical epigraph on About**; must preserve; must not be joined by a second blockquote for the HMI line |

### 1.3 Frozen-identity implication

M3.5 / positioning approvals froze `PUNCHLINE` as homepage H1. Elevating **Interactive Intelligence** to H1 is an **identity hierarchy change** requiring explicit PI authorization and an ADR/identity-constant update — not a silent CSS tweak.

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

### Approval impact (implementation PR — separate gate)

Update `RESEARCH_IDENTITY` / `PUNCHLINE` usage in `src/lib/identity.ts`, homepage markup, meta description pattern, and freeze regressions in e2e that assert H1 === `PUNCHLINE`.

---

## 3. Whitespace and composition options

**Shared constraints:** no global `text-align: justify`; preserve mobile, 200% zoom, approved type tokens, colours, logo; keep skip-link / landmarks.

### Option W1 — Refined left-aligned editorial *(standing recommendation)*

- Reduce hero and section `padding-block` one step (still using `clamp`, not fixed large voids).
- Keep single-column hero copy; tighten `hero-bottom` gap; move CTAs under the lead rather than far end of a wide flex row.
- Selected Research: denser card grid with consistent left edges; shorten section intros.
- **Pros:** Matches existing editorial language; safest for a11y/zoom; least layout risk.  
- **Cons:** Less “magazine” drama on ultra-wide screens.

### Option W2 — Restrained two-column desktop *(not selected under D3)*

- Desktop (≥1024px): H1 + secondary statement in left column (~55%); lead + CTAs in right column; stack on mobile.
- Same reduced vertical padding as W1.
- **Pros:** Addresses empty right-of-copy space without a third column of clutter.  
- **Cons:** Needs careful focus order and 200% reflow tests; more CSS surface area.

**Do not:** full-bleed justified blocks; hover-only nav; heavy motion; fabricated data viz in the feature panel (current decorative SVG should stay labeled non-empirical or be retired if cards carry real TL;DRs).

---

## 4. HMI research proposition treatment (About — prose, not epigraph)

**Proposed text (faculty-authored):**

> The question is not whether intelligent machines can interact, but whether intelligence for human worlds can emerge without interactional learning.

**Classification:** HMI-authored, Minsky-inspired rhetorical parallel — **not** an authentic Marvin Minsky quotation and **not** a site epigraph.

### Resolved presentation (faculty CONDITIONAL PASS refinement)

| Surface | Treatment |
|---|---|
| About → Research Philosophy | Integrate the sentence as **philosophy prose** (ordinary paragraph in the philosophy section), with a clear in-prose or adjacent note that it is an **HMI programme statement** inspired by Minsky’s form of question |
| About → blockquote / `<figure class="about-quote">` | **Reserved for the authentic Minsky quotation only** |
| Homepage hero | Do **not** place the HMI proposition here |
| Research index or other pages | No additional epigraph use of this line in M4.2.1 |

### Contradiction resolution

Earlier draft language that listed the HMI proposition as epigraph “#2” alongside Minsky is **withdrawn**. About keeps **one** epigraph (Minsky). The HMI line is research-philosophy body copy, not a second pull-quote.

### Preserve

Marvin Minsky, *The Society of Mind* (1986), §16.1, p. 163 — existing citation block unchanged.

---

## 5. External epigraph shortlist — **deferred (D5)**

External quotations (Simon, Brooks, Suchman, etc.) are **out of scope for M4.2.1 implementation** until a later faculty decision re-opens D5.

Retained for future reference only (not approved for shipping):

| Candidate | Working attribution | Notes |
|---|---|---|
| Simon 1971 attention excerpt | “Designing Organizations for an Information-Rich World,” Greenberger (ed.), Johns Hopkins Press, 1971, pp. 40–41 | Requires edition page-check before any use |
| Brooks 1991 | “Intelligence without representation,” *Artificial Intelligence* 47 (1991) | Confirm exact sentence in target edition |
| Suchman 1987 | *Plans and Situated Actions*, CUP 1987 | Confirm page before any use |

**About page epigraph policy for M4.2.1:** Minsky only. No stacking; no decorative repetition.

---

## 6. Seven-paper Selected Research portfolio

**Hard constraint:** Retain all seven selected-paper **content records** and the **canonical bibliography** unchanged in this planning milestone. Homepage Selected membership is a presentation/feature-rank concern for a later gated implementation PR — not a reason to edit or delete publication markdown in this PR.

### 6.1 Current vs proposed homepage Selected set

| Rank role | Current featured (`featured_rank`) | Proposed seven (faculty FINAL list) |
|---|---|---|
| Feature | ESL (1) | ESL (Group A) — primary feature |
| Card | CHI autism care (2) | CHI autism care (Group B) |
| Card | ADHD pupil dynamics (3) | ADHD pupil dynamics (Group B) — elevated |
| Card | MobiTangibles (4) | **Not in Selected seven** (record remains in archive / bibliography) |
| — | — | **ASD acoustic/linguistic TAI 2024** — elevated |
| — | — | VR / flat-screen gaming TAC 2024 |
| — | — | EDA emotion recognition TAC (display year 2021) |
| — | — | ExpressEar IMWUT/UbiComp 2021 |

### 6.2 Scientific justification (balance)

| Paper | Slug | Why it belongs | Claim / presentation bounds |
|---|---|---|---|
| Epistemic Social Learning | `epistemic-social-learning` | Foundational multi-agent learning & coordination under Interactive Intelligence | **Accepted** NeurIPS 2026 only; no invented proceedings/DOI |
| ASD predictive acoustic/linguistic | `predictive-asd-acoustic-linguistic` | Neurodevelopment + multimodal speech; English/Hindi; AIIMS-affiliated co-author | Crossref lists Sheffali Gulati affiliation: *Dept. of Pediatrics, Child Neurology Division, Centre of Excellence and Advanced Research for Childhood Neurodevelopmental Disorders, All India Institute of Medical Sciences, New Delhi*. Public wording: **AIIMS New Delhi co-authorship / author affiliation** — **not** an unsupported formal institutional partnership or “AIIMS-owned study.” Do **not** present the model as a clinically validated standalone diagnostic. |
| Trial-level pupil dynamics ADHD | `trial-pupil-dynamics-adhd` | ADHD, attention, physiological sensing | Preserve observational framing; no independent diagnostic efficacy or causal drug claims |
| Social robots autism care India | `social-robots-autism-care-india` | Human-centered HCI / cultural robotics | Qualitative educator-perception scope; **CHI Honorable Mention must not be used promotionally until D9 faculty confirmation** |
| VR vs flat-screen gaming | `vr-flat-screen-gaming-responses` | Immersive + physiological/psychological responses | `lab_attribution: collaborative` |
| EDA emotion recognition | `emotion-recognition-eda` | Foundational physiological affect sensing | Display year **2021**; document 2019 early-access DOI history; `historical-faculty` |
| ExpressEar | `express-ear` | Wearable / interactive systems balance beyond AI & clinical ND | Collaborative wearable sensing |

**Intentionally seven:** dropping autism, ADHD, AIIMS-linked, or physiological sensing work to hit five/six is rejected.

**Archive continuity:** MobiTangibles, listener backchannels, facial emotion transfer, other ND papers, etc. remain fully discoverable via Publications and theme pages. Their bibliographic records are not altered by removing MobiTangibles from the homepage Selected module.

### 6.3 Suggested Selected Research visual hierarchy (layout gate — separate)

1. **Primary feature:** ESL.  
2. **Elevated compact cards:** ASD (AIIMS-affiliated co-author), ADHD.  
3. **Standard compact cards:** CHI (award text per D9), VR gaming, EDA, ExpressEar.  
4. Optional micro-labels: `Foundational AI` · `Neurodevelopment` · `Affective & embodied` — text only.

---

## 7. Selected Research layout comparison

### Option A — One feature + six compact cards *(standing recommendation)*

```
[ Section intro ]
[ ESL — large feature: meta · title · (approved TL;DR only) · link ]
[ ASD↑ ] [ ADHD↑ ] [ CHI ]
[ VR   ] [ EDA   ] [ ExpressEar ]
```

- Desktop: feature full-width or 2-col; then 3×2 grid.  
- Mobile: single column, same order.  
- No autoplay; all links keyboard-reachable.

### Option B — Manually controlled seven-item carousel *(not selected under D7)*

- Prev/Next + dots; `aria-live` polite; **no autoplay**.  
- Higher a11y cost; weaker simultaneous comparison.

**Media:** optional verified research media only with approved provenance (M4.3/M4.4). Until then: text + venue/status only.

---

## 8. Plain-language TL;DR — schema, approval, and evidence

### 8.1 Canonical fields (TL;DR coverage Phase A / Implementation workstream I1)

Proposed additions on `publicationDraftSchema` (names indicative; **optional; non-breaking**):

| Field | Type | Notes |
|---|---|---|
| `plain_language_tldr` | `string` optional | Target 30–50 words; question / contribution or finding / key limitation |
| `tldr_status` | enum | `missing` (default) · `editorial_draft` · `ai_assisted_draft` · `owner_approved` |
| `tldr_drafted_by` | string optional | Editorial/AI assistant attribution for drafts |
| `tldr_reviewed_by` | string optional | Reviewer identity **metadata only** — insufficient alone |
| `tldr_approved_at` | `YYYY-MM-DD` optional | Timestamp metadata — insufficient alone |
| `tldr_source_note` | string optional | PDF/section grounding for reviewers |
| `tldr_review_evidence` | string optional | **Traceable** pointer: e.g. PR comment URL, lab review ticket ID, signed email archive path, or meeting-minute reference that records **approval of the specific TL;DR text** |

### 8.2 Content approval ≠ metadata presence

| Concept | Meaning |
|---|---|
| Metadata fields (`tldr_reviewed_by`, `tldr_approved_at`) | Audit convenience only |
| **Content approval** | Explicit scientific acceptance of the **exact** `plain_language_tldr` string for public display |
| Minimum for `owner_approved` | (1) status set to `owner_approved`, **and** (2) non-empty `tldr_review_evidence` pointing to durable review record, **and** (3) PI/paper-owner process followed as required by lab policy |

A name and date **without** traceable review evidence **do not** authorize public rendering. Machine checks can require evidence field presence when status is `owner_approved`; they still cannot prove the linked evidence is genuine — that remains a human gate.

### 8.3 Display helper (first implementation PR)

- Public/staging UI renders TL;DR **only** when `tldr_status === owner_approved` **and** evidence field present (helper: e.g. `isApprovedPlainLanguageTldr`).  
- Otherwise: missing-summary fallback (authors + venue/status — current behaviour).  
- **Do not publish** `editorial_draft` / `ai_assisted_draft` text on staging or production.

### 8.4 Clinical / health copy guardrails

For autism, ADHD, affective computing, health: forbid diagnostic-product language, unverified accuracy boasts, causal medication claims, and over-generalisation. Ground every sentence in the paper.

---

## 9. Coverage inventory — verified public publications

**Count at baseline:** **32** verified public records (`published` + `metadata_verified` + `verification_status: verified` + status `published|accepted`, excluding test fixtures).

### TL;DR coverage Phase B — seven Selected (content drafting; separate gate)

1. `epistemic-social-learning`  
2. `predictive-asd-acoustic-linguistic`  
3. `trial-pupil-dynamics-adhd`  
4. `social-robots-autism-care-india`  
5. `vr-flat-screen-gaming-responses`  
6. `emotion-recognition-eda`  
7. `express-ear`  

### TL;DR coverage Phase C — remainder (25)

| Year | Slugs |
|---|---|
| 2025 | `beyond-lab-stress-monitoring`, `context-aware-eeg-emotion-recognition`, `inclusive-education-textbook-images`, `pupil-dynamics-adhd-diagnosis`, `semantic-frame-live-video-comments`, `video-analysis-engine-effectiveness` |
| 2024 | `eden-academic-video-generation`, `eeg-emotional-intelligence-personality`, `effectinet-educational-content`, `engageme-attention-online-learning`, `mobitangibles`, `ontology-ethical-decision-making-ai`, `opacity-transparency-affective-computing`, `pedagogie-inclusive-textbook-images`, `vyaktitvanirdharan-personality-ei` |
| 2023 | `attentionet-eeg-attention`, `ethics-child-robot-under-resourced`, `multisource-transfer-facial-emotion`, `spasht-autism-speech` |
| 2022 | `haptidrag` |
| 2021 | `listener-backchannels` |
| 2020 | `toy-tutor-peer-pet` |
| 2019 | `robot-assisted-intellectual-disabilities`, `robotic-affordances-asd`, `stakeholders-robot-assisted-therapy` |

---

## 10. Two distinct A–D sequences

These share letter labels historically but are **different tracks**. Do not treat “approve D11” as permission to execute all letters on both tracks at once.

### 10.1 Implementation workstreams (site engineering)

| Workstream | Scope | Separate review gate |
|---|---|---|
| **I1** | Optional TL;DR schema fields, `isApprovedPlainLanguageTldr` (or equivalent) verified-only helper, missing-summary UI fallbacks, unit/content tests | First implementation PR — **no** homepage layout, **no** featured-rank changes, **no** TL;DR body text published |
| **I2** | Homepage Selected Research Option A + seven-card membership / order | Layout & featured-set PR |
| **I3** | Homepage identity hierarchy (H1 / punchline deck) + W1 whitespace | Identity & composition PR |
| **I4** | About Research Philosophy prose integration of HMI proposition; Minsky epigraph unchanged | About copy PR |

**D11** means: proceed through I1→I4 as a **staged process**, each with its own PI authorization — **not** blanket implementation permission.

### 10.2 TL;DR coverage phases (content completeness)

| Phase | Scope | Gate |
|---|---|---|
| **T-A** | Schema + helpers exist; all records default `missing` | Ships with I1 |
| **T-B** | Draft + **content-approve** TL;DRs for the seven Selected papers | Per-summary evidence; no bulk silent publish |
| **T-C** | Remaining 25 verified public papers | Batch scientific review |
| **T-D** | After T-C: require `owner_approved` (+ evidence) for newly promoted/published records | Policy gate; still non-breaking for legacy `missing` until backfilled |

### 10.3 First implementation PR (when PI authorizes)

**In:** I1 / T-A only — optional schema, verified-only display helper, missing-summary fallbacks, tests.  
**Out:** unreviewed summary strings, Selected seven UI, homepage identity/whitespace, About proposition prose, award promo changes, M4.3/M4.4, production.

Homepage layout, selected seven cards, and approved TL;DR **content** each keep their **own** review gate after I1.

---

## 11. Test-first criteria (by workstream)

### I1 / T-A

- Optional fields parse; existing 32 pubs still validate.  
- Missing TL;DR → no empty heading; archive/paper readable without JS.  
- Helper rejects `missing` / draft statuses and `owner_approved` without `tldr_review_evidence`.  
- No draft TL;DR text in staging HTML.

### I2 (later)

- Featured set matches the seven slugs; MobiTangibles not on homepage Selected.  
- ESL Accepted label retained; ASD/ADHD elevated order.  
- E2E: no-JS; 320–1440; axe; keyboard; no overflow.  
- CHI award string omitted or non-promotional until D9 closed.

### I3 / I4 (later)

- H1 / secondary punchline assertions; W1 spacing.  
- About: HMI line as philosophy prose; single Minsky epigraph.

---

## 12. Faculty / PI decision slate

### 12.1 PI-approved decisions (2026-11-07)

PI instruction: “approve §12 and merge PR #11.” Closed as follows:

| ID | Topic | Decision | Status |
|---|---|---|---|
| D1 | Homepage H1 | **Interactive Intelligence** as H1 | **APPROVED** |
| D2 | Punchline | Retain as **secondary deck** | **APPROVED** |
| D3 | Whitespace | **W1** left-aligned tighten | **APPROVED** |
| D4 | HMI proposition | Text as **Research Philosophy prose**; not an additional epigraph; never as Minsky quote | **APPROVED** |
| D5 | External epigraphs | Defer Simon/Brooks/Suchman (and similar); Minsky remains the only About epigraph | **DEFERRED** |
| D6 | Selected seven | Exact seven in §6; ESL as feature; bibliography/records unchanged | **APPROVED** |
| D7 | Layout | **Option A** | **APPROVED** |
| D8 | ASD / AIIMS wording | **Co-authorship / author affiliation** accuracy only; no unsupported formal partnership claim | **APPROVED** |
| D9 | CHI award | No promotional use until **separately** confirmed | **GATED** |
| D10 | TL;DR schema | Approve **Phase T-A / workstream I1** shape (optional fields) | **APPROVED** |
| D11 | Sequencing | Staged **I1→I4** and **T-A→T-D**; not blanket build permission | **APPROVED** |
| D12 | MobiTangibles | Leave **archive / bibliography**; not homepage Selected seven | **APPROVED** |

### 12.2 PI confirmation checklist

- [x] PI explicitly approves D1–D4, D6–D8, D10–D12 as written  
- [x] PI explicitly defers D5 (additional external epigraphs)  
- [x] PI explicitly keeps D9 gated pending separate CHI Honorable Mention confirmation  
- [x] PI explicitly authorizes merging **documentation PR #11 only** (after CI pass)  
- [x] PI separately authorizes **I1** implementation PR when ready (authorized 2026-11-07; implementation PR opened — **not merged**)  

### 12.3 Planning-PR merge record

| Check | Value |
|---|---|
| PR | https://github.com/hmi-iiitd/hmi-lab-website/pull/11 |
| Scope | Documentation only — no site implementation |
| CI | Must be **success** on the merge head before merge |

---

## Stop conditions (post-merge planning)

- Merging PR #11 closed the **documentation** milestone only.  
- **I1 / T-A** implementation is in a separate PR (see `docs/milestone-evidence/I1-TA-PLAIN-LANGUAGE-TLDR.md`) — **awaiting faculty review; do not treat as complete until merged by explicit PI instruction.**  
- **Do not** start I2–I4, T-B/T-C/T-D, M4.3/M4.4, or production from I1 alone.
