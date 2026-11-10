# Legacy URL continuity plan (MVP launch)

Authority: `docs/migration-redirects.csv` + live site inventory at https://hmi.iiitd.edu.in/

Hosting assumption for redirects: **Variant B** institutional Apache (or compatible) static hosting using `public/.htaccess` shipped with the production artifact.

## Ready for cutover (301)

| Legacy | New | Notes |
|---|---|---|
| `/` / `/index.html` | `/` | Homepage |
| `/publication.html` | `/publications/` | Publications index |
| `/team.html` | `/people/` | People directory |
| `/project.html` | `/research/` | Research themes index |
| `/ExpressEar.html` | `/papers/express-ear/` | Verified paper slug |
| `/Feature-extraction-selection-for-emotion-recognition.html` | `/papers/emotion-recognition-eda/` | Verified paper slug |
| `/semi-supervised-learning-predicting-listener-backchannels.html` | `/papers/listener-backchannels/` | Verified paper slug |

## Soft landings (302) — no dedicated replacement yet

| Legacy | Temporary target | Decision |
|---|---|---|
| `/contact.php`, `/contact_us.html` | `/about/` | Mailto contact remains primary |
| `/faq.html`, `/join_us.html` | `/about/` | Defer dedicated pages |
| `/blog.html`, `/updates.html` | `/` | News section returns when verified items exist |
| `/resources.html`, `/old_projects.html` | `/research/` | Themes + publications are the public research routes |
| `/HRI-for-ASD-Diagnosis.html`, `/Emotionalyzer.html` | `/research/` | No public Research Story yet (M4.3 deferred) |

## Deferred / preserve-on-old-host

| Item | Decision |
|---|---|
| Legacy `/img/*`, `/css/*`, `/images/*` assets | Keep available on old host until cutover; do not delete during preparation |
| Full team roster beyond director | Requires PI-confirmed current membership; not inferred from historical pages |
| Blog/news archive content | Defer until verified news records are authored |

GitHub Pages staging does **not** apply `.htaccess`. Redirect rehearsal must use the institutional host or an Apache-compatible preview.
