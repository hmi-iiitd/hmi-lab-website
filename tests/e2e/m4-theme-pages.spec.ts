import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { PRIMARY_THEME_IDS, PRIMARY_THEME_TITLES } from "../../src/lib/identity";

async function assertNoHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(() => {
    const doc = document.documentElement;
    return { scrollWidth: doc.scrollWidth, clientWidth: doc.clientWidth };
  });
  expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.clientWidth + 1);
}

test.describe("M4.1 research theme detail pages", () => {
  for (const id of PRIMARY_THEME_IDS) {
    test(`${id} theme page renders title, summary, and verified papers`, async ({ page }) => {
      await page.goto(`./research/${id}/`);
      await expect(page.getByRole("heading", { level: 1, name: PRIMARY_THEME_TITLES[id] })).toBeVisible();
      await expect(page.locator(".theme-summary")).toBeVisible();
      await expect(page.locator("#theme-publications")).toBeVisible();
    });
  }

  test("Learning & Coordination lists ESL as Accepted and links to the paper page", async ({
    page,
  }) => {
    await page.goto("./research/learning-coordination/");
    const row = page.locator("#theme-publications li", {
      hasText: /Epistemic Social Learning/i,
    });
    await expect(row).toBeVisible();
    await expect(row.getByText(/Accepted/i)).toBeVisible();
    await row.getByRole("link", { name: /Epistemic Social Learning/i }).click();
    await expect(page).toHaveURL(/\/papers\/epistemic-social-learning\/?$/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/Epistemic Social Learning/i);
  });

  test("homepage theme cards deep-link to theme pages", async ({ page }) => {
    await page.goto("./");
    const card = page.locator("#research-themes article").filter({
      has: page.getByRole("heading", { name: PRIMARY_THEME_TITLES["perception-understanding"] }),
    });
    await card.getByRole("link", { name: /View theme|Explore theme|View research/i }).click();
    await expect(page).toHaveURL(/\/research\/perception-understanding\/?$/);
  });

  test("research index links each theme to its detail page", async ({ page }) => {
    await page.goto("./research/");
    for (const id of PRIMARY_THEME_IDS) {
      await expect(
        page.locator(`#research-themes a[href$="/research/${id}/"]`).first(),
      ).toBeVisible();
    }
  });

  test("theme page remains readable without JavaScript", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto("./research/learning-coordination/");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      PRIMARY_THEME_TITLES["learning-coordination"],
    );
    await expect(page.getByText(/Epistemic Social Learning/i)).toBeVisible();
    await context.close();
  });

  test("theme pages pass axe serious/critical and reflow without overflow", async ({ page }) => {
    for (const width of [320, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("./research/interaction-adaptation/");
      await assertNoHorizontalOverflow(page);
    }
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("./research/perception-understanding/");
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    const serious = results.violations.filter((v) =>
      ["serious", "critical"].includes(v.impact ?? ""),
    );
    expect(serious, JSON.stringify(serious, null, 2)).toEqual([]);
  });
});
