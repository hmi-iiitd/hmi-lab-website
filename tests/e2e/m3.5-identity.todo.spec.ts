import { expect, test } from "@playwright/test";
import { HERO_INTRODUCTION, PUNCHLINE } from "../../src/lib/identity";

/**
 * M3.5 UI acceptance contract — intentionally skipped on M3 / PR #1.
 * Unskip when implementing homepage, About, logo, and metadata in a separate PR.
 */
test.describe.skip("M3.5 identity UI (deferred — do not implement in PR #1)", () => {
  test("homepage hero punchline matches approved text exactly", async ({ page }) => {
    await page.goto("./");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(PUNCHLINE);
  });

  test("homepage hero introduction matches approved sentence", async ({ page }) => {
    await page.goto("./");
    await expect(page.getByText(HERO_INTRODUCTION, { exact: true })).toBeVisible();
  });

  test("exactly three primary research theme cards", async ({ page }) => {
    await page.goto("./");
    await expect(page.locator("#research-themes article")).toHaveCount(3);
  });

  test("About page renders approved description faithfully", async ({ page }) => {
    await page.goto("./about/");
    await expect(
      page.getByRole("heading", { name: "Intelligence emerges through interaction." }),
    ).toBeVisible();
    await expect(page.getByText(/interactive intelligence/i).first()).toBeVisible();
  });

  test("original HMI logo renders without distortion on desktop and mobile", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("./");
    const logo = page.getByRole("img", { name: /HMI/i }).first();
    await expect(logo).toBeVisible();
    const box = await logo.boundingBox();
    expect(box).toBeTruthy();
    if (box) expect(box.width / box.height).toBeGreaterThan(0.5);
  });
});
