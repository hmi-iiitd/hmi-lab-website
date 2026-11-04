import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const brandDir = path.join(root, "public/brand");

const REQUIRED = [
  "logo-master.jpg",
  "logo.png",
  "logo-header.png",
  "logo-footer.png",
  "favicon.ico",
  "favicon-16.png",
  "favicon-32.png",
  "favicon-48.png",
  "apple-touch-icon.png",
  "og-image.png",
] as const;

function pngSize(filePath: string): { width: number; height: number } {
  const buf = readFileSync(filePath);
  expect(buf[0]).toBe(0x89);
  expect(buf.toString("ascii", 1, 4)).toBe("PNG");
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

describe("M3.5 official HMI logo assets", () => {
  it("ships required self-contained brand files (no historic-repo dependency)", () => {
    for (const name of REQUIRED) {
      const filePath = path.join(brandDir, name);
      expect(existsSync(filePath), name).toBe(true);
      expect(statSync(filePath).size).toBeGreaterThan(200);
    }
  });

  it("preserves near-square lockup aspect for header/footer logos", () => {
    const header = pngSize(path.join(brandDir, "logo-header.png"));
    const footer = pngSize(path.join(brandDir, "logo-footer.png"));
    const headerRatio = header.width / header.height;
    const footerRatio = footer.width / footer.height;
    expect(headerRatio).toBeGreaterThan(1.05);
    expect(headerRatio).toBeLessThan(1.25);
    expect(footerRatio).toBeGreaterThan(1.05);
    expect(footerRatio).toBeLessThan(1.25);
  });

  it("provides square favicon / apple-touch derivatives", () => {
    for (const name of ["favicon-16.png", "favicon-32.png", "apple-touch-icon.png"] as const) {
      const { width, height } = pngSize(path.join(brandDir, name));
      expect(width).toBe(height);
    }
  });

  it("provides a 1200×630 social image", () => {
    expect(pngSize(path.join(brandDir, "og-image.png"))).toEqual({
      width: 1200,
      height: 630,
    });
  });

  it("records provenance for the approved historic source", () => {
    const provenance = JSON.parse(
      readFileSync(path.join(root, "docs/brand/logo-provenance.json"), "utf8"),
    );
    expect(provenance.approved_source.historic_path).toBe("images/logo/logo_new.jpg");
    expect(provenance.inspected_alternate.historic_path).toBe("images/logo/logo.png");
    expect(String(provenance.inspected_alternate.role)).toMatch(/not used/i);
  });
});
