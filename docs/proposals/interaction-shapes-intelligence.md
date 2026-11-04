# Proposal — Research positioning: How does interaction shape intelligence?

**Status:** **APPROVED** — all §A and §B decisions resolved.  
**PR #5:** Documentation merged (`b48b13d`); this file records the final §B resolutions.  
**Implementation:** Content-only PR `feat/research-positioning-content` — stop at review gate before merge. Typography / visual design remain frozen (PR #4). M4 and production remain gated.

**Preserves:** Lab name, Interactive Intelligence identity, homepage punchline, three scientific themes (titles + existing summaries verbatim), approved five-paragraph About description (verbatim), Minsky §16.1 quotation as a historical intellectual reference.

---

## Intent

Communicate a clear scientific agenda around one central question:

> **How does interaction shape intelligence?**

Intelligent agents do not merely receive observations and respond: their actions can change what other agents do, what information becomes available, and how subsequent learning and coordination unfold.

---

## A. Accepted wording

### A1. Fixed identity (no change)

| Element | Wording / source |
|---|---|
| Lab name | Human–Machine Interaction Research Group |
| Programme name | Interactive Intelligence |
| Punchline | Intelligence emerges through interaction. |
| Themes | Perception & Understanding · Learning & Coordination · Interaction & Adaptation |
| About body | `src/content/identity/approved-description.md` — **five paragraphs, verbatim** |
| Minsky quotation | §16.1, p.163 — remains after the Research Philosophy section |

**Branding note:** No additional uppercase/bold branding, new H1, competing slogan, or visual redesign.

### A2. Homepage introduction (replace `HERO_INTRODUCTION` only)

> We study interactive intelligence: how intelligent systems perceive and understand people, other agents, and the physical world; learn and reason through interaction; and adapt their behaviour as interaction unfolds.

### A3. About — Research Philosophy

**Placement:** After the five approved About paragraphs, **before** the Minsky quotation.

**Heading hierarchy (B3):**

- Small section label: `Research Philosophy` (same pattern as other `.section-label` labels)
- `h2`: How does interaction shape intelligence?

**Body (two paragraphs):**

Interactive Intelligence treats interaction as more than a channel for observations and responses. When an agent acts, its actions may change other agents’ responses, physical settings, and the information available for later learning and coordination. Intelligence, in this view, is shaped inside that ongoing loop—not only by what is sensed at a single moment.

We therefore ask how systems can perceive and understand people, other agents, and situations under changing conditions; how they can learn and coordinate when behaviours continually reshape one another; and how interfaces, robots, and assistive systems should adapt so interaction remains usable and trustworthy. Our three research themes name connected aspects of this ongoing feedback loop while preserving each theme’s individual scientific scope.

### A4. Themes feedback-loop introduction

**Accepted longer lede (Research page only — B4):**

> Perception & Understanding, Learning & Coordination, and Interaction & Adaptation are connected aspects of an ongoing feedback loop: how systems see and interpret the world of interaction, how they learn and coordinate within it, and how they adapt their behaviour as that world changes.

**Homepage themes introduction:** retain the existing concise homepage copy (unchanged).

**Guardrails:**

- Organising lens only — not a novel-algorithm claim.
- Do not imply every historical HMI paper experimentally demonstrates the entire loop.
- Theme titles and existing per-theme summaries remain verbatim (B1).

### A5. Application Pathways introduction (B2)

Retain existing application cards and taxonomy. **Do not** create a new application tag without verified publication/project coverage.

**Approved introductory wording:**

> Our research applications span neurodevelopment, health, accessibility, social robotics, education, and embodied interaction with the physical world. These areas cut across our three scientific themes.

---

## B. Faculty decisions — resolved

| ID | Decision | Resolution |
|---|---|---|
| **B1** | Theme descriptions | **Retain** existing three research-theme summaries **verbatim**. Do not rewrite them to force a feedback-loop narrative. |
| **B2** | Embodied interaction | **Mention in Application Pathways introduction** with the approved wording above. Retain cards/taxonomy; **no new application tag**. |
| **B3** | About heading hierarchy | Small **Research Philosophy** section label + `h2` **How does interaction shape intelligence?** After approved prose, before Minsky. |
| **B4** | Feedback-loop introduction | Apply the accepted **longer** loop introduction on the **Research page only**. Keep the existing concise **homepage** themes introduction. |

---

## C. Implementation plan (separate content-only PR)

1. Update `HERO_INTRODUCTION` to A2.
2. Add About Research Philosophy block (A3 / B3).
3. Replace Application Pathways `intro` with A5 / B2 (cards unchanged).
4. Replace Research page lede with A4 loop sentence; leave homepage `ResearchThemes` intro unchanged; leave theme summaries untouched (B1 / B4).
5. Regression tests: text fidelity, heading hierarchy, section ordering, application visibility, links, responsive accessibility.
6. **Still gated:** M4; production deploy; typography / visual redesign.

After the content implementation is verified and merged, treat HMI research positioning as **frozen** unless a substantive scientific reason emerges to revise it.

---

## D. Explicit non-goals

- No new branding system or visual redesign.
- No second homepage slogan competing with the punchline.
- No grand claim that all intelligence requires interaction.
- No invented quotations; Minsky remains historical reference only.
- No rewriting of publication abstracts or bibliographic fields.
- No implication that the feedback-loop framing is a novel algorithm or that every archive paper demonstrates the full loop.
- No new application tag without verified coverage.

---

## Acceptance checklist

### §A — locked

- [x] Central question: How does interaction shape intelligence?
- [x] Retain lab name, Interactive Intelligence, punchline, three themes
- [x] Homepage introduction (A2)
- [x] Research Philosophy two-paragraph copy (A3)
- [x] Placement: after five approved paragraphs, before Minsky
- [x] Themes feedback-loop lede + guardrails (A4)
- [x] Application areas visibility via pathways intro (A5)
- [x] PR #5 documentation-only

### §B — resolved

- [x] **B1** Theme card summaries retained verbatim
- [x] **B2** Embodied interaction in Application Pathways intro; no new tag
- [x] **B3** Section label + `h2` question hierarchy
- [x] **B4** Longer loop lede on Research only; homepage themes intro unchanged

### Implementation (follow-on PR)

- [x] Separate content-only implementation PR + regression tests (opened for review)
- [x] No M4 / no production / no typography changes in that PR
- [ ] Positioning frozen after content PR is verified and merged
