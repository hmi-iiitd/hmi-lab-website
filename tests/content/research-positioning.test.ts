import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import matter from "gray-matter";
import {
  APPLICATION_PATHWAYS_INTRO,
  APPLICATION_TAG_IDS,
  HERO_INTRODUCTION,
  HOMEPAGE_THEMES_INTRO,
  RESEARCH_PAGE_THEMES_LEDE,
  RESEARCH_PHILOSOPHY_LABEL,
  RESEARCH_PHILOSOPHY_PARAGRAPHS,
  RESEARCH_PHILOSOPHY_QUESTION,
} from "../../src/lib/identity";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

const THEME_SUMMARIES = {
  "perception-understanding":
    "How can interactive systems sense people, signals, and context well enough to interpret intent, affect, and situation?",
  "learning-coordination":
    "How do agents and people learn from one another and coordinate when beliefs and behaviors continually reshape each other?",
  "interaction-adaptation":
    "How should interfaces, robots, and assistive systems adapt in the moment so interaction remains usable, trustworthy, and humane?",
} as const;

describe("Research positioning content fidelity", () => {
  it("locks the approved homepage introduction", () => {
    expect(HERO_INTRODUCTION).toBe(
      "We study interactive intelligence: how intelligent systems perceive and understand people, other agents, and the physical world; learn and reason through interaction; and adapt their behaviour as interaction unfolds.",
    );
  });

  it("locks Research Philosophy copy and hierarchy constants", () => {
    expect(RESEARCH_PHILOSOPHY_LABEL).toBe("Research Philosophy");
    expect(RESEARCH_PHILOSOPHY_QUESTION).toBe("How does interaction shape intelligence?");
    expect(RESEARCH_PHILOSOPHY_PARAGRAPHS).toHaveLength(2);
    expect(RESEARCH_PHILOSOPHY_PARAGRAPHS[0]).toMatch(/other agents’ responses, physical settings/);
    expect(RESEARCH_PHILOSOPHY_PARAGRAPHS[1]).toMatch(/connected aspects of this ongoing feedback loop/);
  });

  it("keeps homepage themes intro concise and Research loop lede distinct", () => {
    expect(HOMEPAGE_THEMES_INTRO).toMatch(/organise the scientific portfolio/);
    expect(HOMEPAGE_THEMES_INTRO).not.toMatch(/feedback loop/);
    expect(RESEARCH_PAGE_THEMES_LEDE).toMatch(/connected aspects of an ongoing feedback loop/);
    expect(RESEARCH_PAGE_THEMES_LEDE).not.toBe(HOMEPAGE_THEMES_INTRO);
  });

  it("locks Application Pathways intro without adding a new application tag", () => {
    expect(APPLICATION_PATHWAYS_INTRO).toBe(
      "Our research applications span neurodevelopment, health, accessibility, social robotics, education, and embodied interaction with the physical world. These areas cut across our three scientific themes.",
    );
    expect(APPLICATION_TAG_IDS).not.toContain("embodied-interaction");
    const tagFiles = readdirSync(path.join(root, "src/content/application-tags")).filter((f) =>
      f.endsWith(".md"),
    );
    expect(tagFiles.some((f) => f.includes("embodied"))).toBe(false);
  });

  it("retains the three theme summaries verbatim", () => {
    for (const [id, summary] of Object.entries(THEME_SUMMARIES)) {
      const parsed = matter(
        readFileSync(path.join(root, `src/content/research-areas/${id}.md`), "utf8"),
      );
      expect(parsed.data.summary).toBe(summary);
    }
  });

  it("wires About page ordering: approved prose → philosophy → Minsky", () => {
    const about = readFileSync(path.join(root, "src/pages/about/index.astro"), "utf8");
    const prose = about.indexOf('id="about-approved-description"');
    const philosophy = about.indexOf("about-philosophy");
    const quote = about.indexOf("about-quote");
    expect(prose).toBeGreaterThan(-1);
    expect(philosophy).toBeGreaterThan(prose);
    expect(quote).toBeGreaterThan(philosophy);
    expect(about).toContain("RESEARCH_PHILOSOPHY_LABEL");
    expect(about).toContain("RESEARCH_PHILOSOPHY_QUESTION");
    expect(about).toMatch(/<h2[^>]*id="research-philosophy-title"/);
  });
});
