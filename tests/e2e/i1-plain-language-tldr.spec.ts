import { expect, test } from "@playwright/test";
import { RESEARCH_IDENTITY } from "../../src/lib/identity";

const FIXTURE_MARKER = "TEST_ONLY_FICTIONAL summary:";
const FIXTURE_PAPER = "./papers/test-fixture-synthetic-interaction/";

test.describe("I1/T-A fixture-enabled approved TL;DR rendering", () => {
  test("homepage identity remains frozen with I2 Selected Research cardinality", async ({
    page,
  }) => {
    await page.goto("./");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(RESEARCH_IDENTITY);
    const selected = page.locator("#selected-research");
    await expect(selected).toBeVisible();
    await expect(selected.locator("article.feature")).toHaveCount(1);
    const miniCount = await selected.locator("article.mini-card").count();
    expect(miniCount === 6 || miniCount === 7).toBeTruthy();
    await expect(page.getByText("TL;DR — In plain language")).toHaveCount(0);
  });

  test("fixture paper page renders approved plain-language summary", async ({ page }) => {
    await page.goto(FIXTURE_PAPER);
    await expect(page.getByRole("heading", { name: "TL;DR — In plain language" })).toBeVisible();
    await expect(page.getByText(FIXTURE_MARKER)).toBeVisible();
  });

  test("fixture appears with the same canonical TL;DR on archive and Selected Research", async ({
    page,
  }) => {
    await page.goto("./publications/");
    const row = page.locator("article.pub", { hasText: /TEST_ONLY_FICTIONAL: Synthetic/i });
    await expect(row).toBeVisible();
    await expect(row.getByText(FIXTURE_MARKER)).toBeVisible();

    await page.goto("./");
    const selected = page.locator("#selected-research");
    await expect(selected.getByText(/TEST_ONLY_FICTIONAL: Synthetic/i)).toBeVisible();
    await expect(selected.getByText(FIXTURE_MARKER)).toBeVisible();
  });

  test("approved fixture TL;DR reflows without horizontal overflow", async ({ page }) => {
    for (const width of [320, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(FIXTURE_PAPER);
      const overflow = await page.evaluate(() => {
        const doc = document.documentElement;
        return { scrollWidth: doc.scrollWidth, clientWidth: doc.clientWidth };
      });
      expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.clientWidth + 1);
    }
  });
});
