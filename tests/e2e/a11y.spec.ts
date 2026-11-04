import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("homepage has no serious or critical axe violations", async ({ page }) => {
  await page.goto("./");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();
  const serious = results.violations.filter((v) =>
    ["serious", "critical"].includes(v.impact ?? ""),
  );
  expect(serious, JSON.stringify(serious, null, 2)).toEqual([]);
});

test("header brand accessible name includes visible institutional text", async ({
  page,
}) => {
  await page.goto("./");
  const brand = page.locator("header a.brand");
  await expect(brand).toBeVisible();
  await expect(brand).not.toHaveAttribute("aria-label");

  // Accessible name must come from visible content (not an overriding aria-label).
  await expect(
    page.getByRole("link", { name: /HMI\s+Research Group\s*·\s*IIIT-Delhi/i }),
  ).toHaveCount(1);
  await expect(brand.locator("img.brand-logo")).toHaveAttribute("alt", "");

  const results = await new AxeBuilder({ page })
    .include("header a.brand")
    .withRules(["label-content-name-mismatch"])
    .analyze();
  expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual(
    [],
  );
});

test("footer logo-only brand link keeps an explicit accessible name", async ({
  page,
}) => {
  await page.goto("./");
  const footerBrand = page.locator("footer a.footer-brand");
  await expect(footerBrand).toBeVisible();
  await expect(footerBrand).toHaveAttribute("aria-label", /HMI Research Group/i);
  await expect(footerBrand.locator("img.brand-logo")).toHaveAttribute("alt", "");

  const results = await new AxeBuilder({ page })
    .include("footer a.footer-brand")
    .withRules(["label-content-name-mismatch", "link-name", "image-alt"])
    .analyze();
  expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual(
    [],
  );
});
