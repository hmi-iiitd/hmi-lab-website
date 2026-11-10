# I4 — About Research Philosophy proposition

**Status:** Implementation PR prepared; awaiting faculty merge authorization.  
**Baseline:** `main` @ `eb5fb6c1f8f1600a1d9e4140cb3c49e8e1e4c338` (I3 merged; CI + Pages OK)  
**Authority:** M421 D4 (HMI proposition on About); D5 deferred (no additional thinkers).

## Exact copy added

**Canonical constant** (`HMI_RESEARCH_PROPOSITION` in `src/lib/identity.ts`):

> The question is not whether intelligent machines can interact, but whether intelligence for human worlds can emerge without interactional learning.

**Rendered framing** (ordinary `<p class="hmi-research-proposition">` after the two existing philosophy paragraphs):

> Our programme poses a question — an HMI programme statement inspired by the form of Minsky's inquiry: *[proposition verbatim]*

This is an HMI-authored programme statement. It is **not** a Marvin Minsky quotation.

## Placement and attribution

| Check | Result |
|---|---|
| Inside existing `.about-philosophy` | Yes |
| After both `RESEARCH_PHILOSOPHY_PARAGRAPHS` | Yes |
| Ordinary paragraph (not blockquote / about-quote / cite) | Yes |
| Identified as HMI programme statement | Yes |
| Minsky-inspired framing without misattribution | Yes |
| Reading order: approved description → philosophy → Minsky | Preserved |
| Homepage / Research index | Proposition absent |

## Sole epigraph preserved

Authentic Minsky quotation unchanged via `MINSKY_SOCIETY_OF_MIND`:

> The question is not whether intelligent machines can have any emotions, but whether machines can be intelligent without any emotions.

Attribution: Marvin Minsky, *The Society of Mind* (1986), §16.1, p. 163.

Exactly one `figure.about-quote` on About. D5 additional thinkers not introduced.

## RED → GREEN

| Step | SHA | Notes |
|---|---|---|
| RED | `b29cb53` | Failing content + E2E I4 tests |
| GREEN | `86608b1` | Constant + About prose + assertion tighten |

## Screenshots

Focused Research Philosophy / Minsky captures (`docs/milestone-evidence/i4-screenshots/`):

| Subject | Before | After |
|---|---|---|
| Philosophy | `before-philosophy-{desktop,mobile}.png` | `after-philosophy-{desktop,mobile}.png` |
| Philosophy + Minsky | `before-philosophy-and-minsky-*.png` | `after-philosophy-and-minsky-*.png` |
| Minsky alone | `before-minsky-*.png` | `after-minsky-*.png` |

Capture helper: `scripts/capture-i4-about-shots.mjs`.

## Accessibility / responsive / no-JS

| Check | Result |
|---|---|
| Viewports 320 / 390 / 768 / 1024 / 1440 | No horizontal overflow (E2E) |
| No-JS readability | Proposition + Minsky visible |
| About axe (wcag2a/aa + 2.1/2.2 aa) | 0 violations (serious/critical: 0) |
| Repo `test:a11y` | Passed |
| Keyboard | Unchanged site focus order |

## Out of scope / follow-ups

- T-C remaining 25 paper summaries
- Outdated `tldr_source_note` metadata cleanup (separate PR)
- M4.3 / M4.4, production deployment
- D5 additional historical quotations

## CI evidence

| Item | Value |
|---|---|
| PR | https://github.com/hmi-iiitd/hmi-lab-website/pull/17 |
| Head SHA | `c2abf7f7aa38b2838e7162ad26c26c70a46c9855` |
| CI | https://github.com/hmi-iiitd/hmi-lab-website/actions/runs/42761356853 (quality success) |

## Recommendation

**PASS** for merging I4 after green CI — **stop; do not merge without separate PI merge instruction.**
