# MVP launch readiness — GO / NO-GO

**Merged readiness:** `#21` → `f1038e749df88d92736bebaba9f50c004a250a7a`  
**Launch amendment:** PI People profile editorial update (this branch)  
**Production target:** https://hmi.iiitd.edu.in/  
**Staging (unchanged):** https://hmi-iiitd.github.io/hmi-lab-website/  
**Verdict:** **NO-GO for production cutover** until hosting owner confirms deployment, backup, redirects, and rollback (and remaining §2 items).  
**Engineering readiness:** PI identity/role/profile text approved and rendered on People; **production deployment remains on HOLD**.

---

## 1. Exact release commit SHA

| Field | Value |
|---|---|
| Prior merged readiness | `f1038e749df88d92736bebaba9f50c004a250a7a` (#21) |
| Proposed release SHA | tip of `release/mvp-pi-profile-amendment` after this amendment lands (see PR) |
| Production artifact SHA-256 | `23d869681466fa6e282af424869649cc6ace63c2be44750cc96054c2e49b069c` (see `MVP-PRODUCTION-ARTIFACT.sha256`) |
| Build command | `npm run build:production` |
| Artifact root | `dist/` (immutable checksum of file paths + bytes) |

Faculty/IT must cut over from **this exact post-amendment SHA**.

---

## 2. Remaining P0 blockers (process — not code defects)

1. **Contact block confirmation** — Footer uses `hmi@iiitd.ac.in`, `+91-11-26907523`, `A-413, RnD Block, Okhla Phase III, New Delhi 110020` (matches current live site). Needs PI/IT confirmation that these remain current.
2. **Variant B host ownership** — Authorized IIIT-Delhi administrator must confirm who deploys to `hmi.iiitd.edu.in`, upload method, Apache `AllowOverride` for `.htaccess`, backup location, rollback owner, and that DNS/TLS stay unchanged. Sensitive details stay **out of this repository**.
3. **Redirect rehearsal on institutional host** — Local Astro/`serve` cannot exercise Apache `.htaccess`. Run `SMOKE_CHECK_REDIRECTS=1` against a production-shaped Apache preview before cutover.
4. **Hosting go for cutover** — Separate authorization after backup/deploy/rollback confirmation.

**Cleared:** PI identity, role, and People profile prose for Jainendra Shukla (no portrait; institutional link retained).
No fabrication of news, projects, or additional people was performed. Empty News and Projects sections are omitted.

---

## 3. Production host decision and IT owner

| Item | Status |
|---|---|
| Recommended hosting | **Variant B — institutional static deployment** (document root replace + shipped `public/.htaccess`) |
| Variant A (GitHub Pages custom domain) | Fallback only if Variant B blocked; **do not change DNS** from this PR |
| IT owner | **TBD — authorized IIIT-Delhi administrator** (name/contact outside public repo) |
| Production GitHub workflow | Remains intentionally disabled (`.github/workflows/production.yml`) |
| Automatic deploy on `main` | **Not enabled** |

### Variant B cutover checklist (for IT)

1. Backup current document root and confirm restore path.
2. Build from approved SHA: `npm ci && npm run build:production`.
3. Verify `dist/.htaccess`, `dist/robots.txt`, `dist/sitemap.xml`, no `noindex`, no `/hmi-lab-website/` asset prefixes.
4. Sync `dist/` to the institutional document root (method per IT).
5. Smoke: `SMOKE_BASE_URL=https://hmi.iiitd.edu.in/ SMOKE_CHECK_REDIRECTS=1 npm run smoke:production`.
6. On failure: restore backup (rollback owner executes).

If Variant B is unavailable, document blockers (e.g. no Apache overrides, no static sync access) and only then evaluate Variant A without initiating DNS changes here.

---

## 4. Content / people / contact sign-off requirements

| Item | Freeze status | Sign-off needed |
|---|---|---|
| Homepage Interactive Intelligence + themes | Frozen (I3) | Faculty confirm unchanged |
| Seven-paper Selected Research + seven owner-approved TL;DRs | Frozen (I2/T-B) | Already approved |
| About research philosophy / HMI proposition | Frozen (I4) | Already approved |
| T-C Batch 1 five summaries | Remain `ai_assisted_draft` (unpublished) | No elevation |
| News | Section omitted (no verified items) | OK until content exists |
| Projects / Research Stories | Section omitted (none public) | M4.3 deferred |
| People | Director only; approved bio rendered; no portrait | **PI identity/role/profile approved** |
| Contact email / phone / address | Matches live site | **PI/IT confirm** |

---

## 5. Redirect readiness

Plan: `docs/migration-redirects.md`  
Rules: `public/.htaccess` (copied into production `dist/`)

| Priority legacy paths | Target |
|---|---|
| `/publication.html` | `/publications/` (301) |
| `/team.html` | `/people/` (301) |
| `/project.html` | `/research/` (301) |
| ExpressEar / emotion-recognition / listener-backchannels HTML aliases | matching `/papers/…/` (301) |
| contact / blog / faq / join / resources / old flagship HTML | soft 302 landings per plan |

Old site must **not** be deleted during preparation. Asset-only legacy paths remain on the old host until cutover.

---

## 6. Test and accessibility results

| Gate | Result |
|---|---|
| `npm run ci` (lint, typecheck, unit/content tests, validate, staging build) | PASS |
| Playwright e2e (incl. a11y axe serious/critical on homepage) | PASS after News-omit label update |
| `npm run build:production` | PASS — sitemap + robots for `https://hmi.iiitd.edu.in` |
| `npm run smoke:production` on local production-shaped static serve | PASS (redirect checks skipped locally) |
| Production HTML placeholder / `noindex` / staging-base scan | PASS |
| Secret scan (repo text; no credentials added) | PASS — no production secrets introduced |

---

## 7. Backup and rollback status

| Item | Status |
|---|---|
| Engineering rollback procedure | Documented in §3 (restore prior document root) |
| Institutional backup of live `hmi.iiitd.edu.in` | **Not confirmed** — IT owner must confirm before cutover |
| Rollback rehearsal with host admin | **Pending** |
| This PR does not deploy | Affirmed |

---

## 8. Screenshots (desktop / mobile)

| Shot | Path |
|---|---|
| Homepage desktop | `docs/milestone-evidence/mvp-launch-screenshots/homepage-desktop.png` |
| Homepage mobile | `docs/milestone-evidence/mvp-launch-screenshots/homepage-mobile.png` |
| People desktop | `docs/milestone-evidence/mvp-launch-screenshots/people-desktop.png` |
| Research desktop | `docs/milestone-evidence/mvp-launch-screenshots/research-desktop.png` |
| Publications desktop | `docs/milestone-evidence/mvp-launch-screenshots/publications-desktop.png` |

---

## 9. Deferred post-launch features

- T-C Batch 2 and remaining plain-language TL;DRs  
- Elevation of Batch 1 drafts beyond `ai_assisted_draft`  
- M4.3 / M4.4 Research Stories and public Projects section  
- Full People directory beyond PI-accepted identities  
- Verified News / achievements stream  
- M5/M6 enhancements, redesign, new animations  
- Automatic production deploy workflow  

---

## 10. Exact actions required for production cutover

1. Faculty approve the **proposed release SHA** and People/contact content.  
2. Authorized IT owner confirms Variant B backup, deploy method, `.htaccess` support, rollback owner.  
3. Merge this PR to `main` **only after** explicit merge authorization (separate from this readiness work).  
4. On the approved SHA: `npm ci && npm run build:production`; record/compare artifact checksum.  
5. IT replaces document root; keep old tree as backup.  
6. Run production smoke with `SMOKE_CHECK_REDIRECTS=1`.  
7. If smoke fails, IT restores backup immediately.  
8. Do **not** enable `.github/workflows/production.yml` or DNS changes as part of this launch unless separately authorized.

---

**STOP BEFORE MERGE OR PRODUCTION DEPLOYMENT.**
