# HMI Lab Website

Independent Astro rebuild of the Human–Machine Interaction Research Group site (IIIT-Delhi).

| Environment | URL / location | Status |
|---|---|---|
| Production | https://hmi.iiitd.edu.in/ | **READ-ONLY** until M8 approval |
| Historic source | `hmi-iiitd/hmi-iiitd.github.io` | **READ-ONLY** |
| This repo | `hmi-iiitd/hmi-lab-website` | Active development |
| Staging (S1) | `https://hmi-iiitd.github.io/hmi-lab-website/` | Enabled after security audit + Pages |

## Spec & rules

- [`HMI_WEBSITE_PRD.md`](./HMI_WEBSITE_PRD.md) — product contract
- [`CURSOR_KICKOFF_PROMPT.md`](./CURSOR_KICKOFF_PROMPT.md) — agent kickoff
- [`.cursor/rules/hmi-dev.mdc`](./.cursor/rules/hmi-dev.mdc) — engineering rules
- [`docs/decisions/ADR-001-hosting.md`](./docs/decisions/ADR-001-hosting.md) — hosting decision (S1)
- [`docs/M0-BLOCKERS.md`](./docs/M0-BLOCKERS.md) — staging vs production blockers
- [`docs/DESIGN_DIRECTION.md`](./docs/DESIGN_DIRECTION.md) — warm off-white / editorial / muted teal
- [`docs/migration-redirects.csv`](./docs/migration-redirects.csv) — legacy URL inventory

## Local development

Requires Node 22+.

```bash
npm ci
npm run test          # unit + content acceptance tests
npm run lint
npm run typecheck
npm run validate:content
npm run build:staging
npm run preview       # serves dist with project base path
npm run test:e2e      # Playwright smoke + axe (expects staging build)
npm run ci            # lint + typecheck + test + validate + staging build
```

Production-shaped build (does **not** deploy):

```bash
npm run build:production
```

Base path comes from `PUBLIC_BASE_PATH` / Astro `base` — do not hardcode the staging host in content.

## Content integrity

- Draft fixtures may exist under `src/content/**` with `published: false`.
- Pages and `papers/[slug]` only emit `published: true` **and** `metadata_verified: true` publications.
- `scripts/validate-content.ts` rejects incomplete publishable records and scans `dist/` for draft markers.

## Safety

- Never edit institutional DNS or `hmi.iiitd.edu.in` from routine PRs.
- Never modify the historic repository.
- Production workflow is intentionally failing/disabled until M8.
