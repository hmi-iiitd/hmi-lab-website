# I2 — Seven-paper Selected Research homepage

**Status:** Faculty CONDITIONAL PASS corrections addressed; awaiting merge authorization.  
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
- Year deduplication via `selectedResearchStatusLabel` (e.g. `NeurIPS 2026 · Accepted`; `IEEE TAC · 2021`).

## RED → GREEN

| Step | SHA | Notes |
|---|---|---|
| RED | `ebc13b0` | Failing I2 content/e2e tests |
| GREEN | `08a5f47` | Allowlist helper, SelectedResearch Option A, featured ranks |
| CONDITIONAL PASS fix | _(this head)_ | Year dedupe + focused Selected Research screenshots |

## Screenshots (Selected Research section only)

Hero-heavy captures (`before-desktop.png` / `after-desktop.png`, etc.) are superseded. Use these focused section shots:

| Viewport | Before (duplicated years) | After (deduped years) |
|---|---|---|
| Desktop 1440 | `i2-screenshots/before-selected-desktop.png` | `i2-screenshots/after-selected-desktop.png` |
| Tablet 768 | `i2-screenshots/before-selected-tablet.png` | `i2-screenshots/after-selected-tablet.png` |
| Mobile 390 | `i2-screenshots/before-selected-mobile.png` | `i2-screenshots/after-selected-mobile.png` |

Each capture is `#selected-research` only and includes the ESL feature plus both rows of six cards.

## Staging assertions

Normal `dist/index.html` Selected Research section:

- Contains paper links for all seven allowlisted slugs.
- Omits MobiTangibles, CHI Honorable Mention promo, fixture markers, and `feature-viz`.
- ESL meta is `NeurIPS 2026 · Accepted` (no duplicated year).
- EDA meta is `IEEE TAC · 2021`.

MobiTangibles remains on `/publications/` and `/papers/mobitangibles/`.

## Inherited follow-up (out of I2 scope)

The seven `owner_approved` records still carry `tldr_source_note` text ending with “Not owner-approved for public display,” inherited from the T-B drafting phase. Display is unaffected (`tldr_status` + helper gate). **Propose a distinct metadata-cleanup PR** to refresh those source notes only—do not fold that edit into I2.

## Residual risks

- Fixture-enabled e2e builds insert the synthetic TL;DR fixture after ESL (seven real + one fixture card); staging excludes fixtures.
- Section intro copy was lightly updated to describe the seven-paper portfolio (Selected Research only; not I3/I4).

## CI evidence

| Item | Value |
|---|---|
| PR | https://github.com/hmi-iiitd/hmi-lab-website/pull/15 |
| Head SHA | _(filled after push)_ |
| CI | _(filled after green run)_ |

## Recommendation

**PASS** for merging I2 after green CI on the CONDITIONAL PASS corrections — **stop; do not merge without separate PI merge instruction.** I3/I4/T-C/M4.3/M4.4/production remain unauthorized.
