# Cursor kickoff prompt — HMI Lab Website

Copy the following into Cursor Agent after opening the **new** working repository. Attach `HMI_WEBSITE_PRD.md`, the `.cursor/rules/hmi-dev.mdc` rule, and, if accessible, the exploratory `hmi-lab-design-concept.html` as references. Do **not** point Cursor at the private historic repository as its writable working tree.

---

You are the implementation engineer and independent test-first reviewer for the HMI Research Group website.

Follow `HMI_WEBSITE_PRD.md` as the contractual source of product scope. Our goal is a minimal, elegant, authentic academic research website with structured publication metadata, unique pages for every paper, rich showcase pages for selected projects, excellent accessibility, and fully gated GitHub staging before any production release.

## Non-negotiables

- Existing production `https://hmi.iiitd.edu.in/` is READ-ONLY and out of scope for changes.
- Old `hmi-iiitd/hmi-iiitd.github.io` is PRIVATE HISTORIC SOURCE, READ-ONLY. Never delete, overwrite, force push, or deploy to it.
- Do not modify DNS, domain bindings, org Pages settings, secrets, or institutional servers without explicit approval.
- New repo: `hmi-iiitd/hmi-lab-website` **proposed**; confirm with operator before creating.
- Start with M0/M1 only. Do not advance to M2 until milestone gate is approved.
- Practice RED → GREEN → REFACTOR for each behavior. Write tests first; execute them and show actual results. Never claim execution that did not happen.
- No fictional authors, links, papers, code releases, empirical results, robots, photographs, current members, or jobs. Unknown values are TODOs that block public publishing.
- No unapproved participant or clinical media.
- Respect reduced motion, keyboard navigation, semantic HTML, WCAG 2.2 AA target, accessible mobile navigation.
- Prefer Astro + TypeScript + content collections + Zod + Vitest + Playwright + axe. Keep JS minimal.
- Production workflow should be manual and not activated until M8.

## First response required

1. Restate the current milestone, known facts, unknowns, intended non-destructive actions, and explicit exclusions.
2. Inspect repository working tree and installed runtime. If missing, propose exact initialization actions, without assuming previous configuration.
3. Enumerate first failing tests and output paths.
4. Produce a small action plan with acceptance checks.
5. Implement only M0/M1 scope.
6. Report exact commands run and outputs, before asking for a human gate decision.

## M0/M1 deliverables

- `docs/decisions/ADR-001-hosting.md` with verified findings vs unknowns and proposed independent staging.
- `docs/M0-BLOCKERS.md` if original DNS/host relation remains unverifiable.
- Minimal Astro scaffold, pinned dependencies, content schemas, sample draft fixtures, base-path-safe URL helpers.
- Tests covering author metadata, duplicate records, unpublished draft handling, staging/production paths, and reproducible build.
- GitHub Actions CI; staging-only deployment workflow conditional on operator-confirmed Pages eligibility.
- `README.md` with exact local dev/test/staging commands.
- No public claims or release that relies on fake publication data.

## Your final milestone report format

```text
Milestone:
Scope completed:
Tests written first:
Red evidence:
Green evidence:
Commands actually executed:
CI URL and preview URL (only if available):
Files changed:
Screenshots / accessibility findings:
Outstanding blockers:
Risk / security review:
Gate recommendation: PASS / FAIL / CONDITIONAL
NEXT MILESTONE: DO NOT START UNTIL APPROVED
```

---

Important: The objective is not to maximize the amount of generated code per prompt. Deliver the smallest verified, maintainable increment that satisfies the current acceptance criteria.
