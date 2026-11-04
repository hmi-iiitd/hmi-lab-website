import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import matter from "gray-matter";
import { PRIMARY_THEME_IDS, PRIMARY_THEME_TITLES } from "../../src/lib/identity";
import { isPublicPublication, type PubEntry } from "../../src/lib/publications";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

function loadPubs(): PubEntry[] {
  const dir = path.join(root, "src/content/publications");
  return readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const parsed = matter(readFileSync(path.join(dir, f), "utf8"));
      return { id: f, data: parsed.data, body: parsed.content, collection: "publications", render: async () => ({}) } as unknown as PubEntry;
    });
}

describe("M4.1 research theme pages", () => {
  it("defines a dynamic research theme route module", () => {
    const page = path.join(root, "src/pages/research/[slug].astro");
    expect(readFileSync(page, "utf8")).toMatch(/getStaticPaths/);
    expect(readFileSync(page, "utf8")).toMatch(/PRIMARY_THEME_IDS|research-areas/);
  });

  it("keeps exactly three primary themes with stable titles", () => {
    expect(PRIMARY_THEME_IDS).toHaveLength(3);
    for (const id of PRIMARY_THEME_IDS) {
      const file = path.join(root, `src/content/research-areas/${id}.md`);
      const parsed = matter(readFileSync(file, "utf8"));
      expect(parsed.data.published).toBe(true);
      expect(parsed.data.slug).toBe(id);
      expect(parsed.data.title).toBe(PRIMARY_THEME_TITLES[id]);
    }
  });

  it("includes accepted ESL under Learning & Coordination as a public record", () => {
    const pubs = loadPubs().filter(isPublicPublication);
    const esl = pubs.find((p) => p.data.slug === "epistemic-social-learning");
    expect(esl).toBeTruthy();
    expect(esl!.data.status).toBe("accepted");
    expect(esl!.data.research_areas).toContain("learning-coordination");
  });

  it("wires homepage and research index to theme detail URLs", () => {
    const homepageThemes = readFileSync(
      path.join(root, "src/components/ResearchThemes.astro"),
      "utf8",
    );
    const researchIndex = readFileSync(path.join(root, "src/pages/research/index.astro"), "utf8");
    expect(homepageThemes).toMatch(/research\/\$\{theme\.data\.slug\}|research\/\$\{.*slug/);
    expect(researchIndex).toMatch(/research\/\$\{theme\.data\.slug\}|research\/\$\{.*slug/);
  });
});
