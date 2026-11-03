# ADR-003 — Interactive Intelligence research identity

**Status:** Accepted (2026-11-03)  
**Applies to:** M3 data architecture (PR #1); UI/copy/logo rollout deferred to **M3.5**

## Context

The lab finalized scientific positioning under a single research identity with three primary themes, superseding the earlier four-theme homepage structure. Publications already use verified bibliographic records; identity copy must not rewrite those records.

## Decision

1. **Canonical identity**
   - Lab: Human–Machine Interaction Research Group  
   - Institution: IIIT-Delhi  
   - Research identity: **Interactive Intelligence**  
   - Punchline: **Intelligence emerges through interaction.**

2. **Primary themes** (exactly three; ordered):
   1. `perception-understanding` — Perception & Understanding  
   2. `learning-coordination` — Learning & Coordination  
   3. `interaction-adaptation` — Interaction & Adaptation  

3. **Cross-cutting applications** remain a separate searchable dimension (`application_tags`), including neurodevelopment, autism, ADHD, health, accessibility, social robotics, education, and pervasive computing. Papers may map to multiple themes and multiple tags.

4. **Authoritative prose** is stored verbatim at `src/content/identity/approved-description.md`. Do not paraphrase for site surfaces that claim to render the approved description. Homepage uses only the approved punchline plus a short approved hero sentence (M3.5); full five paragraphs render on `/about/` (M3.5).

5. **Logo** (M3.5): sole official mark is the historic HMI logo (`hmi-iiitd.github.io` `images/logo/logo_new.jpg`). No redesign in M3.

6. **Minsky quotation (About, M3.5):** The brief cited *The Society of Mind* §16.1 p.163. Independent check places the intended “no trick / diversity” passage at **§30.8 ≈ p.308**. M3.5 must reconcile the locator before publishing the About aside; do not invent alternative slogans.

7. **Sequencing**
   - **M3 (this PR):** canonical file, this ADR, three-theme + tag schemas, publication remapping, architecture tests; M3.5 UI tests exist but are skipped.  
   - **M3.5 (separate PR):** homepage hero, About page + verified Minsky quotation, logo derivatives, research index display, nav/metadata, redirects if needed.  
   - **M4:** rich theme/project pages.

## Migration from four themes

| Retired id | Maps primarily to |
|---|---|
| `adaptive-social-intelligence` | `learning-coordination` |
| `ai-human-wellbeing` | `interaction-adaptation` (+ application tags `health`, `neurodevelopment` where applicable) |
| `behavioral-intelligence` | `perception-understanding` |
| `novel-interaction-sensing` | `interaction-adaptation` and/or `perception-understanding` |

Stable publication `id` / `slug` / DOI values are unchanged.

## Consequences

- Content and CI must enforce exactly three published primary themes.  
- Application tags must not be conflated with primary themes.  
- M3.5 UI tests remain skipped until that PR; architecture tests pass on M3.
