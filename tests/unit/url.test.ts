import { describe, expect, it } from "vitest";
import { isStagingBase, normalizeBase, paperPath, withBase } from "../../src/lib/url";

describe("URL helpers (base-path safe)", () => {
  it("resolves paper paths under staging base /hmi-lab-website/", () => {
    expect(paperPath("epistemic-social-learning", "/hmi-lab-website/")).toBe(
      "/hmi-lab-website/papers/epistemic-social-learning/",
    );
    expect(withBase("/papers/foo/", "/hmi-lab-website/")).toBe(
      "/hmi-lab-website/papers/foo/",
    );
  });

  it("resolves paper paths at production root /", () => {
    expect(paperPath("epistemic-social-learning", "/")).toBe(
      "/papers/epistemic-social-learning/",
    );
    expect(withBase("papers/foo/", "/")).toBe("/papers/foo/");
  });

  it("normalizes base variants without hardcoding hosts", () => {
    expect(normalizeBase("hmi-lab-website")).toBe("/hmi-lab-website/");
    expect(normalizeBase("/hmi-lab-website")).toBe("/hmi-lab-website/");
    expect(isStagingBase("/hmi-lab-website/")).toBe(true);
    expect(isStagingBase("/")).toBe(false);
  });
});
