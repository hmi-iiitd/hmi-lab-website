import { expect, test } from "@playwright/test";
import { PUNCHLINE } from "../../src/lib/identity";

const FIXTURE_MARKER = "TEST_ONLY_FICTIONAL summary:";
const FIXTURE_PAPER = "./papers/test-fixture-synthetic-interaction/";

test.describe("I1/T-A real publications stay without TL;DR chrome", () => {
  test("homepage keeps one primary feature and three secondary cards", async ({ page }) => {
    await page.goto("./");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(PUNCHLINE);
    const selected = page.locator("#selected-research");
    await expect(selected).toBeVisible();
    await expect(selected.locator("article.feature")).toHaveCount(1);
    await expect(selected.locator("article.mini-card")).toHaveCount(3);
    // Paper-page TL;DR heading must not appear on the homepage chrome.
    await expect(page.getByText("TL;DR — In plain language")).toHaveCount(0);
  });

  test("publications archive remains readable without JS and omits TL;DR on real rows", async ({
    browser,
  }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto("./publications/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Verified research archive");
    const express = page.locator("article.pub", { hasText: /ExpressEar/i });
    await expect(express).toBeVisible();
    await expect(express.locator(".plain-language-tldr")).toHaveCount(0);
    await expect(page.getByText("TL;DR — In plain language")).toHaveCount(0);
    await context.close();
  });

  test("real paper page has no TL;DR section when summary is missing", async ({ page }) => {
    await page.goto("./papers/express-ear/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("ExpressEar");
    await expect(page.getByRole("heading", { name: "TL;DR — In plain language" })).toHaveCount(0);
    await expect(page.getByText(FIXTURE_MARKER)).toHaveCount(0);
  });
});

test.describe("I1/T-A fixture-enabled approved TL;DR rendering", () => {
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
