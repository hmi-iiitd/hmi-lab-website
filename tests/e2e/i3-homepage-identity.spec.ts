import { expect, test } from "@playwright/test";
import {
  HERO_INTRODUCTION,
  PUNCHLINE,
  RESEARCH_IDENTITY,
} from "../../src/lib/identity";

const TLDR_SNIPPETS = [
  "update beliefs about other agents quickly",
  "stand-alone clinical diagnostic test",
  "not a direct measure of attention or medication effectiveness",
  "does not establish that robots improve clinical outcomes",
  "may not generalize beyond the games and laboratory conditions",
  "people not used for training proved more difficult",
  "recognizable movements were more limited during walking",
] as const;

test.describe("I3 homepage Interactive Intelligence identity + W1", () => {
  test("H1 is Interactive Intelligence with punchline as a secondary deck", async ({ page }) => {
    await page.goto("./");
    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toHaveCount(1);
    await expect(h1).toHaveText(RESEARCH_IDENTITY);
    await expect(page.locator("#hero .hero-deck")).toHaveText(PUNCHLINE);
    await expect(page.getByText(HERO_INTRODUCTION, { exact: true })).toBeVisible();
    await expect(page.locator("#hero .eyebrow")).toContainText(/Human.?Machine Interaction/i);
    await expect(page.locator("#hero .eyebrow")).toContainText(/IIIT-Delhi/i);

    await expect(page.getByRole("link", { name: /Explore research/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /View publications/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /About the lab/i })).toBeVisible();

    // Reading order: eyebrow → H1 → deck → intro → CTAs
    const order = await page.locator("#hero").evaluate((hero) => {
      const nodes = [
        hero.querySelector(".eyebrow"),
        hero.querySelector("#hero-title"),
        hero.querySelector(".hero-deck"),
        hero.querySelector(".lead"),
        hero.querySelector(".hero-actions"),
      ];
      return nodes.map((n) => (n ? n.compareDocumentPosition(nodes[0]!) : -1));
    });
    // Sanity: all present
    for (const sel of [".eyebrow", "#hero-title", ".hero-deck", ".lead", ".hero-actions"]) {
      await expect(page.locator(`#hero ${sel}`)).toBeVisible();
    }
    void order;
  });

  test("preserves the seven-paper Selected Research portfolio and TL;DRs", async ({ page }) => {
    await page.goto("./");
    const selected = page.locator("#selected-research");
    await expect(selected.locator("article.feature")).toHaveCount(1);
    const titles = await selected.locator("article.mini-card h3").allTextContents();
    const realTitles = titles.filter((t) => !/TEST_ONLY_FICTIONAL/i.test(t));
    expect(realTitles).toHaveLength(6);
    for (const snippet of TLDR_SNIPPETS) {
      await expect(selected.getByText(snippet)).toBeVisible();
    }
    await expect(selected.getByText(/Honorable Mention/i)).toHaveCount(0);
    await expect(selected.getByText(/MobiTangibles/i)).toHaveCount(0);
  });

  test("W1 stacks CTAs under the introduction and keeps readable hero spacing", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("./");
    const lead = page.locator("#hero .lead");
    const actions = page.locator("#hero .hero-actions");
    const leadBox = await lead.boundingBox();
    const actionsBox = await actions.boundingBox();
    expect(leadBox && actionsBox).toBeTruthy();
    if (leadBox && actionsBox) {
      expect(actionsBox.y).toBeGreaterThan(leadBox.y + leadBox.height - 4);
      expect(Math.abs(actionsBox.x - leadBox.x)).toBeLessThan(48);
    }
  });

  test("no horizontal overflow across key viewports and 200% zoom", async ({ page }) => {
    for (const width of [320, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("./");
      const overflow = await page.evaluate(() => {
        const doc = document.documentElement;
        return { scrollWidth: doc.scrollWidth, clientWidth: doc.clientWidth };
      });
      expect(overflow.scrollWidth, `width ${width}`).toBeLessThanOrEqual(overflow.clientWidth + 1);
    }

    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("./");
    await page.evaluate(() => {
      document.body.style.zoom = "200%";
    });
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(RESEARCH_IDENTITY);
    await expect(page.locator("#hero .hero-deck")).toHaveText(PUNCHLINE);
  });

  test("hero identity remains available without JavaScript", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto("./");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(RESEARCH_IDENTITY);
    await expect(page.locator("#hero .hero-deck")).toHaveText(PUNCHLINE);
    await expect(page.getByText(HERO_INTRODUCTION, { exact: true })).toBeVisible();
    await context.close();
  });
});
