import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  HERO_INTRODUCTION,
  PUNCHLINE,
  RESEARCH_IDENTITY,
} from "../../src/lib/identity";
import { SELECTED_RESEARCH_SLUGS } from "../../src/lib/publications";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

describe("I3 homepage identity hierarchy (RED→GREEN)", () => {
  it("homepage markup elevates Interactive Intelligence to H1 with punchline as secondary deck", () => {
    const homepage = readFileSync(path.join(root, "src/pages/index.astro"), "utf8");
    expect(homepage).toMatch(/RESEARCH_IDENTITY/);
    expect(homepage).toMatch(/PUNCHLINE/);
    expect(homepage).toMatch(/HERO_INTRODUCTION/);
    expect(homepage).toMatch(/id=["']hero-title["']/);
    expect(homepage).toMatch(/hero-deck|class=["'][^"']*deck/);
    // H1 must bind RESEARCH_IDENTITY, not wrap PUNCHLINE as the sole heading text.
    expect(homepage).toMatch(/<h1[^>]*>\{\s*RESEARCH_IDENTITY\s*\}<\/h1>/);
    expect(homepage).not.toMatch(/<h1[^>]*>Intelligence emerges/);
    expect(homepage).toMatch(/HOME_EYEBROW/);
  });

  it("keeps approved identity constants unchanged", () => {
    expect(RESEARCH_IDENTITY).toBe("Interactive Intelligence");
    expect(PUNCHLINE).toBe("Intelligence emerges through interaction.");
    expect(HERO_INTRODUCTION).toMatch(/We study interactive intelligence/);
  });

  it("does not disturb the I2 Selected Research allowlist", () => {
    expect([...SELECTED_RESEARCH_SLUGS]).toEqual([
      "epistemic-social-learning",
      "predictive-asd-acoustic-linguistic",
      "trial-pupil-dynamics-adhd",
      "social-robots-autism-care-india",
      "vr-flat-screen-gaming-responses",
      "emotion-recognition-eda",
      "express-ear",
    ]);
  });

  it("scopes W1 spacing refinements to homepage hero / Selected transition", () => {
    const css = readFileSync(path.join(root, "src/styles/components.css"), "utf8");
    expect(css).toMatch(/#hero\s*\{[\s\S]*padding-block/);
    expect(css).toMatch(/#hero\s+\.hero-bottom|#hero\s+\.hero-stack/);
    expect(css).toMatch(/#hero\s*\+\s*\.section|#selected-research/);
  });
});
