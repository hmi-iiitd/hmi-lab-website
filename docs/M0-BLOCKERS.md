# M0 blockers — classified

**Date:** 2026-11-03  
Internal network addresses and exact server software strings are omitted from this public file (see private ops audit).

## Staging-required (needed before or during S1 Pages go-live)

| ID | Unknown | Impact on staging | Interim |
|---|---|---|---|
| S1 | Confirm org allows public repo + GitHub Pages for this project | Blocks enabling Pages URL | Keep private until security audit + visibility change |
| S2 | Confirm no embargoed drafts will be marked `published: true` in collections | Staging would leak incomplete claims | Schema publishability gates in CI |
| S3 | Branch protection + required CI status checks on `main` | Merge without tests | Configure after first green CI |

## Production-migration-only (not needed for M1 staging)

| ID | Unknown | Impact | Interim |
|---|---|---|---|
| P1 | Exact institutional deploy mechanism for the live site | Cutover/rollback planning | Treat live tree as independent |
| P2 | Whether any job still pulls the historic GitHub repo | Accidental coupling risk | Historic repo frozen; Pages off |
| P3 | Authoritative public DNS records (from off-campus) and DNS owner | M8 DNS change | Capture before cutover |
| P4 | Full backup/export of live document root | Rollback rehearsal | Request read-only export pre-M8 |
| P5 | TLS certificate ownership/renewal on institutional host | Cutover risk | Document with IT |
| P6 | Production Variant A vs B | M8 topology | Decide after M7 |
| P7 | Named production approvers + rollback owner | Governance | Fill before M8 |
| P8 | Independent confirmation of reported institutional server software version (treat unconfirmed version strings as a **potential** infrastructure concern, not a site-app bug) | Security hygiene for host team | Escalate to IT; out of scope for Astro app |

## Settled

- New work only in `hmi-lab-website`.
- Historic repo read-only.
- Design direction: warm off-white / editorial / muted teal.
- S1 staging path approved after audit.
