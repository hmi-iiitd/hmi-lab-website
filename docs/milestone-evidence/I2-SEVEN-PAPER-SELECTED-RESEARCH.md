# I2 — Seven-paper Selected Research homepage

**Status:** Implementation PR prepared; awaiting faculty merge authorization.  
**Baseline:** `main` @ `4ea51fb4eb59c2dd3e8c56efa5c7ba5807e2bd96`  
**Authority:** M421 §6–§7 Option A; D6/D7/D8/D12.

## Selection and rank diff

| Rank | Slug | Change |
|---|---|---|
| 1 | `epistemic-social-learning` | Unchanged (primary) |
| 2 | `predictive-asd-acoustic-linguistic` | `featured: false` → `true`, rank 2 |
| 3 | `trial-pupil-dynamics-adhd` | Rank remains 3 |
| 4 | `social-robots-autism-care-india` | Rank 2 → 4 |
| 5 | `vr-flat-screen-gaming-responses` | `featured: false` → `true`, rank 5 |
| 6 | `emotion-recognition-eda` | `featured: false` → `true`, rank 6 |
| 7 | `express-ear` | `featured: false` → `true`, rank 7 |
| — | `mobitangibles` | `featured: true` → `false`; rank removed (archive retained) |

Membership is enforced by `SELECTED_RESEARCH_SLUGS` allowlist in `src/lib/publications.ts` — an eighth `featured` record cannot silently enter Selected Research.

## Layout (Option A)

- Text-first ESL primary feature (decorative schematic retired).
- Six compact cards in order: ASD · ADHD · CHI · VR · EDA · ExpressEar.
- ASD/ADHD use `mini-card--elevated` for restrained emphasis.
- Desktop 3-col / tablet 2-col / mobile 1-col.
- D9: Selected Research `statusLabel` omits `data.award` (CHI Honorable Mention metadata preserved on the record).

## RED → GREEN

| Step | SHA | Notes |
|---|---|---|
| RED | `ebc13b0` | Failing I2 content/e2e tests + before screenshots |
| GREEN | _(this PR head)_ | Allowlist helper, SelectedResearch Option A, featured ranks, test updates |

## Screenshots

| Viewport | Before | After |
|---|---|---|
| Desktop 1440 | `i2-screenshots/before-desktop.png` | `i2-screenshots/after-desktop.png` |
| Tablet 768 | `i2-screenshots/before-tablet.png` | `i2-screenshots/after-tablet.png` |
| Mobile 390 | `i2-screenshots/before-mobile.png` | `i2-screenshots/after-mobile.png` |

## Staging assertions

Normal `dist/index.html` Selected Research section:

- Contains paper links for all seven allowlisted slugs.
- Omits MobiTangibles, CHI Honorable Mention promo, fixture markers, and `feature-viz`.

MobiTangibles remains on `/publications/` and `/papers/mobitangibles/`.

## Residual risks

- Fixture-enabled e2e builds insert the synthetic TL;DR fixture after ESL (seven real + one fixture card); staging excludes fixtures.
- Section intro copy was lightly updated to describe the seven-paper portfolio (Selected Research only; not I3/I4).
- Source notes on TL;DRs still contain historical “Not owner-approved…” wording from T-B drafting; display uses `owner_approved` + helper only.

## CI evidence

| Item | Value |
|---|---|
| PR | _(filled after open)_ |
| Head SHA | _(filled after push)_ |
| CI | _(filled after green run)_ |

## Recommendation

**PASS** for merging I2 after green CI — **stop; do not merge without separate PI merge instruction.** I3/I4/T-C/M4.3/M4.4/production remain unauthorized.
