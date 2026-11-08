# I3 — Homepage Interactive Intelligence identity and W1 refinement

**Status:** Implementation PR prepared; awaiting faculty merge authorization.  
**Baseline:** `main` @ `b69bba4558e9aa563ee10f7c77b2385d2358f5e5` (I2 merged; CI + Pages OK)  
**Authority:** M421 D1/D2/D3.

## Homepage copy

| Role | Value | Source |
|---|---|---|
| Eyebrow | Human–Machine Interaction · IIIT-Delhi | `HOME_EYEBROW` |
| H1 | Interactive Intelligence | `RESEARCH_IDENTITY` |
| Secondary deck | Intelligence emerges through interaction. | `PUNCHLINE` |
| Supporting intro | unchanged | `HERO_INTRODUCTION` |
| CTAs | Explore research · View publications · About the lab | unchanged |

Exactly one semantic H1. Punchline is `.hero-deck`, not a competing headline.

## CSS summary (homepage-scoped)

- `#hero` reduced vertical padding (W1).
- `#hero .hero-bottom` stacked column; CTAs under introduction.
- `#hero + .section` tighter transition into Selected Research.
- `#selected-research` denser section-top / mini-grid; ESL `.feature--text` gains horizontal padding and wider max-width.
- Global `.section` / non-homepage layouts left unchanged.

## RED → GREEN

| Step | SHA | Notes |
|---|---|---|
| RED | `469ed58` | Failing I3 tests + before screenshots |
| GREEN | `dd2e11c` | Identity hierarchy + W1 CSS + test updates |
| Follow-up | `91614e1` | M2 homepage H1 assertion update |

## Screenshots

Focused section captures (not header-dominated):

| Subject | Before | After |
|---|---|---|
| Hero | `i3-screenshots/before-hero-*.png` | `i3-screenshots/after-hero-*.png` |
| Hero → Selected | `before-hero-to-selected-*.png` | `after-hero-to-selected-*.png` |
| ESL feature | `before-esl-feature-*.png` | `after-esl-feature-*.png` |
| Full Selected | `before-selected-*.png` | `after-selected-*.png` |

Viewports: 320, 390, 768, 1024, 1440.

## I2 portfolio unchanged

Allowlist and seven approved TL;DRs retained; MobiTangibles stays off Selected; D9 award promo still suppressed.

## Out of scope / follow-ups

- I4 About proposition prose
- T-C remaining TL;DRs
- Separate metadata cleanup for outdated `tldr_source_note` “Not owner-approved…” strings
- M4.3/M4.4, production

## CI evidence

| Item | Value |
|---|---|
| PR | https://github.com/hmi-iiitd/hmi-lab-website/pull/16 |
| Head SHA | `91614e1` (full: `91614e1…` on branch tip) |
| CI | https://github.com/hmi-iiitd/hmi-lab-website/actions/runs/42462265424 (success) |

## Recommendation

**PASS** for merging I3 after green CI — **stop; do not merge without separate PI merge instruction.**
