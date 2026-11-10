# Variant B — institutional static production handoff

**Audience:** authorized IIIT-Delhi administrator for `hmi.iiitd.edu.in`  
**Do not store credentials, SSH hosts, or private paths in this repository.**

## Recommendation

Deploy the Astro static `dist/` tree produced by `npm run build:production` to the existing institutional document root (**Variant B**). Prefer keeping current DNS and TLS unchanged.

## Questions for the host owner (answer offline)

1. Who controls filesystem / CMS / sync access for `hmi.iiitd.edu.in`?
2. How are static files uploaded or released (rsync, panel, package, other)?
3. Does the server honor `.htaccess` (`AllowOverride` / equivalent) for directory routes and redirects?
4. Where is the current site backed up, and how is restore tested?
5. Who executes cutover and rollback?
6. Can DNS and TLS remain unchanged for this launch?

## Artifact expectations

- Build: `PUBLIC_SITE_URL=https://hmi.iiitd.edu.in PUBLIC_BASE_PATH=/`
- Must include: `.htaccess`, `robots.txt` (`Allow` + sitemap), `sitemap.xml`
- Must not include: staging `noindex`, `/hmi-lab-website/` prefixed asset/href roots
- Checksum file: `docs/milestone-evidence/MVP-PRODUCTION-ARTIFACT.sha256`

## Smoke after cutover

```bash
SMOKE_BASE_URL=https://hmi.iiitd.edu.in/ SMOKE_CHECK_REDIRECTS=1 npm run smoke:production
```

## If Variant B is blocked

Record the specific blockers (no static sync, no rewrite support, etc.). Only then consider Variant A (GitHub Pages custom domain). Do not initiate DNS changes from the application repository without separate authorization.
