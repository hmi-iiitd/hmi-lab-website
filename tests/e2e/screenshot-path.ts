import fs from "node:fs";
import path from "node:path";

/**
 * Runtime screenshot output for Playwright.
 * Historical milestone PNGs under docs/milestone-evidence/ are frozen evidence and
 * must not be overwritten by subsequent CI/local runs.
 */
export function runtimeScreenshotDir(): string {
  const configured = process.env.PLAYWRIGHT_SCREENSHOT_DIR;
  const dir = configured
    ? path.resolve(configured)
    : path.resolve("test-results/screenshots");
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

export function runtimeScreenshotPath(filename: string): string {
  return path.join(runtimeScreenshotDir(), filename);
}

/** Committed historical evidence — assert existence only; never write here from tests. */
export function historicalEvidencePath(filename: string): string {
  return path.resolve("docs/milestone-evidence", filename);
}
