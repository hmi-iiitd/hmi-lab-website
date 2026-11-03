# HMI Research Group Website — Product Requirements Document (PRD)

**Version:** 1.0  
**Date:** 2026-11-03  
**Product:** Human–Machine Interaction (HMI) Research Group, IIIT-Delhi  
**Production domain:** https://hmi.iiitd.edu.in/  
**Historic source repository:** `hmi-iiitd/hmi-iiitd.github.io` (PRIVATE; do not overwrite)  
**Proposed new repository:** `hmi-iiitd/hmi-lab-website` (name subject to availability)  
**Delivery approach:** Cursor-assisted, test-first development, small pull requests, milestone gates, separate GitHub staging, explicit production approval  
**Document state:** Implementation-ready specification; institutional hosting and publication metadata require verification during M0/M3.

---

## 0. Executive decision record

The HMI site is not merely a brochure or a faculty CV. It must be a **research-first, international-facing, low-maintenance academic publishing system**. Our visible design direction comes from the existing exploratory homepage concept (`hmi-lab-design-concept.html`): warm off-white, deep ink, restrained teal, generous editorial typography, authentic research visuals, and minimal motion. Keep the distinctive *“Intelligence is an interaction.”* concept as the **preferred initial copy**, not a final approved slogan.

**Fixed requirements**

1. Leave `hmi.iiitd.edu.in`, DNS, current server, and historic repository untouched throughout staging.
2. Generate every publication listing, paper detail page, featured card, researcher association, and research-theme page from **one validated content source**.
3. Every approved publication gets a permanent detail URL. Only selected papers receive an enhanced visual project page.
4. Every public scientific claim (title, authors, award, status, findings, links, media) must be supported by a source or explicitly marked as unverified/draft in content workflows.
5. Build the new site as a static export wherever possible. Avoid a database, backend, CMS plugins, and proprietary runtime dependencies for core pages.
6. Use test-first development, independent milestone reviews, branch protection, and reproducible GitHub CI.
7. A production release is a separate, human-authorized action, never an automatic consequence of completing staging.

**What is already known (as of 2026-11-03)**

- The historic repository `hmi-iiitd/hmi-iiitd.github.io` is accessible through the connected GitHub account; it is private, uses `master`, and last recorded push is **2023-05-24**.
- GitHub repository metadata reports **GitHub Pages not enabled** for that repo. Its root has static HTML, Bootstrap/jQuery assets, several PHP files, and no `.github/workflows` folder. These observations do **not** establish what the IIIT-D institutional server currently deploys.
- The earlier repository includes individual `.html` project pages and useful images and historic content. Preserve and inventory before migration.
- The uploaded *Publications_IIITD.pdf* reports **18 journal articles, 24 full conference papers, and 10 other refereed papers**. These are the dossier's counts, not independently validated lab-only totals.
- Confirmed candidate showcases from the dossier include ESL (NeurIPS 2026 accepted); a social-robotics CHI 2024 Honorable Mention; CHI 2021 listener backchannels; HaptiDrag (IMWUT/UbiComp); ExpressEar (IMWUT/UbiComp); MobiTangibles (IEEE TVCG); PACM HCI 2026 sensing papers; EngageME (AIED 2024); Effecti-Net (LAK 2024). **Metadata must be verified** before release.
- There is an exploratory single-file visual prototype, `hmi-lab-design-concept.html`, which is not production-ready; all its concept artwork is explicitly illustrative.

**Unresolved deployment question (M0 blocker):** Whether current `hmi.iiitd.edu.in` hosting still pulls from the old GitHub repository by any automated sync, or is maintained through a fully separate institutional workflow. Repo inactivity and absent GitHub workflows suggest the current site is disconnected, but do not prove it. Operational hosting fingerprints belong in private ops notes, not public docs.

---

## 1. Product vision and outcomes

### 1.1 Vision

A visitor should be able to understand within one minute (a) what HMI studies, (b) why its research matters, (c) which selected contributions illustrate the agenda, and (d) how to access papers, project demos, code, people, or contact information.

### 1.2 Primary user personas and jobs

| Persona | Primary job | Critical paths |
|---|---|---|
| International AI/HCI/HRI researcher | Evaluate scientific overlap and retrieve work | Homepage → Research theme → Paper → PDF/code/citation |
| Prospective PhD/RA/intern | Assess projects, people, opportunities | Homepage → People/Research → Opportunities → Contact |
| Reviewer / conference attendee / journalist | Understand a specific result and share it | Search engine/direct link → Paper page → Figure/video → Cite |
| Collaborator / funder | Understand lab capabilities and evidence | Research → Selected work → Team/Facilities → Contact |
| Lab website editor | Publish correct updates with little effort | Modify structured record → validation PR → preview → approval → publish |
| Faculty lead | Approve research positioning and highlights | Review staged content → sign off explicit release |

### 1.3 Measurable product outcomes (release targets, not claims of current performance)

- Every verified publication in the launch inventory has a stable address, correct metadata, and at least one canonical resource link where available.
- Featured project cards lead to functional paper/project pages; **no dead-end teaser cards**.
- A non-developer can add a publication by modifying a documented structured record without editing layout code.
- All main routes have responsive, keyboard-usable layouts and pass automated accessibility gates; manual WCAG 2.2 AA checks are completed.
- Every merge to the staging branch passes schema, unit, integration, accessibility, smoke, and build checks before deployment.
- No deployment to production without a recorded sign-off and rollback method.
- Zero unapproved research claims, invented imagery presented as evidence, or private/embargoed content on public staging.

### 1.4 Non-goals for initial release

- No chatbot, live LLM assistant, user accounts, discussion forum, or full CMS backend.
- No database or online paper scraping at render time.
- No automatic publication of discovered Scholar/Crossref/OpenAlex results without human approval.
- No complex 3D hero, parallax storytelling, autoplay backgrounds, or animation-heavy landing page.
- No public upload or collection of participant data, health data, or unpublished study media.
- No migration of the old PHP contact form to GitHub Pages (which cannot run PHP).
- No institute DNS changes during implementation.

---

## 2. Research identity and editorial approach

**Working HMI position:** Study how humans and intelligent systems perceive, learn from, and adapt to one another, spanning AI, HCI, robotics, multimodal sensing, and behavioral science.

**Working hero:** “Intelligence is an interaction.”  
**Supporting line:** “We study how people and intelligent systems perceive, learn from, and adapt to one another—bridging AI, human–computer interaction, robotics, and behavioral science.”

These lines are draft copy. Leadership/editorial sign-off is required before launch.

### 2.1 Research taxonomy (editable but consistent)

1. **Adaptive & Social Intelligence** — multi-agent learning, opponent modeling, human-agent interaction, HRI, conversational collaboration.
2. **Interactive Systems & Novel Sensing** — haptics, wearables, earables, VR, tangible and touch-free input.
3. **Human Sensing & Behavioral Intelligence** — multimodal behavior, eye tracking, pupil dynamics, EEG, affect and interpretability.
4. **Human-Centered AI for Health, Learning & Accessibility** — education, inclusive tools, clinical contexts, assistive and ethical AI.

Research themes should show a 1–2 sentence question, selected research, associated people, methods, and active directions. Do not manufacture “active projects” from older work.

### 2.2 Truthful attribution

Distinguish *lab-led*, *co-led/collaborative*, and *prior/faculty-affiliated* output in internal records. Publicly, show names and affiliations accurately; do not imply all faculty coauthored papers were produced solely by HMI. Awards should be associated with the exact paper and year. Do not use dubious cumulative counters or CORE labels as primary evidence of merit.

---

## 3. Information architecture

Top-level primary navigation (desktop + mobile):

- **Home** `/`
- **Research** `/research/` (theme index) and `/research/{theme-slug}/`
- **Publications** `/publications/` and `/papers/{paper-slug}/`
- **People** `/people/` and `/people/{person-slug}/` (where individual profile approved)
- **Projects & Demos** `/projects/` and `/projects/{project-slug}/` (enhanced pages; link to paper IDs)
- **News & Opportunities** `/news/`, `/news/{slug}/`, `/opportunities/`
- **About & Contact** `/about/` (facilities, collaboration, institutional link and verified email)

Keep mobile navigation no more complex than the desktop navigation. “Projects & Demos” may become a subnavigation under Research after an interaction test; don't duplicate entries gratuitously. Full URL redirects from important old `.html` paths must be mapped at launch.

### 3.1 Homepage required order

1. Header with HMI visual mark, “IIIT-Delhi”, primary navigation, accessible menu.
2. Intro/hero with meaningful lab statement, concise supporting text, “Explore research”, “View publications”. No generic AI stock image.
3. **Featured research**: one prominent ESL paper (if public-ready), followed by 2–4 selected works across different research directions; use genuine artifact figures or approved photography.
4. Four **research directions**, each with a research question and clear link.
5. **Selected / recent publications**: 4–6 items with year, title, venue, authors or abbreviated authors, canonical paper link.
6. **People / research community** preview, linking to complete people directory.
7. **News/highlights** (only dated verified items; never auto-show an empty module).
8. Footer with institute affiliation, verified contact email, Github, relevant public profiles, data/privacy/legal links as applicable.

### 3.2 Publications UX

Search by title/author/year/venue/topic; filter by year, category, theme; optionally featured/full list tabs. Accessible plain HTML results must remain visible when JavaScript is disabled (filtering can progressively enhance). Every paper entry links to its detail page and appropriate PDF/DOI/code/project resource.

Default sort: most recent publication date or accepted date with a documented date-source policy. Show accepted/online/published distinctly. A preprint and final journal/conference version should not silently become two distinct works; model multiple versions/publication records.

### 3.3 Paper detail pages

**Mandatory:** title, complete ordered authors, affiliations if verified, status and venue, year, abstract, topical tags, canonical citations/BibTeX where complete, PDF/DOI/resource links, associated research themes, last metadata verification date, contact/corresponding researcher when approved.

**Enhanced optional sections:** one-sentence scientific question; visual hero; problem → idea → evidence → limitations; 60–120 s video/demo; method diagram; downloadable data/code; reproducibility instructions; accessible captions/transcripts; related papers. Use these only when actual assets and claims exist.

### 3.4 People

Current people (faculty, PhD, researchers/staff, undergrad contributors), collaborators when approved, alumni archive. Each approved profile: name, role, research interests, links, optional photo (consent), publications automatically joined through stable `person_id`, start/end date where relevant. Do not accidentally imply alumni are current members.

### 3.5 News/opportunities

Date-stamped news with source and publication status. Jobs require `open|closed` and optional expiry date. If no current position exists, say “No currently advertised openings” and link to general contact; do not perpetually show stale calls.

---

## 4. Visual and interaction design system

### 4.1 Design intent

**Editorial minimalism × scientific storytelling × restrained motion.** The hero and cards should look like an academic research journal designed by a strong HCI group, not a SaaS dashboard. Source inspiration: Stanford HCI (discoverability), MIT HCI Engineering (artifact-first research pages), Stanford SHAPE (prototype imagery), John Horton (data-based publication pages), Transitions.dev (small meaningful transitions), MotionSites (spacing/composition only).

### 4.2 Visual tokens (initial proposal; review in M2)

| Token | Value | Usage |
|---|---|---|
| `--color-bg` | `#F8F7F3` | Warm page background |
| `--color-paper` | `#FEFDF9` | Neutral content surfaces |
| `--color-ink` | `#1C3437` | Primary text |
| `--color-muted` | `#677574` | Secondary text, subject to contrast tests |
| `--color-line` | `#D9DFDA` | Dividers |
| `--color-accent` | `#257C74` | Links/buttons; adjust shades to meet contrast |
| `--color-sage` | `#DCEBE6` | Rare quiet highlights |
| `--color-night` | `#1E4141` | Selected feature panels/footer |
| `--font-display` | Georgia / local serif stack | Headlines, no paid font requirement |
| `--font-body` | system UI / Inter-like sans fallback | Body, navigation, forms |
| Layout | ~1200–1450 px max, fluid gutters | Spacious but readable |

Use consistent 4/8 px spacing rhythm, clear heading hierarchy, body ~16–18 px desktop with adequate line height, content line length ~65–80 characters, minimal border decoration. Avoid reliance on color alone.

### 4.3 Motion policy

- Small hover/press/section reveal transitions, generally 120–240 ms.
- Every motion must communicate state, orientation, or affordance.
- Honor `prefers-reduced-motion: reduce` with nonanimated alternatives.
- No autoplay video, perpetual animated hero ornaments, scroll-jacking, unnecessary parallax, or motion required to discover content.
- No hydration of entire pages solely for animation.

### 4.4 Responsive layouts

Test at 320, 390, 768, 1024, and 1440 px viewports; portrait/landscape where appropriate. Navigation works with keyboard and touch, not hover only. Card grids stack with text after image in logical reading order. Tables/metadata never overflow horizontally.

### 4.5 Authentic content rule

Photographs must come from approved lab assets or licensed sources; any participant or clinical image must have documented public-use permission. Concept art must remain labeled illustrative. Academic diagrams must correspond to actual method or contain an explicit “schematic” caption. Never imply an AI-generated robot photo depicts a real study participant or setup.

---

## 5. Technology and repository architecture

### 5.1 Preferred stack

- Astro static site generator, current stable supported release pinned in the lockfile.
- TypeScript, Astro Content Collections + Zod validation.
- Markdown/MDX for narratives; YAML or JSON frontmatter for publications and people. Use CSV ingestion **only if** a deterministic validated transform is simpler for large bibliographies.
- Plain CSS / CSS modules and design tokens; avoid a large UI framework by default.
- Small JS/React/Svelte islands **only** for truly interactive demos or search filtering when required. Otherwise static HTML and progressive enhancement.
- GitHub Actions for CI and staging deployment; GitHub Pages staging if organization policy permits.
- Vitest for data/utility/unit tests; Playwright for browser E2E and visual regression; axe-core for automated accessibility scans; optional Lighthouse CI for performance assertions.
- npm with committed lockfile (or pnpm with committed lockfile; choose one at M1 and enforce).
- No database or runtime API for the core website.

### 5.2 Proposed source tree

```text
hmi-lab-website/
├── .cursor/rules/hmi-dev.mdc
├── .github/
│   ├── workflows/ci.yml
│   ├── workflows/staging.yml
│   └── workflows/production.yml  # manual workflow, initially disabled
├── docs/
│   ├── PRD.md
│   ├── decisions/             # architecture decision records
│   ├── content-guidelines.md
│   ├── deployment-runbook.md
│   ├── migration-redirects.csv
│   └── milestone-evidence/
├── public/
│   ├── images/                # original, approved, optimized assets
│   ├── papers/                # only distributable PDFs
│   └── media/
├── src/
│   ├── content.config.ts      # schemas
│   ├── content/
│   │   ├── publications/
│   │   ├── people/
│   │   ├── projects/
│   │   ├── research-areas/
│   │   ├── news/
│   │   └── opportunities/
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   │   ├── index.astro
│   │   ├── publications/index.astro
│   │   ├── papers/[slug].astro
│   │   ├── research/index.astro
│   │   ├── research/[slug].astro
│   │   ├── people/index.astro
│   │   ├── people/[slug].astro
│   │   ├── projects/[slug].astro
│   │   └── ...
│   ├── styles/
│   └── lib/
├── tests/
│   ├── unit/
│   ├── content/
│   ├── e2e/
│   └── visual/
├── scripts/
│   ├── validate-content.ts
│   ├── audit-links.ts
│   └── import-publications.ts # draft suggestions only
├── astro.config.mjs
├── package.json
└── README.md
```

Keep content separate from components. Generated `dist/` should not be hand-edited.

### 5.3 Example minimal content contract

```yaml
id: esl-2026
slug: epistemic-social-learning
kind: conference
status: accepted
publication_year: 2026
title: "Epistemic Social Learning: Latent Behavioral Structure under Endogenous Multi-Agent Interaction"
venue_full: "The Fortieth Annual Conference on Neural Information Processing Systems"
venue_short: "NeurIPS 2026"
authors:
  - name: "Jainendra Shukla"
  # remaining author names must be added from the camera-ready, in exact order
research_areas:
  - adaptive-social-intelligence
featured: true
metadata_verified: false
paper_url: null
code_url: null
doi: null
award: null
```

**Important:** This seed record is **intentionally incomplete**, and must **fail publishability validation** until the full authors, scholarly status/source, and approved URLs are supplied. Schema-level draft validity and publication readiness are distinct checks.

Required underlying fields: stable ID, slug, title, ordered authors, year, venue or archive, publication type, status, abstract, associated themes, evidence/source, `verified_at`, author permission/asset metadata where relevant. Optional fields: DOI, arXiv ID, official URL, PDF, code, dataset, video, slides, BibTeX, award, related project, captions, highlights, limitations. Relations must resolve to existing records.

### 5.4 Two-phase validation

1. **Draft schema:** Allows unpublished placeholders for content authors and partial imports, catches invalid types/IDs.
2. **Publishability schema:** Blocks any content marked `published: true` unless title, complete author order, year, status, source/evidence, links and visible media permissions meet requirements. Duplicate DOIs/IDs/slugs, unknown people/themes, and impossible dates fail CI.

Reviewers should see a report listing which publications are ready, incomplete, or contradictory. Do not silently fill missing URLs or author names.

### 5.5 Content update workflow

`Add/update one record → run validator → open PR → review generated preview + citations/source → merge → staging deploy → explicit production publish`.

An optional scheduled discovery script may query Crossref/OpenAlex for **candidates**, but only open draft issues/PRs and may never auto-merge. Do not treat Google Scholar scraping as a trusted live backend.

---

## 6. Deployment environments and safety boundary

### 6.1 Development / staging

- Proposed project repository: `hmi-iiitd/hmi-lab-website` (create only with approval).
- If **public repository** allowed: deploy GitHub Pages project site at the eventual `https://hmi-iiitd.github.io/hmi-lab-website/` path; verify organizational Pages policy and availability before declaring this URL operational.
- If **private source** required: first check organizational GitHub plan for private Pages support. If unavailable, select an approved staging host/publishing repo with safe artifact-only content; **do not expose private source or embargoed research through a public staging URL**.
- The staging build must use Astro `site` and `base` suitable for the `/hmi-lab-website/` path; all internal links, scripts, CSS, and assets must pass base-path tests.
- Add `noindex,nofollow` and omit production analytics on staging; note that `noindex` is **not** access control or confidentiality.
- Each approved merge to `main` deploys **staging only**.
- Pull requests get a CI-built preview artifact; per-PR public previews only if infrastructure supports them securely. One canonical staging URL is sufficient.

### 6.2 Production (not automatically enabled)

- Keep `https://hmi.iiitd.edu.in/` unchanged until explicit cutover approval.
- M0 identifies current hosting, domain control, HTTPS, DNS, backup, and authorized institute contact.
- Two viable release variants:
  - **Variant A:** GitHub Pages hosts production; institute DNS points the institutional subdomain to the Pages custom-domain configuration after security review.
  - **Variant B:** IIIT-D server remains production host; approved GitHub Actions CI deploys static `dist/` artifacts via restricted credentials/approved institutional method. GitHub Pages remains staging.
- Choose A or B **after M0**, based on institute policy, domain verification, available GitHub plan, and desired maintenance profile.
- The repository's `production` workflow must be manual (`workflow_dispatch`) and require signed-off git SHA, environment approval or equivalent protected release procedure, and post-deployment smoke tests. Repository plan restrictions on required-reviewer protections must be verified rather than assumed.
- Never put private tokens, SSH keys, login credentials, DNS secrets, or personal participant data in source/control logs.

### 6.3 Rollback requirements

Before cutover: archive full old site and relevant configs, capture original DNS records and TTL, verify ability to republish old content, prepare redirect map, capture production smoke baseline. For GitHub Pages rollback, redeploy a known-good git SHA; if DNS was switched and rollback is required, restore previous DNS and verify HTTPS/service. For institutional server rollback, restore previous static artifact/atomic symlink following institute practice. A rollback rehearsal must succeed on staging or an isolated environment prior to production release.

---

## 7. Accessibility, security, SEO, and performance

### 7.1 Accessibility (P0)

Target **WCAG 2.2 AA** for public pages, verified by automated + manual checks; passing axe alone is not conformance.

- Semantic landmarks, sequential headings, meaningful link names, alt text and empty alt for purely decorative art.
- Full keyboard access, visible focus, ESC-close accessible mobile menu, no focus traps, proper active-state announcements.
- Text and control contrast, comfortable target sizes, reflow at narrow screen, browser zoom.
- Skip-to-content link, reduced motion, captions/transcripts for video, accessible research charts with text equivalents.
- No dependence on hover, color, mouse-only actions, or motion to see scholarly content.

### 7.2 Security and privacy

- Static by default, strict trusted external links, use `rel="noopener noreferrer"` for relevant external targets.
- No public contact form in MVP; use approved mailto contact. Old PHP files (`contact.php`, mailer dependencies) are **not** deployed.
- Avoid trackers and analytics by default; if analytics approved, use privacy-respecting, documented, consent-aware setup according to institute requirements.
- No student/participant portrait without permission; no embargoed preprint or unpublished material exposed by staging.
- Dependency lockfile, package auditing, GitHub permissions least privilege, dependency review where available. Build should not need production secrets.
- Respect any Colorlib template/image licensing when inventorying historic assets; do not copy old template wholesale.

### 7.3 SEO & scholarly discoverability

- Canonical URLs in production, unique titles/descriptions, Open Graph preview images for featured papers, sitemap, robots config per environment.
- JSON-LD structured metadata where appropriate (`ScholarlyArticle`, `Person`, `Organization`) using only verified records.
- DOI/official proceedings canonical links; machine-readable BibTeX and citation copy when valid.
- Stable URL slugs and redirect mapping for previous important URLs, including `.html` where supported by host.
- `last_verified_at` distinct from arbitrary page build time; no false “recently updated” labels.

### 7.4 Performance targets (measured on representative mobile and desktop pages)

- Lighthouse **performance ≥90** and **accessibility ≥95** on standard representative pages in an agreed controlled CI profile; investigate rather than hiding flaky audits.
- Core Web Vitals aspirational field targets when RUM exists: LCP ≤2.5s, CLS ≤0.1, INP ≤200ms at p75.
- Defer/lazy-load offscreen media, responsive optimized images, avoid heavyweight JS and unnecessary fonts.
- No route should require JS just to read its abstract or contact details.
- Track real page sizes and requests as evidence; don't chase numeric targets by removing meaningful scientific figures.

---

## 8. Acceptance criteria by feature

| ID | Priority | Requirement | Verifiable acceptance |
|---|---|---|---|
| HOM-01 | P0 | Editorial homepage | H1, research statement, working CTAs, approved featured cards, nav/footer; mobile and keyboard tested |
| RES-01 | P0 | Four research themes | Each has description, stable URL, related approved papers; no empty theme without explanation |
| PUB-01 | P0 | Complete validated archive | Published records render correctly by year, status, venue; no duplicate slugs/DOIs |
| PUB-02 | P0 | Permanent detail per paper | Every published paper has `/papers/{slug}/` and complete verified required metadata |
| PUB-03 | P0 | Search/filter | Title/author/topic/year filters are deterministic, keyboard operable, clearable, zero-state tested |
| PPL-01 | P0 | People directory | Correct current/alumni distinction, approved profile, linked papers, image consent |
| PROJ-01 | P0 | Flagship project template | Hero + question + key idea + evidence + limitations + real resource links + accessible media fallback |
| NEWS-01 | P1 | News/opportunity engine | Dated entries and open/closed handling; stale opportunities not shown as open |
| CON-01 | P0 | One source of truth | Editing one publication record updates list, detail, featured and related records after one build |
| CI-01 | P0 | Quality checks | Typecheck, schema, unit, build, e2e, a11y, link audit, secret scan gates |
| DEP-01 | P0 | Independent GitHub staging | Public approved staging URL works on correct base path; production unchanged |
| DEP-02 | P0 | Manual production release | Production action cannot be triggered by ordinary staging merge |
| LEG-01 | P0 | Licensing & consent | No historic licensed assets or research-participant media copied without clearance |
| SEO-01 | P1 | Discoverable scholarly pages | Sitemap, metadata, canonical links, paper structured data, stable slugs |
| DEMO-01 | P2 | ESL interactive explainer | Precomputed reproducible trajectories, labeled as empirical vs illustrative, accessible text fallback |
| AUTO-01 | P2 | Draft discovery automation | External candidates become reviewable proposals only; never auto-publish |

**Release P0:** All P0 acceptance checks pass. P1 should be completed where already supported by content; P2 must not delay initial launch.

---

## 9. Test-first implementation contract

**For every milestone (RED → GREEN → REFACTOR):** (1) document behavior and acceptance; (2) write failing test(s), demonstrating red; (3) implement minimum code to pass, demonstrating green; (4) refactor; (5) run entire suite and review changed visuals; (6) publish evidence; (7) human sign-off before advancing.

**Do not invent test output or declare a passing gate without actual execution.** If CI, browser, or repository operations cannot be performed, report blocker and exact missing evidence; preserve unfinished status.

### 9.1 Required test layers

- **Content/schema unit tests:** duplicate IDs, missing author order, unknown cross-references, unsafe URLs, status/year/award constraints, stale/expired opportunities, preprint/final version relation.
- **Component/utility tests:** link construction under GitHub subpath, date rendering, citation formatting, search/filter, `featured` ordering.
- **Build tests:** static output, no invalid internal links, missing images, absent PDF resources, invalid JSON-LD, no inclusion of draft content.
- **Playwright E2E:** navigation, homepage → theme → paper flow, publications search/filter/clear/empty state, people → publications, mobile menu, keyboard, no JS essential reading, metadata links, paper page without optional assets.
- **Accessibility:** axe-core on every template; manual keyboard, screen-reader spot checks, 200% zoom, reduced motion, color contrast and media alternatives.
- **Visual regression:** 320 / 390 / 768 / 1440 px, at least home, publications, paper detail, people; images and fonts stabilized.
- **Production smoke:** DNS/HTTPS, homepage, paper direct URL, institutional footer, canonical, no staging/noindex, old URL redirects, resource links, indexing and robots policy.

### 9.2 Concrete E2E test cases

```text
E2E-001: / renders exactly one primary H1 and the research/navigation CTAs.
E2E-002: all primary nav items have valid destinations on GitHub Pages subpath.
E2E-003: publications search finds ESL via title and via a verified author.
E2E-004: year/topic filter intersects correctly; reset restores entries.
E2E-005: zero-result search announces clear state, without hiding page navigation.
E2E-006: every published paper row navigates to its own permanent page.
E2E-007: paper details show exact ordered author names and venue/status from data.
E2E-008: an incomplete/draft paper never becomes public via build.
E2E-009: research theme shows only related verified work and links back.
E2E-010: mobile menu is keyboard operable and closes on Escape.
E2E-011: text reflows at 320px without horizontal scroll.
E2E-012: prefers-reduced-motion results in no essential animation.
E2E-013: every illustrated schematic is clearly labeled; real photos have approved metadata.
E2E-014: keyboard user can find all main links and see focus state.
E2E-015: staging has noindex; production does not.
E2E-016: deployed staging loads CSS, JS, images, and all links under the base path.
E2E-017: unknown paper slug yields a proper 404 experience.
E2E-018: citation/download links are absent (not fabricated) when resource unavailable.
```

### 9.3 Required CI checks

`npm ci` → `lint` → `typecheck` → `test:unit` → `test:content` → `build:staging` → `test:e2e` (served build) → `test:a11y` → link/schema/media audits → stage artifact. Nightly/weekly external URL checks report transient rate limits separately. Store Playwright traces/screenshots when a test fails. CI concurrency and permissions should be bounded, secrets not exposed to forks.

### 9.4 Required milestone evidence

Each milestone PR must contain:

```text
Goal and scope:
Affected requirements:
Tests introduced BEFORE implementation (commit/test paths):
Red-state evidence:
Green-state evidence / CI link:
Desktop/mobile screenshots:
Accessibility results:
Data/source/license review:
Known deviations and risks:
Rollback or revert procedure:
Reviewer decision: PASS / FAIL / CONDITIONAL
```

---

## 10. Milestone plan with hard gates

### M0 — Repository, hosting, and migration discovery (NO website changes)

**Objective:** Eliminate deployment uncertainty before creating operational risk.

- Inspect old private repo tree, latest commits, old links, images, license statements, PHP forms, scripts, legacy pages.
- Obtain read-only details from IIIT-D admin: DNS (`dig`), TLS, origin server, deployment credentials ownership, backups, website source of truth, any Git pull/webhook/cron.
- Establish historical old URL inventory; sample old live and repo content to identify differences.
- Confirm whether new staging should be public or private and verify GitHub Pages policy.
- Document `docs/decisions/ADR-001-hosting.md` and deployment topology. Identify authorized approvers.

**Tests before implementation:** scripted checks for expected old page inventory and asset existence; proof-of-access/read-only confirmation; documented baseline HTTP status for top legacy URLs.

**Gate:** approved written hosting/staging decision, old site backup/export path, DNS owner, repository ownership, rollback owner. **Do not modify the live site.**

### M1 — New repository, content schemas, testing skeleton

**Objective:** Working empty static site with reliable automated validation.

- Bootstrap Astro/TypeScript, design tokens placeholder, content collections, draft/publish schemas, test runners, CI and code ownership.
- Create 2 verified sample records and deliberately malformed fixtures.
- Add GitHub Pages path-safe URL utilities and deployable staging workflow.
- Set branch protection/required PR checks appropriate to the plan and team.

**Write failing tests first:** duplicate/missing-field publication invalid; base-path link errors; incomplete published record blocked; build succeeds from clean checkout.

**Gate:** `npm ci` + full CI green; reproducible static build; staging homepage reachable from a separate URL; no production mutation.

### M2 — Design system and homepage skeleton

**Objective:** Approved visual direction based on existing concept and reference sites.

- Implement tokens, type hierarchy, Header/Footer, mobile menu, hero, research cards, responsive layout.
- Real images only when approved; fallback placeholder clearly labeled.
- Implement reduced-motion and accessible focus/skip navigation.

**Write failing tests first:** H1, nav routes, mobile keyboard and Escape, skip link, reduced motion, viewport reflow, no essential JS.

**Gate:** reviewed desktop/mobile screenshots and prototype alignment; a11y checks green; no empty/dead CTA; editorial approval for hero copy.

### M3 — Complete bibliographic source of truth

**Objective:** Verified paper database and functioning archive/detail page template.

- Parse uploaded publication dossier and legacy pages as **candidate source material**, not unquestioned ground truth.
- Reconcile against scholarly DOI/proceedings, accepted camera-ready lists, and author-verified records.
- Model coauthors, venues, awards, related versions, resources, research themes and lab attribution.
- Generate archive, stable paper detail, filtering/search, BibTeX when trustworthy.

**Write failing tests first:** total/unique records, duplicate detection, author order, missing DOI permitted but not fabricated, status constraints, search/filter, draft exclusion, broken relations.

**Gate:** manually spot-check **all featured items and all 2024–2026 records**, plus a documented stratified sample of older records; all public entries have source traceability and valid detail URL.

### M4 — Research themes and selected flagship pages

**Objective:** Tell the lab's scientific story through connected work.

- Create four theme pages and enhanced paper template.
- Initially develop ESL; CHI 2024 social robotics; one interactive-system exemplar (e.g., MobiTangibles or HaptiDrag) before scaling to additional showcases.
- Add methods, evidence, limitations, figure captions and links with author approval.

**Write failing tests first:** theme/paper linkage, permitted resources, empty-state fallback, responsive media, research pages reachable from homepage, no false public code link.

**Gate:** three exemplary project pages reviewed by scientific owners; real/illustrative visuals distinguished; no overclaiming empirical scope.

### M5 — People, alumni, and collaboration

**Objective:** Accurate, current human identities.

- Verify roles and status; create profiles, authorship associations, alumni archive.
- Use contact information only if approved and current.
- Remove stale office locations and faculty ranks until verified.

**Write failing tests first:** unique IDs, profile-author joins, alumni separation, optional photo behavior, no broken scholar/ORCID links.

**Gate:** people metadata signed off; no outdated status or unauthorized photo.

### M6 — News, opportunities, SEO, publishing operations

**Objective:** Make the site sustainable after its launch.

- Add dated news and expired-opportunity logic, content guide, editor runbook.
- Sitemap, canonical/OG, JSON-LD, links audit, redirects inventory, verified dates.
- Optional scholarly metadata discovery produces DRAFT proposals, not public releases.

**Write failing tests first:** expired opportunities hidden, no news empty cards, sitemap includes correct published URLs, staging noindex, production canonical correctness.

**Gate:** editor successfully adds and updates one paper/news item in a PR without touching layouts; build shows changes in all connected views.

### M7 — Full staging hardening and internal acceptance

**Objective:** Validate the complete site on the GitHub URL without changing production.

- Run full test matrix; actual browsers/devices, accessible workflows, review all assets/citations and links.
- Conduct content signoff by faculty/researchers and independent code review.
- Confirm legacy URL mapping, screenshots, performance measurements, security/secret checks.

**Write failing tests first:** add regression tests for defects found during acceptance; never simply update expected snapshots to conceal defects.

**Gate:** all P0 requirements pass, no serious/critical automated accessibility findings, documented manual accessibility review, staging approval, rollback rehearsal, approved production release commit SHA.

### M8 — Controlled institutional production cutover

**Objective:** Release verified build to `hmi.iiitd.edu.in` only after authorization.

- Explicit human approval and approved institute administrator present/available for rollback procedure.
- Capture existing DNS/TLS/config; select verified production variant A or B.
- Deploy exact approved SHA, validate HTTPS/redirects/robots/canonical/resource links, monitor errors.
- Preserve old site and avoid deletion of original repo.

**Tests before cutover:** staging reproduction from release tag, production smoke script prepared and tested against staging, rollback rehearsal.

**Gate:** production smoke pass, signed release report, documented ownership and restore path. If fail, revert immediately per approved plan.

### M9 — Maintenance and research showcase expansion (post-launch)

- Add remaining flagship project pages in batches, videos and accurate project figures.
- Optional ESL precomputed belief/adaptation demonstration after scientific validation.
- Optional draft publication discovery PRs, regular dependency/content checks, new-student update procedure.

**Gate:** enhancements ship only with independent tests and no disruption of production content.

---

## 11. Flagship-page prioritization

**P0 launch showcase candidates (subject to final ownership/media clearance):**

1. ESL, NeurIPS 2026 — central question, coupled belief/prototype schematic, actual post-switch regret results, explicit synthetic 3×3 game scope, paper/supplement/code only if released.
2. Social robots for autism care, CHI 2024 Honorable Mention — question, qualitative/social setting, permissioned photos/figures, empirical findings without overgeneralization.
3. MobiTangibles, IEEE TVCG 2024 — approved technique photography/video, method, limitations.
4. HaptiDrag, IMWUT/UbiComp 2022 — haptic prototype and experimental setting.
5. ExpressEar, IMWUT/UbiComp 2021 — sensing setup, method visualization, dataset/code if public.

**P1 enhancements:** PACM HCI 2026 sensing works, CHI 2021 listener backchannels, pupil/ADHD studies, EngageME, Effecti-Net, selected multimodal work.

The full archive should not be limited to these papers. Priorities are for richer project-page production, not scientific merit rankings.

---

## 12. Governance and release permissions

| Decision | Owner / sign-off |
|---|---|
| Research identity, hero copy, featured claims | Faculty research lead |
| Bibliographic facts, author order, awards | Paper owner + publication editor |
| Participant imagery, audio/video, ethics clearance | Paper owner + relevant consent/IRB/institute representative |
| Repository/CI architecture | Technical maintainer |
| DNS, TLS, institutional server | IIIT-Delhi authorized IT/admin |
| Production release | Faculty lead + technical maintainer + relevant IT approval |

Require two maintainers with sufficient repository access and a written onboarding guide. At least one contributor other than original builder must demonstrate editing a publication record successfully.

---

## 13. Risks and mitigations

| Risk | Impact | Mitigation / gate |
|---|---|---|
| Old repo not current live source | Accidental destructive migration | M0 current origin and DNS audit; never overwrite |
| Private repository Pages plan limitations | Staging blocked | M0 hosting eligibility; public artifact-only staging if approved |
| GitHub project-path breaks local CSS/links | Broken staging | M1 base-path E2E and staged smoke tests |
| Incorrect author order, venue, award | Scientific/reputational harm | Content publishability schema + paper owner signoff |
| Licensed old Colorlib assets reused improperly | Legal/compliance risk | Asset audit; recreate independently unless licensed |
| Participant or clinical media published | Privacy/ethics harm | Media approval metadata; no public staging of unapproved assets |
| Contact form copied to static site | Broken functionality/security | Email link only in MVP; no PHP on Pages |
| Site appears current but people/jobs are stale | Trust erosion | Verified dates; review owner; expiry logic |
| Animation undermines accessibility | Poor usability | Reduced-motion, manual testing, limited motion |
| Cursor silently changes scope or bypasses tests | Unreliable product | Cursor project rules; per-milestone PR; test evidence and gates |
| DNS/production switch fails | Downtime | Independent staging, preserve old site, capture DNS, rollback rehearsal |
| Dependency drift or single-student ownership | Future decay | Lockfile, CI, documented workflows, two maintainers |

---

## 14. Definition of Done — release readiness checklist

- [ ] M0 deployment history resolved; legacy site backed up; production permissions established.
- [ ] All P0 acceptance criteria pass in CI and on real GitHub staging.
- [ ] Source-based publication database reconciled and reviewed (especially current/flagship papers).
- [ ] No draft/placeholder paper, fake citation, or unapproved media appears publicly.
- [ ] Every published publication URL is stable, correct, and direct-linkable.
- [ ] Desktop and mobile design reviewed; keyboard navigation and screen-reader spot checks completed.
- [ ] Automated axe issues addressed; manual WCAG 2.2 AA findings recorded and cleared or approved with transparent remediation policy.
- [ ] Link, image, metadata, redirect, robots, and SEO checks pass.
- [ ] Separate staging/production config verified; staging cannot mutate production.
- [ ] Production deploy procedure is manual and requires explicit recorded authorization.
- [ ] Rollback rehearsal and post-deploy smoke test documented.
- [ ] Lab editor can update papers/news through a documented PR workflow.
- [ ] Source, runbooks, credits, and correct institutional contact remain accessible to future maintainers.

---

## 15. Proposed first PR and first Cursor task

**PR #1 title:** `chore: establish HMI website foundation, content contract, and quality gates`.

**Scope:** M0/M1 only, with no new HMI production homepage and no deployment to `hmi.iiitd.edu.in`. If M0 cannot be fully completed without IT information, create `M0-BLOCKERS.md` and proceed only with non-destructive local/staging scaffolding, clearly labeling M0 incomplete.

**First test cases to write before implementation:** (i) a `published: true` paper missing author order must fail; (ii) duplicate slug/DOI must fail; (iii) path helper must resolve `/hmi-lab-website/papers/...` on staging but `/papers/...` in production; (iv) static build must not ship draft content; (v) a fresh checkout can pass the documented scripts.

**Required response from Cursor:** concise plan → tests and red evidence → implementation → green evidence → screenshots/CI output → gate checklist → stop for human review. Cursor must not deploy production, alter DNS, or update the historic private repository.

---

## 16. Primary implementation references

- Historic HMI source (private, requires authorized access): https://github.com/hmi-iiitd/hmi-iiitd.github.io
- Existing production website: https://hmi.iiitd.edu.in/
- John Horton's data-driven academic website: https://github.com/johnjosephhorton/johnjosephhorton.github.io
- Stanford HCI: https://hci.stanford.edu/
- MIT HCI: https://hci.csail.mit.edu/
- MIT HCI Engineering: https://hcie.csail.mit.edu/
- Transitions: https://transitions.dev/
- MotionSites: https://motionsites.ai/
- GitHub Pages site creation: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
- GitHub Pages custom domain: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site
- Astro → GitHub Pages: https://docs.astro.build/en/guides/deploy/github/
- Playwright CI: https://playwright.dev/docs/ci
- Playwright accessibility tests: https://playwright.dev/docs/accessibility-testing
- WCAG 2.2: https://www.w3.org/TR/WCAG22/

---

**PRD change control:** A change affecting hosting, research claims, data schema, public content rights, accessibility, or core navigation must be recorded in an ADR and explicitly approved. A Cursor-generated convenience refactor is not authority to change product requirements.
