import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  HMI_RESEARCH_PROPOSITION,
  MINSKY_SOCIETY_OF_MIND,
  RESEARCH_PHILOSOPHY_PARAGRAPHS,
} from "../../src/lib/identity";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

const EXPECTED_PROPOSITION =
  "The question is not whether intelligent machines can interact, but whether intelligence for human worlds can emerge without interactional learning.";

describe("I4 About Research Philosophy proposition (RED→GREEN)", () => {
  it("exports the exact faculty-approved HMI research proposition", () => {
    expect(HMI_RESEARCH_PROPOSITION).toBe(EXPECTED_PROPOSITION);
    expect(HMI_RESEARCH_PROPOSITION).not.toBe(MINSKY_SOCIETY_OF_MIND.text);
  });

  it("keeps the two existing philosophy paragraphs unchanged", () => {
    expect(RESEARCH_PHILOSOPHY_PARAGRAPHS).toHaveLength(2);
    expect(RESEARCH_PHILOSOPHY_PARAGRAPHS[0]).toMatch(/other agents’ responses, physical settings/);
    expect(RESEARCH_PHILOSOPHY_PARAGRAPHS[1]).toMatch(/connected aspects of this ongoing feedback loop/);
  });

  it("About page integrates the proposition as philosophy prose after existing paragraphs", () => {
    const about = readFileSync(path.join(root, "src/pages/about/index.astro"), "utf8");
    expect(about).toContain("HMI_RESEARCH_PROPOSITION");
    expect(about).toMatch(/about-philosophy/);
    expect(about).toMatch(/programme statement|program statement|HMI programme/i);
    expect(about).toMatch(/inspired by.*Minsky|Minsky.?s (form|inquiry|question)/i);

    const philosophyStart = about.indexOf("about-philosophy");
    const propositionUse = about.indexOf("HMI_RESEARCH_PROPOSITION");
    const quoteStart = about.indexOf("about-quote");
    expect(propositionUse).toBeGreaterThan(philosophyStart);
    expect(propositionUse).toBeLessThan(quoteStart);

    // Must not place the proposition inside the Minsky figure/blockquote.
    const quoteBlock = about.slice(quoteStart);
    expect(quoteBlock).not.toContain("HMI_RESEARCH_PROPOSITION");
    expect(about.match(/about-quote/g)?.length).toBe(1);
  });

  it("does not place the proposition on homepage or Research index", () => {
    const homepage = readFileSync(path.join(root, "src/pages/index.astro"), "utf8");
    const research = readFileSync(path.join(root, "src/pages/research/index.astro"), "utf8");
    expect(homepage).not.toContain("HMI_RESEARCH_PROPOSITION");
    expect(research).not.toContain("HMI_RESEARCH_PROPOSITION");
    expect(homepage).not.toContain(EXPECTED_PROPOSITION);
    expect(research).not.toContain(EXPECTED_PROPOSITION);
  });
});
