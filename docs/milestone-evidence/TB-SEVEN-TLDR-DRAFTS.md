# T-B — Seven Selected TL;DR drafts for scientific review

**Status:** Drafts prepared for faculty / paper-owner scientific review. **Not public.**  
**Gate:** No `owner_approved` elevation and no public TL;DR rendering until per-summary content approval + `tldr_review_evidence`.

## Scope

| In | Out |
|---|---|
| Paper-grounded `plain_language_tldr` for the seven M421 §9 Phase B slugs | Promoting any draft to `owner_approved` |
| `tldr_status: ai_assisted_draft` + source notes | I2 seven-card homepage membership / layout |
| Tests proving drafts stay off staging HTML | I3–I4, T-C/T-D, M4.3/M4.4, production |

## Seven drafts

| Slug | Status | Grounding |
|---|---|---|
| `epistemic-social-learning` | `ai_assisted_draft` | NeurIPS 2026 poster abstract |
| `predictive-asd-acoustic-linguistic` | `ai_assisted_draft` | IEEE TAI abstract (DOI) |
| `trial-pupil-dynamics-adhd` | `ai_assisted_draft` | Scientific Reports abstract (DOI) |
| `social-robots-autism-care-india` | `ai_assisted_draft` | CHI 2024 abstract (DOI) |
| `vr-flat-screen-gaming-responses` | `ai_assisted_draft` | IEEE TAC / arXiv abstract (DOI) |
| `emotion-recognition-eda` | `ai_assisted_draft` | IEEE TAC abstract (DOI) |
| `express-ear` | `ai_assisted_draft` | IMWUT abstract (DOI) |

## Safeguards

- Public UI still uses only `getApprovedPlainLanguageTldr` (requires `owner_approved` + evidence).
- Staging `dist/` must not contain the draft TL;DR strings (content regression).
- Clinical / health drafts avoid diagnostic-product language and causal medication claims.
- Homepage Selected Research cardinality remains frozen (`slice(1, 4)`); featured ranks unchanged.

## Review ask

For each of the seven strings: accept, revise, or reject the **exact** draft text. Content approval is per-summary and requires durable `tldr_review_evidence` before any `owner_approved` change.

## CI evidence

| Item | Value |
|---|---|
| PR | _(filled after open)_ |
| Head SHA | _(filled after push)_ |
| CI | _(filled after green run)_ |

## Recommendation

**PASS** for scientific review of the seven drafts after green CI — **stop; do not merge without separate PI merge instruction.** Do not elevate to `owner_approved` or start I2–I4 / M4.3–4 / production from this PR alone.
