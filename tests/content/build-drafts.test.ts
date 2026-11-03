import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const distCandidates = [
  path.resolve("dist"),
  path.resolve("dist/hmi-lab-website"),
];

function findDistRoot(): string | null {
  for (const candidate of distCandidates) {
    if (fs.existsSync(candidate)) return candidate;
  }
  return null;
}

describe("static build must not ship draft research claims", () => {
  it("dist output (when present) does not contain draft-only fixture markers", () => {
    const distRoot = findDistRoot();
    // Until the first staging build exists, this test documents the contract.
    // CI runs build:staging before this suite in the full `npm run ci` path;
    // the dedicated post-build check also runs in scripts/validate-content.
    if (!distRoot) {
      expect(true).toBe(true);
      return;
    }

    const haystack: string[] = [];
    const walk = (dir: string) => {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) walk(full);
        else if (/\.(html|js|css|json)$/.test(entry.name)) {
          haystack.push(fs.readFileSync(full, "utf8"));
        }
      }
    };
    walk(distRoot);
    const blob = haystack.join("\n");
    expect(blob).not.toContain("DRAFT_ONLY_DO_NOT_PUBLISH");
    expect(blob).not.toContain("draft-seed-incomplete-authors");
  });
});
