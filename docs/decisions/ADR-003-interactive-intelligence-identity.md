# ADR-003 — Interactive Intelligence research identity

**Status:** Accepted (2026-11-03)  
**Applies to:** M3 data architecture (PR #1); UI/copy/logo rollout deferred to **M3.5**

## Context

The lab finalized scientific positioning under a single research identity with three primary themes, superseding the earlier four-theme homepage structure. Publications already use verified bibliographic records; identity copy must not rewrite those records.

## Decision

### Canonical identity

- **Lab:** Human–Machine Interaction Research Group  
- **Institution:** IIIT-Delhi  
- **Research identity:** Interactive Intelligence  
- **Punchline:** Intelligence emerges through interaction.

### Three scientific themes

1. **Perception & Understanding** (`perception-understanding`)  
2. **Learning & Coordination** (`learning-coordination`)  
3. **Interaction & Adaptation** (`interaction-adaptation`)

### Cross-cutting application tags

Separate searchable dimension (not primary themes), with prominent visibility for **neurodevelopment**, **ADHD**, **autism**, **health**, and **accessibility**, plus social robotics, education, and pervasive computing. Papers may belong to multiple themes and multiple tags.

### Complete approved HMI description (verbatim)

Canonical file: `src/content/identity/approved-description.md`  
Do not paraphrase. Reproduced here in full:

---

# Human–Machine Interaction Research Group

## Intelligence emerges through interaction.

At the Human–Machine Interaction (HMI) Research Group at IIIT-Delhi, we study **interactive intelligence**: how intelligent systems perceive and understand people and other agents, learn and reason through interaction, and adapt their behaviour in response.

Our research spans three closely connected themes: **perception and understanding**, **learning and coordination**, and **interaction and adaptation**. We develop multimodal methods for understanding human behaviour, affect, attention, physiology, and social signals; computational methods for learning about and coordinating with other agents; and interactive systems that translate these capabilities into adaptive interfaces, robots, assistive technologies, and intelligent physical systems.

Interaction is central to this view of intelligence. People and agents differ in their behaviours, preferences, capabilities, and responses, and these can change as interaction unfolds. Increasingly, our work asks how intelligent systems can learn in such settings, reason about what they observe, and decide how that knowledge should shape subsequent interaction and coordination.

We investigate these questions across human–AI interaction, multi-agent systems, affective and multimodal computing, pervasive sensing, social robotics, **neurodevelopment, accessibility, and health**. Our work ranges from fundamental computational models to novel interactive systems, real-world applications, and technology translation.

Across these directions, our broader goal is to build intelligent systems that can **understand, learn from, and adapt through interaction—with people, other intelligent agents, and the physical world.**

---

### Sequencing

- **M3 (this PR):** Record identity (this ADR + canonical file), confirm three-theme + application-tag data-model compatibility, publication remapping, architecture tests.  
- **M3.5 (separate PR):** Homepage hero, About page, official logo, Minsky quotation, metadata, visual changes.  
- **M4:** Rich theme/project pages.

### Minsky quotation (About, M3.5 only)

Faculty-supplied emotion/intelligence quotation from *The Society of Mind* **§16.1 p.163**:  
“The question is not whether intelligent machines can have any emotions, but whether machines can be intelligent without any emotions.”

## Migration from four themes

| Retired id | Maps primarily to |
|---|---|
| `adaptive-social-intelligence` | `learning-coordination` |
| `ai-human-wellbeing` | `interaction-adaptation` (+ `health` / `neurodevelopment` tags where applicable) |
| `behavioral-intelligence` | `perception-understanding` |
| `novel-interaction-sensing` | `interaction-adaptation` and/or `perception-understanding` |

Stable publication `id` / `slug` / DOI values are unchanged.

## Consequences

- Content and CI enforce exactly three published primary themes.  
- Application tags must not be conflated with primary themes.  
- M3.5 UI remains out of scope for PR #1.
