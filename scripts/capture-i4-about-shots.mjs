import { chromium } from "@playwright/test";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "docs/milestone-evidence/i4-screenshots");
const base = process.env.SHOT_BASE_URL ?? "http://127.0.0.1:4340/hmi-lab-website/about/";
const prefix = process.env.SHOT_PREFIX ?? "after";

const viewports = [
  { name: "desktop", width: 1440, height: 1800 },
  { name: "mobile", width: 390, height: 2400 },
];

const browser = await chromium.launch();
for (const vp of viewports) {
  const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
  await page.goto(base, { waitUntil: "networkidle" });

  const philosophy = page.locator(".about-philosophy");
  const quote = page.locator(".about-quote");
  await philosophy.scrollIntoViewIfNeeded();
  await page.waitForTimeout(150);
  await philosophy.screenshot({
    path: path.join(outDir, `${prefix}-philosophy-${vp.name}.png`),
  });

  // Combined philosophy + Minsky: pin philosophy to viewport top so the epigraph stays on-screen.
  await page.evaluate(() => {
    const philosophyEl = document.querySelector(".about-philosophy");
    if (!philosophyEl) return;
    const y = philosophyEl.getBoundingClientRect().top + window.scrollY - 24;
    window.scrollTo(0, Math.max(0, y));
  });
  await page.waitForTimeout(120);
  const viewClip = await page.evaluate(() => {
    const philosophyEl = document.querySelector(".about-philosophy");
    const quoteEl = document.querySelector(".about-quote");
    if (!philosophyEl || !quoteEl) return null;
    const a = philosophyEl.getBoundingClientRect();
    const b = quoteEl.getBoundingClientRect();
    const left = Math.min(a.left, b.left);
    const top = Math.min(a.top, b.top);
    const right = Math.max(a.right, b.right);
    const bottom = Math.max(a.bottom, b.bottom);
    return {
      x: Math.max(0, left),
      y: Math.max(0, top),
      width: right - left,
      height: bottom - top + 16,
    };
  });
  if (viewClip) {
    await page.screenshot({
      path: path.join(outDir, `${prefix}-philosophy-and-minsky-${vp.name}.png`),
      clip: viewClip,
    });
  }

  await quote.scrollIntoViewIfNeeded();
  await quote.screenshot({ path: path.join(outDir, `${prefix}-minsky-${vp.name}.png`) });
  await page.close();
  console.log("viewport done", vp.name);
}
await browser.close();
