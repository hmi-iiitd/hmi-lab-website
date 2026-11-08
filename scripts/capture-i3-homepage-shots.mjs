import { chromium } from "@playwright/test";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "docs/milestone-evidence/i3-screenshots");
const base = process.env.SHOT_BASE_URL ?? "http://127.0.0.1:4330/hmi-lab-website/";
const prefix = process.env.SHOT_PREFIX ?? "after";

const viewports = [
  { name: "320", width: 320, height: 2800 },
  { name: "390", width: 390, height: 3000 },
  { name: "768", width: 768, height: 2600 },
  { name: "1024", width: 1024, height: 2400 },
  { name: "1440", width: 1440, height: 2200 },
];

const targets = [
  { key: "hero", selector: "#hero" },
  { key: "hero-to-selected", selector: "#hero, #selected-research", clipTransition: true },
  { key: "esl-feature", selector: "#selected-research article.feature" },
  { key: "selected", selector: "#selected-research" },
];

const browser = await chromium.launch();
for (const vp of viewports) {
  const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
  await page.goto(base, { waitUntil: "networkidle" });

  for (const target of targets) {
    if (target.clipTransition) {
      const hero = page.locator("#hero");
      const selected = page.locator("#selected-research");
      await hero.scrollIntoViewIfNeeded();
      const heroBox = await hero.boundingBox();
      const selectedBox = await selected.boundingBox();
      if (!heroBox || !selectedBox) continue;
      const x = Math.min(heroBox.x, selectedBox.x);
      const y = heroBox.y;
      const width = Math.max(heroBox.width, selectedBox.width);
      const height = selectedBox.y + Math.min(selectedBox.height, 420) - heroBox.y;
      await page.screenshot({
        path: path.join(outDir, `${prefix}-hero-to-selected-${vp.name}.png`),
        clip: {
          x: Math.max(0, x),
          y: Math.max(0, y),
          width,
          height: Math.max(200, height),
        },
      });
      continue;
    }

    const el = page.locator(target.selector).first();
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(150);
    await el.screenshot({
      path: path.join(outDir, `${prefix}-${target.key}-${vp.name}.png`),
    });
  }
  await page.close();
  console.log("viewport done", vp.name);
}
await browser.close();
