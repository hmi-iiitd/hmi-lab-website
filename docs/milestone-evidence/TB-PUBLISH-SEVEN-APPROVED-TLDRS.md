# T-B publish — seven individually approved plain-language TL;DRs

**Status:** Staging publication PR prepared; awaiting faculty merge authorization.  
**Scope:** Elevate seven Phase B records from `ai_assisted_draft` → `owner_approved` with per-summary evidence.  
**Out of scope:** I2 seven-card layout, I3–I4, T-C/T-D, M4.3/M4.4, production, homepage identity/whitespace/About.

## Exact-wording verification

All seven current `plain_language_tldr` strings were checked against the PI acceptance comments on PR #13 review [#5813117979](https://github.com/hmi-iiitd/hmi-lab-website/pull/13#pullrequestreview-5813117979). **0 mismatches.**

| Paper | Approval evidence | Surfaces |
|---|---|---|
| `epistemic-social-learning` | [discussion_r4502368504](https://github.com/hmi-iiitd/hmi-lab-website/pull/13#discussion_r4502368504) | Selected (primary) · archive · paper |
| `social-robots-autism-care-india` | [discussion_r4502368537](https://github.com/hmi-iiitd/hmi-lab-website/pull/13#discussion_r4502368537) | Selected · archive · paper |
| `trial-pupil-dynamics-adhd` | [discussion_r4502368530](https://github.com/hmi-iiitd/hmi-lab-website/pull/13#discussion_r4502368530) | Selected · archive · paper |
| `predictive-asd-acoustic-linguistic` | [discussion_r4502368523](https://github.com/hmi-iiitd/hmi-lab-website/pull/13#discussion_r4502368523) | Archive · paper |
| `vr-flat-screen-gaming-responses` | [discussion_r4502368542](https://github.com/hmi-iiitd/hmi-lab-website/pull/13#discussion_r4502368542) | Archive · paper |
| `emotion-recognition-eda` | [discussion_r4502368554](https://github.com/hmi-iiitd/hmi-lab-website/pull/13#discussion_r4502368554) | Archive · paper |
| `express-ear` | [discussion_r4502368561](https://github.com/hmi-iiitd/hmi-lab-website/pull/13#discussion_r4502368561) | Archive · paper |

## Metadata applied (each of seven)

- `tldr_status: owner_approved`
- `tldr_reviewed_by: PI Jainendra Shukla (PR #13 individual acceptance review 5813117979)`
- `tldr_approved_at: "2026-11-07"`
- `tldr_review_evidence`: individual discussion URL above
- Exact TL;DR wording and scientific `tldr_source_note` preserved
- Featured ranks / Selected four-paper cardinality unchanged

## Tests

| Check | Result |
|---|---|
| Exact wording + approval metadata (content) | Covered |
| Helper returns canonical texts for seven only | Covered |
| Paper pages + publications archive render TL;DRs | Covered (e2e) |
| Homepage 1+3 with ESL/CHI/ADHD summaries | Covered (e2e) |
| Unapproved papers omit TL;DR chrome | Covered (e2e) |
| No-JS archive readability | Covered (e2e) |
| Mobile overflow (ExpressEar) | Covered (e2e) |
| Draft-leak derivation remains rewrite-safe | Covered |

## CI evidence

| Item | Value |
|---|---|
| PR | https://github.com/hmi-iiitd/hmi-lab-website/pull/14 |
| Head SHA | `1540ea1` (full: see `git rev-parse` on branch) |
| CI | https://github.com/hmi-iiitd/hmi-lab-website/actions/runs/42385908063 (success) |
| PI acceptance review | https://github.com/hmi-iiitd/hmi-lab-website/pull/13#pullrequestreview-5813117979 |

## Recommendation

**PASS** for merging T-B public TL;DR elevation after green CI — **stop; do not merge without separate PI merge instruction.** I2–I4 / M4.3–4 / production remain unauthorized.
