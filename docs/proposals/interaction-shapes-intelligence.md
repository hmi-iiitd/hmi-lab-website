# Proposal — Research positioning: How does interaction shape intelligence?

**Status:** Direction **accepted** with editorial refinements (faculty review of PR #5).  
**This PR (#5):** Documentation only — **no site copy, layout, or visual changes**.  
**Out of scope here and until a later content PR:** M4; institutional production; typography / visual redesign (frozen after PR #4).

**Preserves:** Lab name, Interactive Intelligence identity, homepage punchline, three scientific themes, approved five-paragraph About description (verbatim), Minsky §16.1 quotation as a historical intellectual reference.

---

## Intent

Communicate a clear scientific agenda around one central question:

> **How does interaction shape intelligence?**

Intelligent agents do not merely receive observations and respond: their actions can change what other agents do, what information becomes available, and how subsequent learning and coordination unfold.

---

## A. Accepted wording (locked for a future content-only PR)

### A1. Fixed identity (no change)

| Element | Wording / source |
|---|---|
| Lab name | Human–Machine Interaction Research Group |
| Programme name | Interactive Intelligence |
| Punchline | Intelligence emerges through interaction. |
| Themes | Perception & Understanding · Learning & Coordination · Interaction & Adaptation |
| About body | `src/content/identity/approved-description.md` — **five paragraphs, verbatim** |
| Minsky quotation | §16.1, p.163 — remains after the new philosophy section |

**Branding note:** `Interactive Intelligence` is already present in the homepage eyebrow and Research heading. **No** additional uppercase/bold branding, new H1, competing slogan, or visual redesign.

### A2. Homepage introduction (replace `HERO_INTRODUCTION` only)

**Accepted sentence:**

> We study interactive intelligence: how intelligent systems perceive and understand people, other agents, and the physical world; learn and reason through interaction; and adapt their behaviour as interaction unfolds.

Homepage-only; one short paragraph; does not replace or paraphrase the approved About description.

### A3. About — Research Philosophy (placement + copy)

**Placement (accepted):** After the five approved About paragraphs, **before** the Minsky quotation.

**Heading structure (accepted):**

- Section label / heading: Research Philosophy  
- Question as section title (not a second homepage slogan): How does interaction shape intelligence?

**Accepted body (two paragraphs):**

Interactive Intelligence treats interaction as more than a channel for observations and responses. When an agent acts, its actions may change other agents’ responses, physical settings, and the information available for later learning and coordination. Intelligence, in this view, is shaped inside that ongoing loop—not only by what is sensed at a single moment.

We therefore ask how systems can perceive and understand people, other agents, and situations under changing conditions; how they can learn and coordinate when behaviours continually reshape one another; and how interfaces, robots, and assistive systems should adapt so interaction remains usable and trustworthy. Our three research themes name connected aspects of this ongoing feedback loop while preserving each theme’s individual scientific scope.

### A4. Themes as a feedback loop (organising lens)

**Accepted shared lede** (homepage themes module and/or Research page intro — refine existing lede; do not replace theme titles or invent new theme ids):

> Perception & Understanding, Learning & Coordination, and Interaction & Adaptation are connected aspects of an ongoing feedback loop: how systems see and interpret the world of interaction, how they learn and coordinate within it, and how they adapt their behaviour as that world changes.

**Accepted guardrails:**

- The loop is an **organising lens** for the programme, not a claim that the feedback-loop perspective is itself a novel algorithm.
- Do **not** imply that every historical HMI paper experimentally demonstrates the entire loop.
- Preserve each theme’s existing scientific scope and contribution language; do not overwrite theme blurbs with generic loop-only prose.

### A5. Cross-cutting application areas (visibility)

Keep **neurodevelopment, ADHD, autism, health, accessibility**, and **embodied interaction** visible as cross-cutting application areas (alongside existing pathways such as social robotics, education, and pervasive computing). Application pathways remain a separate dimension from the three primary themes.

---

## B. Remaining faculty decisions

Items still open before implementation; not blocked for proposal acceptance, but should be settled in content review:

1. **Theme card blurbs** — Keep current per-theme questions/paragraphs as-is, or lightly edit each so the loop role is explicit **without** diluting individual scientific scope? (Default if undecided: keep current blurbs; change shared lede only.)
2. **Embodied interaction** — Surface as (a) wording in the Application Pathways section intro only, (b) a new published application tag, or (c) mapping onto an existing tag (e.g. pervasive computing / social robotics) with clearer label copy?
3. **Research Philosophy heading level** — Prefer `h2` “Research Philosophy” with the question as `h3`, or the question as the sole visible `h2` under a small section label?
4. **Research index lede** — Apply the accepted themes-loop sentence on Research only, homepage only, or both?

---

## C. Deferred implementation

**Do not implement in PR #5.** After final content approval of any remaining decisions in §B:

1. Open a **separate content-only PR** (no typography, colour, logo, or layout redesign).
2. Update only: `HERO_INTRODUCTION`; About page markup for Research Philosophy (placement A3); themes shared lede (and any faculty-approved blurb edits); application-pathway visibility for embodied interaction as decided in §B.
3. Add **regression tests** for:
   - approved five-paragraph About text unchanged;
   - accepted homepage introduction exact match;
   - Research Philosophy present after approved prose and before Minsky (text + attribution);
   - existing primary navigation and key internal links;
   - responsive layout / no horizontal overflow at established viewports (no visual-system changes).
4. **Still gated:** M4 rich theme/project pages; production (`hmi.iiitd.edu.in`) deployment.

---

## D. Explicit non-goals

- No new branding system or visual redesign.
- No second homepage slogan competing with the punchline.
- No grand claim that all intelligence requires interaction.
- No invented quotations; Minsky remains historical reference only.
- No rewriting of publication abstracts or bibliographic fields.
- No implication that the feedback-loop framing is a novel algorithm or that every archive paper demonstrates the full loop.

---

## Acceptance checklist

### Locked (this revision)

- [x] Central question: How does interaction shape intelligence?
- [x] Retain lab name, Interactive Intelligence, punchline, three themes
- [x] Homepage introduction (A2)
- [x] Research Philosophy two-paragraph copy (A3)
- [x] Placement: after five approved paragraphs, before Minsky
- [x] Themes feedback-loop lede + guardrails (A4)
- [x] Application areas remain visible, including embodied interaction (A5)
- [x] PR #5 stays documentation-only

### Still open (§B)

- [ ] Theme card blurbs: keep vs light edit
- [ ] Embodied interaction: intro wording vs new tag vs remap
- [ ] Philosophy heading hierarchy
- [ ] Where to apply themes-loop lede (home / research / both)

### After final content approval

- [ ] Separate content-only implementation PR + regression tests
- [ ] No M4 / no production / no typography changes
