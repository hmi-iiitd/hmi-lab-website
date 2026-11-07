import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { describe, expect, it } from "vitest";
import { publicationDraftSchema } from "../../src/lib/content/schemas";
import { getApprovedPlainLanguageTldr } from "../../src/lib/plain-language-tldr";
import {
  collectDraftTldrLeakMarkers,
  leakWindowsFromText,
} from "../../src/lib/tldr-draft-leak";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const pubDir = path.join(root, "src/content/publications");

/** M421 §9 Phase B — seven Selected papers for T-B drafting. */
const TB_SLUGS = [
  "epistemic-social-learning",
  "predictive-asd-acoustic-linguistic",
  "trial-pupil-dynamics-adhd",
  "social-robots-autism-care-india",
  "vr-flat-screen-gaming-responses",
  "emotion-recognition-eda",
  "express-ear",
] as const;

function loadPub(slug: string) {
  const data = matter(readFileSync(path.join(pubDir, `${slug}.md`), "utf8")).data;
  const parsed = publicationDraftSchema.safeParse(data);
  expect(parsed.success, slug).toBe(true);
  return parsed.success ? parsed.data : data;
}

describe("T-B seven Selected TL;DR drafts (review-only)", () => {
  it("stores paper-grounded ai_assisted_draft summaries for exactly the seven Phase B slugs", () => {
    for (const slug of TB_SLUGS) {
      const pub = loadPub(slug);
      expect(pub.tldr_status, slug).toBe("ai_assisted_draft");
      expect(pub.plain_language_tldr?.trim().length, slug).toBeGreaterThan(0);
      const words = pub.plain_language_tldr!.trim().split(/\s+/).length;
      expect(words, `${slug} word count`).toBeGreaterThanOrEqual(30);
      expect(words, `${slug} word count`).toBeLessThanOrEqual(50);
      expect(pub.tldr_drafted_by, slug).toMatch(/T-B/);
      expect(pub.tldr_source_note?.trim().length, slug).toBeGreaterThan(0);
      expect(pub.tldr_status, slug).not.toBe("owner_approved");
    }
  });

  it("keeps getApprovedPlainLanguageTldr undefined for every T-B draft", () => {
    for (const slug of TB_SLUGS) {
      const pub = loadPub(slug);
      expect(getApprovedPlainLanguageTldr(pub), slug).toBeUndefined();
    }
  });

  it("does not mark any non-fixture real publication as owner_approved yet", () => {
    for (const name of readdirSync(pubDir).filter((f) => f.endsWith(".md"))) {
      const data = matter(readFileSync(path.join(pubDir, name), "utf8")).data;
      if (data.test_fixture) continue;
      expect(data.tldr_status ?? "missing", name).not.toBe("owner_approved");
    }
  });

  it("derives staging leak markers from current draft TL;DR text (no hard-coded phrases)", () => {
    const pubs = TB_SLUGS.map((slug) => loadPub(slug));
    const markers = collectDraftTldrLeakMarkers(pubs);
    expect(markers.length).toBeGreaterThanOrEqual(TB_SLUGS.length);

    for (const pub of pubs) {
      const windows = leakWindowsFromText(pub.plain_language_tldr!);
      expect(windows.length).toBeGreaterThan(0);
      for (const window of windows) {
        expect(markers, window).toContain(window);
      }
    }

    // Rewriting a draft must change the derived marker set.
    const rewritten = collectDraftTldrLeakMarkers([
      {
        ...pubs[0],
        plain_language_tldr:
          "REVISED_DRAFT_ONLY unique wording used solely to prove leak markers track rewrites.",
      },
    ]);
    expect(rewritten.some((m) => m.includes("REVISED_DRAFT_ONLY"))).toBe(true);
    expect(markers).not.toEqual(rewritten);

    const validateSrc = readFileSync(path.join(root, "scripts/validate-content.ts"), "utf8");
    expect(validateSrc).toMatch(/collectDraftTldrLeakMarkers/);
    expect(validateSrc).not.toMatch(/cutting post-switch regret about 26%/);
  });
});
