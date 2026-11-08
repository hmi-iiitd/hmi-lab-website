import { chromium } from "@playwright/test";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "docs/milestone-evidence/i2-screenshots");
const base = process.env.SHOT_BASE_URL ?? "http://127.0.0.1:4323/hmi-lab-website/";
const prefix = process.env.SHOT_PREFIX ?? "after-selected";

const viewports = [
  { name: "desktop", width: 1440, height: 2200 },
  { name: "tablet", width: 768, height: 2400 },
  { name: "mobile", width: 390, height: 3200 },
];

const browser = await chromium.launch();
for (const vp of viewports) {
  const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
  await page.goto(base, { waitUntil: "networkidle" });
  const selected = page.locator("#selected-research");
  await selected.scrollIntoViewIfNeeded();
  await page.waitForTimeout(200);
  const target = path.join(outDir, `${prefix}-${vp.name}.png`);
  await selected.screenshot({ path: target });
  console.log("wrote", target);
  await page.close();
}
await browser.close();
