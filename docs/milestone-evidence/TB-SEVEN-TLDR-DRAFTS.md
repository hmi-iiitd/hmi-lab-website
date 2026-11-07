# T-B — Seven Selected TL;DR drafts for scientific review

**Status:** Faculty CONDITIONAL PASS on draft preparation; lay revisions incorporated.  
**Still pending:** Paper-owner / PI approval of the **exact** revised strings.  
**Gate:** No `owner_approved` elevation and no public TL;DR rendering until per-summary content approval + `tldr_review_evidence`.

## Scope

| In | Out |
|---|---|
| Paper-grounded `plain_language_tldr` for the seven M421 §9 Phase B slugs | Promoting any draft to `owner_approved` |
| `tldr_status: ai_assisted_draft` + source notes | I2 seven-card homepage membership / layout |
| Faculty lay revisions (PR review #5813014854) | I3–I4, T-C/T-D, M4.3/M4.4, production |
| Leak scan derived from draft-status records | Hard-coded draft phrase lists |

## Seven drafts (post–faculty editorial revision)

| Slug | Status | Grounding notes |
|---|---|---|
| `epistemic-social-learning` | `ai_assisted_draft` | NeurIPS 2026 poster abstract; **no 26% figure** pending manuscript check |
| `predictive-asd-acoustic-linguistic` | `ai_assisted_draft` | IEEE TAI abstract |
| `trial-pupil-dynamics-adhd` | `ai_assisted_draft` | Scientific Reports abstract; preserves post-correction uncertainty |
| `social-robots-autism-care-india` | `ai_assisted_draft` | CHI 2024 abstract |
| `vr-flat-screen-gaming-responses` | `ai_assisted_draft` | IEEE TAC / arXiv abstract |
| `emotion-recognition-eda` | `ai_assisted_draft` | IEEE TAC abstract; person-dependent vs independent distinction |
| `express-ear` | `ai_assisted_draft` | IMWUT abstract + HMI project description |

## Safeguards

- Public UI still uses only `getApprovedPlainLanguageTldr` (requires `owner_approved` + evidence).
- Staging `dist/` leak scan uses `collectDraftTldrLeakMarkers` over every `editorial_draft` / `ai_assisted_draft` record (rewrite-safe).
- Clinical / health drafts avoid diagnostic-product language and causal medication claims.
- Homepage Selected Research cardinality remains frozen (`slice(1, 4)`); featured ranks unchanged.

## Review ask

For each of the seven **revised** strings: accept, revise, or reject the exact draft text. Content approval is per-summary and requires durable `tldr_review_evidence` before any `owner_approved` change.

Faculty scientific/editorial review: https://github.com/hmi-iiitd/hmi-lab-website/pull/13#pullrequestreview-5813014854

## CI evidence

| Item | Value |
|---|---|
| PR | https://github.com/hmi-iiitd/hmi-lab-website/pull/13 |
| Prior head (pre-revision) | `78375773e78bbb4b70772554849bb09ee6dc8430` |
| Prior CI | https://github.com/hmi-iiitd/hmi-lab-website/actions/runs/42380322948 (success) |
| Head SHA (lay revision) | _(filled after push)_ |
| CI (lay revision) | _(filled after green run)_ |

## Recommendation

**CONDITIONAL PASS addressed for readability** after green CI on the revised drafts — **stop; do not merge without separate PI merge instruction.** Do not elevate to `owner_approved` or start I2–I4 / M4.3–4 / production from this PR alone. Exact-string scientific approval remains PENDING.
