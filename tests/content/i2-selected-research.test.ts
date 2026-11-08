import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { describe, expect, it } from "vitest";
import { getApprovedPlainLanguageTldr } from "../../src/lib/plain-language-tldr";
import { publicationDraftSchema } from "../../src/lib/content/schemas";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const pubDir = path.join(root, "src/content/publications");

const EXPECTED_ORDER = [
  "epistemic-social-learning",
  "predictive-asd-acoustic-linguistic",
  "trial-pupil-dynamics-adhd",
  "social-robots-autism-care-india",
  "vr-flat-screen-gaming-responses",
  "emotion-recognition-eda",
  "express-ear",
] as const;

function loadPubs() {
  return readdirSync(pubDir)
    .filter((f) => f.endsWith(".md"))
    .map((name) => {
      const data = matter(readFileSync(path.join(pubDir, name), "utf8")).data;
      expect(publicationDraftSchema.safeParse(data).success, name).toBe(true);
      return data;
    });
}

describe("I2 Selected Research seven-paper membership (RED→GREEN)", () => {
  it("features exactly the seven faculty Selected papers in approved rank order", () => {
    const featured = loadPubs()
      .filter((p) => p.featured && !p.test_fixture)
      .sort((a, b) => (a.featured_rank ?? 99) - (b.featured_rank ?? 99));

    expect(featured.map((p) => p.slug)).toEqual([...EXPECTED_ORDER]);
    featured.forEach((p, i) => {
      expect(p.featured_rank, p.slug).toBe(i + 1);
      expect(getApprovedPlainLanguageTldr(p), p.slug).toBeTruthy();
    });
  });

  it("removes MobiTangibles from Selected membership while keeping the archive record", () => {
    const mobi = loadPubs().find((p) => p.slug === "mobitangibles");
    expect(mobi).toBeTruthy();
    expect(mobi?.featured).toBe(false);
    expect(mobi?.featured_rank).toBeUndefined();
    expect(mobi?.published).toBe(true);
    expect(mobi?.verification_status).toBe("verified");
  });

  it("SelectedResearch uses an allowlisted seven-paper helper and six-card grid", () => {
    const src = readFileSync(path.join(root, "src/components/SelectedResearch.astro"), "utf8");
    const pubsSrc = readFileSync(path.join(root, "src/lib/publications.ts"), "utf8");

    expect(pubsSrc).toMatch(/SELECTED_RESEARCH_SLUGS/);
    expect(pubsSrc).toMatch(/selectedResearchPublications/);
    expect(pubsSrc).toMatch(/epistemic-social-learning/);
    expect(pubsSrc).toMatch(/express-ear/);

    expect(src).toMatch(/selectedResearchPublications/);
    expect(src).toMatch(/slice\(\s*1\s*,\s*7\s*\)/);
    expect(src).not.toMatch(/featured\.slice\(\s*1\s*,\s*4\s*\)/);
    expect(src).not.toMatch(/featuredPublications/);
  });

  it("suppresses CHI Honorable Mention promo in Selected Research while D9 remains gated", () => {
    const src = readFileSync(path.join(root, "src/components/SelectedResearch.astro"), "utf8");
    expect(src).not.toMatch(/data\.award/);
    expect(src).not.toMatch(/Honorable Mention/);

    const chi = loadPubs().find((p) => p.slug === "social-robots-autism-care-india");
    expect(chi?.award).toMatch(/Honorable Mention/i);
  });

  it("retires the decorative ESL schematic from Selected Research", () => {
    const src = readFileSync(path.join(root, "src/components/SelectedResearch.astro"), "utf8");
    expect(src).not.toMatch(/feature-viz/);
    expect(src).not.toMatch(/Decorative schematic/);
  });

  it("gives ASD and ADHD elevated compact-card emphasis classes", () => {
    const src = readFileSync(path.join(root, "src/components/SelectedResearch.astro"), "utf8");
    expect(src).toMatch(/mini-card--elevated/);
  });
});
