import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { describe, expect, it } from "vitest";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

describe("MVP production readiness — public placeholder freeze", () => {
  it("omits empty News and Projects placeholders from page templates", () => {
    const news = readFileSync(path.join(root, "src/components/NewsHighlights.astro"), "utf8");
    const research = readFileSync(path.join(root, "src/pages/research/index.astro"), "utf8");
    const community = readFileSync(
      path.join(root, "src/components/CommunityPreview.astro"),
      "utf8",
    );
    const people = readFileSync(path.join(root, "src/pages/people/index.astro"), "utf8");

    expect(news).not.toMatch(/Development placeholder/i);
    expect(news).not.toMatch(/explicitly non-production/i);
    expect(news).toMatch(/published\.length > 0/);

    expect(research).not.toMatch(/No verified project pages yet/i);
    expect(research).toMatch(/projects\.length > 0/);

    expect(community).not.toMatch(/after verification and photo permissions/i);
    expect(people).not.toMatch(/\bM5\b/);
    expect(people).not.toMatch(/Placeholder drafts stay out/i);
  });

  it("publishes only the verified director people profile without portrait permission", () => {
    const peopleDir = path.join(root, "src/content/people");
    const published = readdirSync(peopleDir)
      .filter((f) => f.endsWith(".md"))
      .map((name) => matter(readFileSync(path.join(peopleDir, name), "utf8")).data)
      .filter((row) => row.published);

    expect(published).toHaveLength(1);
    expect(published[0].slug).toBe("jainendra-shukla");
    expect(published[0].role).toBe("director");
    expect(published[0].name).toMatch(/Jainendra Shukla/);
    expect(published[0].image_permission).toBe("none");
    expect(published[0].email ?? null).toBeFalsy();
  });

  it("ships an institutional Apache redirect map for Variant B cutover", () => {
    const htaccess = readFileSync(path.join(root, "public/.htaccess"), "utf8");
    expect(htaccess).toContain("publication\\.html");
    expect(htaccess).toContain("team\\.html");
    expect(htaccess).toContain("project\\.html");
    expect(htaccess).toContain("ExpressEar\\.html");
  });
});
