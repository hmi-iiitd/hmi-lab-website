# M4 planning — Research themes and selected flagship pages

**Status:** **M4.0 CONDITIONAL PASS** — planning corrections accepted; **M4.1 only** authorized after this document merges.  
**Base:** Staging at `96205585` (research positioning + visual design **frozen**).  
**Out of scope until separately authorized:** M4.2+ flagship template/content; M5+; production; visual redesign; homepage/identity copy changes.

**PRD correction:** Three primary themes supersede the PRD’s four-theme M4/RES-01 text. Recorded in `docs/decisions/ADR-005-m4-three-theme-correction.md` and the PRD M4 errata note.

---

## 1. PRD reconciliation (four themes → Interactive Intelligence)

| PRD (as written) | Approved / frozen reality | M4 implication |
|---|---|---|
| Four research themes (RES-01) | **Three** themes: Perception & Understanding · Learning & Coordination · Interaction & Adaptation | **Three** theme detail pages only |
| Punchline “Intelligence is an interaction.” | “Intelligence emerges through interaction.” | Do not reintroduce superseded copy |
| M4: “four theme pages” | Theme slugs in `src/content/research-areas/` | `/research/{theme-slug}/` × 3 |
| Early exemplars HaptiDrag / ExpressEar | **Approved MVP trio** below; MobiTangibles = #4 | Audit #4 in parallel; build after trio |
| Homepage copy / typography / logo | **Frozen** | Theme deep-links only; no hero/About/pathways rewrite |

---

## 2. Approved MVP flagship trio (for later M4.2–M4.4 — not M4.1)

1. **NeurIPS 2026 — Epistemic Social Learning** (`epistemic-social-learning`) — Learning & Coordination; status **Accepted** (public).  
2. **Scientific Reports 2026 — ADHD pupil dynamics** (`trial-pupil-dynamics-adhd`) — Perception & Understanding.  
3. **CHI 2024 — Social robots for autism care** (`social-robots-autism-care-india`) — Interaction & Adaptation (+ Learning & Coordination).  

**Priority #4 (parallel audit, after trio):** MobiTangibles (`mobitangibles`).

---

## 3. Scientific ownership (proposed — not yet confirmed consent)

| Role | Person |
|---|---|
| Accountable faculty content approver | **Jainendra Shukla** |
| ESL paper-specific reviewer (proposed) | Jainendra Shukla / Dhruv Jaiswal |
| ADHD paper-specific reviewer (proposed) | Saumya Yadav |
| CHI 2024 paper-specific reviewer (proposed) | B Ashwini |
| MobiTangibles paper-specific reviewer (proposed) | Abhijeet Mishra |

These assignments are based on authorship, **not** confirmed consent. **Explicit paper-owner acceptance and scientific sign-off are required before any flagship page is published.**

Faculty approval also required for factual claims, experimental limitations, media, and the CHI award statement.

---

## 4. Locked planning corrections (M4.0)

1. **Theme-page listings** use verified **public** publication records via `isPublicPublication` (includes **`published` and `accepted`**). ESL **must** appear under Learning & Coordination as **Accepted**.  
2. **Text-only project pages** are permitted when media cannot be cleared (high-quality prose; no broken image slots).  
3. **Do not commit** unapproved participant, clinical, or copyrighted media to the public repository — including as unpublished draft assets under `public/`.  
4. **Bibliographic facts** on project pages must come from canonical publication records (no divergent title/author/venue/DOI/status).  
5. **Scientific-owner approval** required for claims, limitations, media, and CHI award before publish.  
6. **Three-theme PRD correction** recorded (ADR-005 + PRD errata).

---

## 5. Theme pages (`/research/{theme-slug}/`) — M4.1 scope

| Theme id / slug | Title |
|---|---|
| `perception-understanding` | Perception & Understanding |
| `learning-coordination` | Learning & Coordination |
| `interaction-adaptation` | Interaction & Adaptation |

**M4.1 page content:**

- Canonical title + existing summary (verbatim).  
- **No new philosophy copy** on theme pages.  
- Full list of verified public publications for that theme (newest first), including accepted-public records.  
- Show venue/year and status when useful (e.g. Accepted).  
- Link each item to `/papers/{slug}/`.  
- Surface verified resource links from the publication record only (DOI/PDF/code/etc. when non-null).  
- Explicit empty state if zero public papers.  
- No fabricated projects, people blocks, or media.

**Navigation (M4.1):**

- Research index → theme detail URLs.  
- Homepage theme cards → theme detail URLs (copy unchanged).  
- Keep publications `?theme=` filter links.

---

## 6. Flagship template & showcases (authorized later — not M4.1)

Template sections remain: problem, contribution, methodology, evidence, findings, limitations, resources.  
Text-only pages allowed when media uncleared.  
Assets require permission metadata; never commit uncleared participant/clinical/copyrighted files.  
Bibliography always joined from publication records.

Evidence-audit tables for ESL / ADHD / CHI / MobiTangibles remain as in prior draft (risks unchanged). Shared publish checklist unchanged.

---

## 7. Minimum viable flagship gate (after M4.1)

When later authorized: three owner-reviewed showcases = ESL + ADHD Sci Rep + CHI 2024; MobiTangibles after. Homepage featured card copy/order stays frozen.

---

## 8. Milestones

| Step | Status | Deliverable |
|---|---|---|
| **M4.0** | **PASS (conditional)** | This corrected plan + ADR-005 / PRD errata |
| **M4.1** | **Authorized next** | Three theme detail pages + links + tests; stop at review gate |
| **M4.2** | Not authorized | Project template + unpublished drafts |
| **M4.3** | Not authorized | Evidence audit completion for trio |
| **M4.4** | Not authorized | Publish three showcases |
| **M4.5** | Not authorized | MobiTangibles showcase |

---

## 9. M4.1 test-first plan

- Content: three theme routes; listings only `isPublicPublication` + matching `research_areas`; ESL present on Learning & Coordination with Accepted.  
- E2E: homepage → theme → paper; Research index → theme; responsive overflow; axe on theme page; no-JS readable list; staging base-path links.  
- Regressions: frozen identity constants / About hash unchanged.  

---

## 10. Non-goals

- No M4.2+ / M5 / production / redesign / new slogans / ESL interactive demo / new application tags.  
- No fabrication of results, figures, code links, clinical claims, or demonstrations.  
- No unapproved media in the repository.

---

## 11. Approval checklist

- [x] Three-theme reconciliation of PRD M4 / RES-01  
- [x] MVP trio = ESL, ADHD Sci Rep, CHI 2024 (MobiTangibles #4)  
- [x] Ownership model recorded as **proposed** pending explicit consent  
- [x] Theme listings include accepted-public records  
- [x] Text-only projects permitted; no uncleared media in repo  
- [x] Canonical publication bibliography on projects  
- [x] Authorize **M4.1 only** after this plan merges  
- [ ] Paper-owner acceptances before any flagship publish (later)  
- [ ] Authorize M4.2+ separately  
