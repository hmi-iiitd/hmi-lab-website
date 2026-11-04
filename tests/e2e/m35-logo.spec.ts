import { expect, test } from "@playwright/test";
import path from "node:path";

const evidenceDir = path.resolve("docs/milestone-evidence");

test.describe("M3.5 official HMI logo", () => {
  test("header and footer logos load with accessible names", async ({ page }) => {
    await page.goto("./");
    const headerLogo = page.locator("header .brand-logo");
    const footerLogo = page.locator("footer .brand-logo");

    await expect(headerLogo).toBeVisible();
    await expect(footerLogo).toBeVisible();
    // Decorative imgs: accessible name comes from parent brand links.
    await expect(headerLogo).toHaveAttribute("alt", "");
    await expect(footerLogo).toHaveAttribute("alt", "");
    await expect(
      page.getByRole("link", { name: /HMI\s+Research Group\s*·\s*IIIT-Delhi/i }),
    ).toHaveCount(1);
    await expect(
      page.getByRole("link", { name: /HMI Research Group home/i }),
    ).toBeVisible();

    const headerLoaded = await headerLogo.evaluate((img: HTMLImageElement) => ({
      complete: img.complete,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      currentSrc: img.currentSrc,
    }));
    expect(headerLoaded.complete).toBe(true);
    expect(headerLoaded.naturalWidth).toBeGreaterThan(0);
    expect(headerLoaded.naturalHeight).toBeGreaterThan(0);
    expect(headerLoaded.currentSrc).toMatch(/\/brand\/logo-header\.png/);

    await footerLogo.scrollIntoViewIfNeeded();
    await expect
      .poll(async () =>
        footerLogo.evaluate((img: HTMLImageElement) => img.naturalWidth),
      )
      .toBeGreaterThan(0);
    await expect(footerLogo).toHaveAttribute("src", /\/brand\/logo-footer\.png/);
  });

  test("logo layout keeps aspect ratio on desktop and mobile", async ({ page }) => {
    for (const viewport of [
      { width: 1440, height: 900 },
      { width: 390, height: 844 },
    ]) {
      await page.setViewportSize(viewport);
      await page.goto("./");
      const logo = page.locator("header .brand-logo");
      await expect(logo).toBeVisible();

      const metrics = await logo.evaluate((img: HTMLImageElement) => {
        const rect = img.getBoundingClientRect();
        return {
          width: rect.width,
          height: rect.height,
          naturalRatio: img.naturalWidth / img.naturalHeight,
          renderedRatio: rect.width / rect.height,
          objectFit: getComputedStyle(img).objectFit,
        };
      });

      expect(metrics.height).toBeGreaterThan(28);
      expect(metrics.width).toBeGreaterThan(28);
      expect(metrics.objectFit).toBe("contain");
      expect(Math.abs(metrics.renderedRatio - metrics.naturalRatio)).toBeLessThan(0.08);
    }
  });

  test("favicon and social meta point at local brand assets", async ({ page }) => {
    await page.goto("./");
    const icon = page.locator('link[rel="icon"][sizes="32x32"]');
    await expect(icon).toHaveAttribute("href", /\/brand\/favicon-32\.png/);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      "content",
      /\/brand\/og-image\.png/,
    );
    await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute(
      "content",
      /\/brand\/og-image\.png/,
    );

    const faviconUrl = await icon.getAttribute("href");
    expect(faviconUrl).toBeTruthy();
    const res = await page.request.get(new URL(faviconUrl!, page.url()).toString());
    expect(res.ok()).toBeTruthy();
  });

  test("provisional CSS brand-mark circles are gone", async ({ page }) => {
    await page.goto("./");
    await expect(page.locator(".brand-mark")).toHaveCount(0);
    await expect(page.locator(".brand i")).toHaveCount(0);
  });

  test("desktop and mobile screenshots of logo at intended size", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("./");
    await page.locator("header .brand-logo").waitFor({ state: "visible" });
    await page.screenshot({
      path: path.join(evidenceDir, "m35-logo-desktop.png"),
      fullPage: false,
    });
    await page.locator("header").screenshot({
      path: path.join(evidenceDir, "m35-logo-header-desktop.png"),
    });

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("./");
    await page.locator("header .brand-logo").waitFor({ state: "visible" });
    await page.screenshot({
      path: path.join(evidenceDir, "m35-logo-mobile.png"),
      fullPage: false,
    });
    await page.locator("header").screenshot({
      path: path.join(evidenceDir, "m35-logo-header-mobile.png"),
    });
  });
});
