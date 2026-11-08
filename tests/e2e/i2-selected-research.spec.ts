import { expect, test } from "@playwright/test";
import { PUNCHLINE } from "../../src/lib/identity";

const SELECTED_ORDER = [
  { slug: "epistemic-social-learning", title: /Epistemic Social Learning/i },
  { slug: "predictive-asd-acoustic-linguistic", title: /ASD Identification/i },
  { slug: "trial-pupil-dynamics-adhd", title: /pupil dynamics/i },
  { slug: "social-robots-autism-care-india", title: /social robots for Autism Care in India/i },
  { slug: "vr-flat-screen-gaming-responses", title: /Virtual Reality and Flat Screen Gaming/i },
  { slug: "emotion-recognition-eda", title: /Electrodermal Activity/i },
  { slug: "express-ear", title: /ExpressEar/i },
] as const;

const TLDR_SNIPPETS = [
  "update beliefs about other agents quickly",
  "stand-alone clinical diagnostic test",
  "not a direct measure of attention or medication effectiveness",
  "does not establish that robots improve clinical outcomes",
  "may not generalize beyond the games and laboratory conditions",
  "people not used for training proved more difficult",
  "recognizable movements were more limited during walking",
] as const;

test.describe("I2 seven-paper Selected Research (staging semantics)", () => {
  test("homepage keeps identity and shows one primary plus six compact cards", async ({
    page,
  }) => {
    await page.goto("./");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(PUNCHLINE);
    const selected = page.locator("#selected-research");
    await expect(selected.locator("article.feature")).toHaveCount(1);
    const miniCount = await selected.locator("article.mini-card").count();
    // Staging: 6 compact cards. Fixture-enabled e2e may insert one synthetic card (7).
    expect(miniCount === 6 || miniCount === 7).toBeTruthy();
  });

  test("Selected Research uses the exact seven-paper order with ESL primary", async ({ page }) => {
    await page.goto("./");
    const selected = page.locator("#selected-research");

    await expect(selected.locator("article.feature")).toContainText(SELECTED_ORDER[0].title);
    await expect(selected.locator("article.feature")).toContainText(/Accepted/i);
    await expect(selected.locator("article.feature")).toContainText(TLDR_SNIPPETS[0]);
    // Year must appear once even when venue_short already includes it.
    await expect(selected.locator("article.feature .feature-meta")).toHaveText(
      /NeurIPS 2026 · Accepted/,
    );
    await expect(selected.locator("article.feature .feature-meta")).not.toHaveText(
      /2026 · 2026/,
    );
    await expect(
      selected.locator("article.mini-card", { hasText: /Electrodermal Activity/i }).locator(".mini-meta"),
    ).toHaveText(/IEEE TAC · 2021/);

    const cards = selected.locator("article.mini-card");
    // Fixture-enabled builds may insert the synthetic card; ignore TEST_ONLY rows.
    const titles = await cards.locator("h3").allTextContents();
    const realTitles = titles.filter((t) => !/TEST_ONLY_FICTIONAL/i.test(t));
    expect(realTitles).toHaveLength(6);
    for (let i = 0; i < 6; i++) {
      expect(realTitles[i], `card ${i + 1}`).toMatch(SELECTED_ORDER[i + 1].title);
    }

    const asdCard = selected.locator("article.mini-card", { hasText: /ASD Identification/i });
    const adhdCard = selected.locator("article.mini-card", { hasText: /pupil dynamics/i });
    await expect(asdCard).toHaveClass(/mini-card--elevated/);
    await expect(adhdCard).toHaveClass(/mini-card--elevated/);
  });

  test("all seven approved TL;DRs render and D9 award promo stays off Selected", async ({
    page,
  }) => {
    await page.goto("./");
    const selected = page.locator("#selected-research");
    for (const snippet of TLDR_SNIPPETS) {
      await expect(selected.getByText(snippet)).toBeVisible();
    }
    await expect(selected.getByText(/Honorable Mention/i)).toHaveCount(0);
    await expect(selected.getByText(/MobiTangibles/i)).toHaveCount(0);
    await expect(selected.locator(".feature-viz")).toHaveCount(0);
  });

  test("MobiTangibles remains discoverable in archive and on its paper page", async ({ page }) => {
    await page.goto("./publications/");
    const mobi = page.locator("article.pub", { hasText: /MobiTangibles/i });
    await expect(mobi).toBeVisible();

    await page.goto("./papers/mobitangibles/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/MobiTangibles/i);
  });

  test("Selected Research is readable without JS and without horizontal overflow", async ({
    browser,
    page,
  }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const noJs = await context.newPage();
    await noJs.goto("./");
    const selected = noJs.locator("#selected-research");
    await expect(selected.locator("article.feature")).toHaveCount(1);
    await expect(selected.getByText(TLDR_SNIPPETS[0])).toBeVisible();
    await expect(selected.getByText(TLDR_SNIPPETS[6])).toBeVisible();
    await context.close();

    for (const width of [320, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("./");
      const overflow = await page.evaluate(() => {
        const doc = document.documentElement;
        return { scrollWidth: doc.scrollWidth, clientWidth: doc.clientWidth };
      });
      expect(overflow.scrollWidth, `width ${width}`).toBeLessThanOrEqual(overflow.clientWidth + 1);
    }
  });
});
