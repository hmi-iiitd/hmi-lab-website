# HMI Website — Cursor implementation bundle

## Files

1. `HMI_WEBSITE_PRD.md` — the detailed product and implementation specification, including milestone gates M0–M9.
2. `CURSOR_KICKOFF_PROMPT.md` — copy/paste starting prompt for Cursor Agent.
3. `.cursor/rules/hmi-dev.mdc` — persistent engineering rules for Cursor.
4. `REFERENCE_DESIGN_CONCEPT.html` — existing exploratory design reference. It is **not** a publishable research website and contains conceptual SVG illustrations.

## Suggested first actions

1. Read `HMI_WEBSITE_PRD.md` fully and identify questions that only IIIT-Delhi's site administrator can answer.
2. Create a NEW repository and commit these docs. Do not replace the original private GitHub repository or change the existing institutional domain.
3. Open the new repo in Cursor, ensure `.cursor/rules/hmi-dev.mdc` is picked up, and submit the kickoff prompt.
4. Work through M0 and M1 as small PRs with actual red/green test evidence.
5. Host the new static site at an authorized GitHub Pages **project** staging URL; validate base-path behavior.
6. Obtain explicit release approval for later production deployment. No DNS changes until M8.

## Important

The historic HMI repository `hmi-iiitd/hmi-iiitd.github.io` is currently private with GitHub Pages disabled and a last recorded push in May 2023. The relationship between it and the institute's currently live site has not been established. Resolving this is an M0 milestone blocker, not a reason to experiment on production.

Publication seed records must be verified against the accepted manuscript, proceedings and official author lists, not invented from the design mockup.
