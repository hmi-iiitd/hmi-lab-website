import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import matter from "gray-matter";
import { MINSKY_SOCIETY_OF_MIND } from "../../src/lib/identity";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

describe("M3.5 editorial corrections", () => {
  it("uses the faculty-supplied Minsky emotion quotation at §16.1 p.163", () => {
    expect(MINSKY_SOCIETY_OF_MIND.section).toBe("16.1");
    expect(MINSKY_SOCIETY_OF_MIND.page).toBe(163);
    expect(MINSKY_SOCIETY_OF_MIND.text).toMatch(
      /whether intelligent machines can have any emotions/i,
    );
    expect(MINSKY_SOCIETY_OF_MIND.text).not.toMatch(/magical trick/i);
  });

  it("features the I2 seven-paper Selected set and keeps MobiTangibles archival", () => {
    const dir = path.join(root, "src/content/publications");
    const pubs = readdirSync(dir)
      .filter((f) => f.endsWith(".md"))
      .map((f) => matter(readFileSync(path.join(dir, f), "utf8")).data);

    const featured = pubs
      .filter((p) => p.featured && !p.test_fixture)
      .sort((a, b) => (a.featured_rank ?? 99) - (b.featured_rank ?? 99));

    expect(featured.map((p) => p.slug)).toEqual([
      "epistemic-social-learning",
      "predictive-asd-acoustic-linguistic",
      "trial-pupil-dynamics-adhd",
      "social-robots-autism-care-india",
      "vr-flat-screen-gaming-responses",
      "emotion-recognition-eda",
      "express-ear",
    ]);

    const mobi = pubs.find((p) => p.slug === "mobitangibles");
    expect(mobi?.featured).toBe(false);
  });

  it("keeps homepage section numbers unique and sequential", () => {
    const community = readFileSync(
      path.join(root, "src/components/CommunityPreview.astro"),
      "utf8",
    );
    const news = readFileSync(path.join(root, "src/components/NewsHighlights.astro"), "utf8");
    const apps = readFileSync(
      path.join(root, "src/components/ApplicationPathways.astro"),
      "utf8",
    );
    expect(apps).toMatch(/03 \/ Application/);
    expect(community).toMatch(/04 \/ People/);
    // News label remains 05 when the section is rendered; empty news omits the section.
    expect(news).toMatch(/05 \/ News/);
    expect(news).not.toMatch(/Development placeholder/i);
    expect(community).not.toMatch(/03 \/ People/);
  });
});
