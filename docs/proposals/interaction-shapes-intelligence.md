# Proposal — Research positioning: How does interaction shape intelligence?

**Status:** Draft for faculty content review only — **do not implement** until accepted.  
**Out of scope:** M4 theme/project pages; institutional production website; typography / visual redesign (frozen after PR #4).  
**Preserves:** Lab name, Interactive Intelligence identity, punchline, three themes, approved five-paragraph About description (verbatim), Minsky §16.1 quotation.

## Intent

Sharpen the scientific message around one central question:

> **How does interaction shape intelligence?**

Emphasize that intelligent agents do not merely receive observations and respond: their actions can change what other agents do, what information becomes available, and how subsequent learning and coordination unfold.

Avoid: grand claims that all intelligence requires interaction; invented quotations; multiple competing slogans; rewriting verified publication records.

---

## What stays fixed

| Element | Canonical source |
|---|---|
| Human–Machine Interaction Research Group | ADR-003 / `LAB_NAME` |
| Interactive Intelligence | ADR-003 / `RESEARCH_IDENTITY` |
| “Intelligence emerges through interaction.” | ADR-003 / `PUNCHLINE` |
| Perception & Understanding · Learning & Coordination · Interaction & Adaptation | ADR-003 / theme ids |
| Five-paragraph About body | `src/content/identity/approved-description.md` — **verbatim** |
| Minsky quotation | §16.1, p.163 — historical intellectual reference only |

---

## Proposed changes (narrow)

### 1. Programme name prominence (UI copy hierarchy only)

Make **Interactive Intelligence** slightly more visible as the name of the research programme—without replacing the lab name or adding a second slogan.

**Candidate surfaces (choose one primary + optional secondary):**

- Homepage hero eyebrow / programme line: keep lab context, surface `Interactive Intelligence` as the programme name adjacent to the punchline (not as a new H1).
- About page section label or programme subhead above the approved description: e.g. programme name only; punchline remains the existing H2 in the approved markdown.
- Research index lede: one short sentence naming Interactive Intelligence as the organising programme for the three themes.

**Do not:** introduce alternate punchlines; demote the lab name in the header/footer brand.

### 2. Homepage short introduction (optional wording update)

Current (`HERO_INTRODUCTION`):

> We study interactive intelligence: how intelligent systems perceive and understand people and other agents, learn and reason through interaction, and adapt their behaviour in response.

**Candidate A (people · other agents · physical world):**

> We study Interactive Intelligence: how intelligent systems perceive and understand people, other agents, and the physical world; learn and reason through interaction; and adapt their behaviour as interaction unfolds.

**Candidate B (lighter touch — add physical world only):**

> We study interactive intelligence: how intelligent systems perceive and understand people, other agents, and the physical world, learn and reason through interaction, and adapt their behaviour in response.

**Constraint:** Homepage-only; must remain one short paragraph; must not contradict or paraphrase the approved About description as a substitute for it.

### 3. About — new “Research Philosophy” section

Add a **short** section on the About page **after** the approved five paragraphs and **before or after** the Minsky quotation (faculty preference). Organised around the central question; 2–4 short paragraphs max.

**Draft (for review — not locked):**

#### Research Philosophy

##### How does interaction shape intelligence?

Interactive Intelligence treats interaction as more than a channel for observations and responses. When an agent acts, it can change what other agents do, what information becomes available, and how subsequent learning and coordination unfold. Intelligence, in this view, is shaped inside that ongoing loop—not only by what is sensed at a single moment.

We therefore ask how systems can perceive and understand people, other agents, and situations under changing conditions; how they can learn and coordinate when behaviours continually reshape one another; and how interfaces, robots, and assistive systems should adapt so interaction remains usable and trustworthy.

Our three research themes name connected aspects of this loop. They are not isolated silos: progress in one direction informs the others as perception, learning, and adaptation feed forward and back through interaction.

**Constraints:**

- No claim that *all* intelligence requires interaction.
- No new slogan competing with the punchline.
- Minsky remains a historical intellectual reference, not a proof of the programme.
- Approved five-paragraph description stays **word-for-word**.

### 4. Three themes as a feedback loop

Update **theme section intros / theme blurbs** (homepage themes module + Research page) so each theme is framed as part of one loop:

| Theme | Loop role (proposal) |
|---|---|
| Perception & Understanding | Sensing and interpreting people, agents, and context when interaction changes what can be observed |
| Learning & Coordination | Learning about and with others when actions reshape behaviours, beliefs, and available information |
| Interaction & Adaptation | Choosing how to act and adapt so the next cycle of perception and learning remains effective and humane |

**Candidate shared lede (homepage / research):**

> Perception & Understanding, Learning & Coordination, and Interaction & Adaptation are connected aspects of an ongoing feedback loop: how systems see and interpret the world of interaction, how they learn and coordinate within it, and how they adapt their behaviour as that world changes.

Retain existing theme titles and ids. Prefer refining existing short theme paragraphs over adding new cards or layout.

### 5. Explicit non-goals

- No redesign of type, colour, logo, or layout philosophy (frozen after PR #4).
- No M4 rich theme/project pages in this content pass.
- No production (`hmi.iiitd.edu.in`) deploy.
- No invented quotations or additional punchlines.
- No rewriting of publication abstracts or bibliographic fields.

---

## Suggested acceptance checklist (next content review)

- [ ] Central question wording accepted or revised.
- [ ] Homepage intro: keep current / Candidate A / Candidate B / other faculty edit.
- [ ] Research Philosophy draft accepted, revised, or deferred.
- [ ] Placement of Philosophy relative to Minsky quotation decided.
- [ ] Theme loop lede + per-theme blurbs accepted or revised.
- [ ] Programme-name prominence surface(s) chosen.
- [ ] Implementation gated behind a dedicated content PR after written acceptance.

## Implementation note (after acceptance only)

Ship as a **content-only** PR: identity constants / About section markup / theme intro copy / focused tests. No visual-system changes. M4 remains separately gated.
