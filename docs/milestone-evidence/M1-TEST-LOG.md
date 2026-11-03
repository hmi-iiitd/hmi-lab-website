# M1 test evidence (local)

## Red → green notes

1. **Publication publishability** (`tests/content/publications.test.ts`): written to assert that `published: true` without ordered authors fails; duplicate slug/DOI fails; draft incomplete records pass draft schema only.
2. **A11y** initially **RED**: footer accent-on-night contrast 2.23:1; muted `#677574` on bg 4.47:1. Fixed token/footer colors → **GREEN**.
3. **Draft leak**: staging build scanned; markers `DRAFT_ONLY_DO_NOT_PUBLISH` / `draft-seed-incomplete-authors` absent from `dist/`.

## Commands executed (2026-11-03)

```text
npm ci / npm install
npm test                 → 7 passed
npm run lint             → exit 0
npm run typecheck        → 0 errors
npm run validate:content → Content OK
npm run build:staging    → 4 pages
npm run test:e2e         → 4 passed (smoke + axe)
```
