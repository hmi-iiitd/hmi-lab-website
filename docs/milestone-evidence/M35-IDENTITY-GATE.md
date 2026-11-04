# M3.5 — Interactive Intelligence identity rollout

**Branch:** `feat/m3.5-identity`  
**Scope:** Homepage punchline/intro, About page, three-theme + application pathways, metadata/footer alignment, logo size refinement.  
**Out of scope:** M4 theme/project depth, production domain, historic repository.

## Canonical copy

- Punchline: `Intelligence emerges through interaction.`
- Hero introduction: `src/lib/identity.ts` → `HERO_INTRODUCTION`
- About body: `src/content/identity/approved-description.md` (verbatim)
- Minsky: *The Society of Mind* §16.1, p. 163 (faculty-supplied emotion/intelligence quotation)
- Featured: ESL (Accepted), CHI 2024 HM, Sci Rep ADHD pupil dynamics, MobiTangibles
- Typography: semantic tokens in `tokens.css`; readability suite `tests/e2e/m35-readability.spec.ts`

## Evidence

- E2E: `tests/e2e/m35-identity.spec.ts`
- Screenshots: `m35-identity-{homepage,about,research}-{desktop,mobile}.png`
