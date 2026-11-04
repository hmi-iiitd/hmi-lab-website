import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const tokens = readFileSync(path.join(root, "src/styles/tokens.css"), "utf8");

function relativeLuminance(hex: string): number {
  const h = hex.replace("#", "");
  const rgb = [0, 2, 4].map((i) => {
    const c = Number.parseInt(h.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * rgb[0]! + 0.7152 * rgb[1]! + 0.0722 * rgb[2]!;
}

function contrastRatio(fg: string, bg: string): number {
  const l1 = relativeLuminance(fg);
  const l2 = relativeLuminance(bg);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

describe("M3.5 typography and contrast tokens", () => {
  it("defines semantic type-scale tokens", () => {
    for (const token of [
      "--text-display",
      "--text-h1",
      "--text-h2",
      "--text-h3",
      "--text-pub-title",
      "--text-body",
      "--text-lead",
      "--text-secondary",
      "--text-nav",
      "--text-ui",
      "--text-meta",
      "--text-label",
      "--text-control",
      "--text-footer",
      "--text-app-title",
      "--text-app-body",
      "--text-app-lead",
      "--text-about",
    ]) {
      expect(tokens).toContain(token);
    }
  });

  it("meets WCAG AA contrast for primary/secondary text on paper backgrounds", () => {
    expect(contrastRatio("#1c3437", "#f8f7f3")).toBeGreaterThanOrEqual(7);
    expect(contrastRatio("#1c3437", "#fefdf9")).toBeGreaterThanOrEqual(7);
    expect(contrastRatio("#556663", "#f8f7f3")).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio("#1f6a63", "#f8f7f3")).toBeGreaterThanOrEqual(4.5);
  });

  it("keeps control borders stronger than decorative lines", () => {
    expect(tokens).toMatch(/--color-control-border:\s*#748781/i);
    expect(contrastRatio("#748781", "#fefdf9")).toBeGreaterThanOrEqual(3);
  });
});
