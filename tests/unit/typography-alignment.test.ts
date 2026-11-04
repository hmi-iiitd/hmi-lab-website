import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const tokens = readFileSync(path.join(root, "src/styles/tokens.css"), "utf8");
const components = readFileSync(path.join(root, "src/styles/components.css"), "utf8");
const styles = `${tokens}\n${components}`;

describe("M3.5 typography alignment refinement", () => {
  it("defaults to left-aligned text and never uses justify", () => {
    expect(styles).not.toMatch(/text-align\s*:\s*justify/i);
    expect(tokens).toMatch(/body\s*\{[^}]*text-align\s*:\s*start/s);
  });

  it("widens the About prose measure to 44–46rem", () => {
    const match = tokens.match(/--measure-prose:\s*([\d.]+)rem/);
    expect(match).not.toBeNull();
    const rem = Number.parseFloat(match![1]!);
    expect(rem).toBeGreaterThanOrEqual(44);
    expect(rem).toBeLessThanOrEqual(46);
  });

  it("sizes Application Pathways for readable scientific content", () => {
    expect(components).toMatch(
      /\.application-chip-title\s*\{[^}]*font-size:\s*var\(--text-app-title\)/s,
    );
    expect(components).toMatch(
      /\.application-chip-summary\s*\{[^}]*font-size:\s*var\(--text-app-body\)/s,
    );
    expect(components).toMatch(
      /#application-pathways\s+\.section-intro\s*\{[^}]*font-size:\s*var\(--text-app-lead\)/s,
    );
    expect(tokens).toMatch(/--text-app-title:\s*clamp\(/);
    expect(tokens).toMatch(/--text-app-body:\s*clamp\(/);
    expect(tokens).toMatch(/--text-app-lead:\s*clamp\(/);
    expect(components).toMatch(
      /\.application-chip-summary\s*\{[^}]*line-height:\s*(1\.5[5-9]|1\.6(?:[0-5])?)\b/s,
    );
  });

  it("raises About body paragraphs above the previous body floor", () => {
    expect(components).toMatch(
      /\.about-prose\s+p\s*\{[^}]*font-size:\s*var\(--text-about\)/s,
    );
    expect(tokens).toMatch(/--text-about:\s*clamp\(/);
    // Desktop peak ~19–20px; mobile floor ~18px
    expect(tokens).toMatch(/--text-about:[^;]*1\.125rem/);
    expect(tokens).toMatch(/--text-about:[^;]*1\.2(?:5)?rem/);
  });

  it("keeps meaningful secondary content on --text-secondary or larger", () => {
    expect(components).toMatch(
      /\.pub\s+\.venue,\s*\n\s*\.pub\s+\.authors\s*\{[^}]*font-size:\s*var\(--text-secondary\)/s,
    );
    expect(components).toMatch(
      /\.direction\s+p\s*\{[^}]*font-size:\s*var\(--text-secondary\)/s,
    );
    expect(components).toMatch(
      /\.paper-page\s+\.paper-authors,\s*\n\s*\.paper-page\s+\.paper-venue\s*\{[^}]*font-size:\s*var\(--text-secondary\)/s,
    );
  });
});
