import { expect, test } from "@playwright/test";
import path from "node:path";

test.describe("staging smoke", () => {
  test("homepage loads with brand, skip link, and noindex on staging", async ({
    page,
  }) => {
    await page.goto("./");
    await expect(page.getByRole("link", { name: /skip to content/i })).toBeAttached();
    await expect(page.getByRole("banner")).toContainText(/HMI/i);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      /noindex/i,
    );
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("primary nav destinations resolve under the project base path", async ({
    page,
  }) => {
    await page.goto("./");
    for (const name of ["Research", "Publications", "People"]) {
      const link = page.getByRole("navigation").getByRole("link", { name });
      await expect(link).toBeVisible();
      const href = await link.getAttribute("href");
      expect(href ?? "").toMatch(/hmi-lab-website/);
      await link.click();
      await expect(page.locator("main")).toBeVisible();
      await page.goto("./");
    }
  });

  test("captures baseline screenshot for design review", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("./");
    const out = path.resolve("docs/milestone-evidence/m1-homepage-desktop.png");
    await page.screenshot({ path: out, fullPage: true });
  });
});
