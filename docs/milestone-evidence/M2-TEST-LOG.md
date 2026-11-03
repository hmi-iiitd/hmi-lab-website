# M2 test evidence

## RED (against M1 homepage)

`npx playwright test tests/e2e/homepage.spec.ts` → **8 failed / 8 passed**  
Failures: missing `#selected-research` / `#news-highlights` / `#community`, second CTA, mobile menu Escape, four themes, footer email link, skip-focus target, visual baselines.

## GREEN (after implementation)

```text
npm run lint          → pass
npm run typecheck     → 0 errors
npm test              → 7 passed
npm run validate:content → Content OK (4 themes)
npm run build:staging → 4 pages
npx playwright test tests/e2e → 20 passed
```

A11y contrast regressions fixed for people/news panels and placeholder banners; brand `aria-label` mismatch removed.
