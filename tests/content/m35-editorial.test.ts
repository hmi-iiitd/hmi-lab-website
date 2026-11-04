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

  it("features ESL, CHI HM, Sci Rep ADHD, and MobiTangibles in that order", () => {
    const dir = path.join(root, "src/content/publications");
    const pubs = readdirSync(dir)
      .filter((f) => f.endsWith(".md"))
      .map((f) => matter(readFileSync(path.join(dir, f), "utf8")).data);

    const featured = pubs
      .filter((p) => p.featured)
      .sort((a, b) => (a.featured_rank ?? 99) - (b.featured_rank ?? 99));

    expect(featured.map((p) => p.slug)).toEqual([
      "epistemic-social-learning",
      "social-robots-autism-care-india",
      "trial-pupil-dynamics-adhd",
      "mobitangibles",
    ]);

    const express = pubs.find((p) => p.slug === "express-ear");
    expect(express?.featured).toBe(false);
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
    expect(news).toMatch(/05 \/ News/);
    expect(community).not.toMatch(/03 \/ People/);
  });
});
