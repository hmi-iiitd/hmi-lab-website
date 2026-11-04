import { expect, test, type Page } from "@playwright/test";
import { runtimeScreenshotPath } from "./screenshot-path";

async function assertNoHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(() => {
    const doc = document.documentElement;
    return { scrollWidth: doc.scrollWidth, clientWidth: doc.clientWidth };
  });
  expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.clientWidth + 1);
}

function px(value: string): number {
  return Number.parseFloat(value);
}

async function fontSize(page: Page, selector: string): Promise<number> {
  return px(await page.locator(selector).first().evaluate((el) => getComputedStyle(el).fontSize));
}

async function textAlign(page: Page, selector: string): Promise<string> {
  return page.locator(selector).first().evaluate((el) => getComputedStyle(el).textAlign);
}

test.describe("M3.5 typography alignment refinement", () => {
  test("prose stays left-aligned with no justification", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("./");
    expect(await textAlign(page, "body")).toMatch(/^(start|left)$/);
    expect(await textAlign(page, "#application-pathways .section-intro")).toMatch(/^(start|left)$/);
    expect(await textAlign(page, ".application-chip-summary")).toMatch(/^(start|left)$/);
    expect(await textAlign(page, ".direction p")).toMatch(/^(start|left)$/);

    await page.goto("./about/");
    expect(await textAlign(page, ".about-prose p")).toMatch(/^(start|left)$/);

    await page.goto("./publications/");
    expect(await textAlign(page, ".pub .authors")).toMatch(/^(start|left)$/);
    expect(await textAlign(page, ".pub .venue")).toMatch(/^(start|left)$/);

    const justified = await page.evaluate(() => {
      return Array.from(document.querySelectorAll("body, p, .about-prose p, .section-intro, .application-chip-summary, .pub .authors")).some(
        (el) => getComputedStyle(el).textAlign === "justify",
      );
    });
    expect(justified).toBe(false);
  });

  test("Application Pathways type floors on desktop and mobile", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("./");
    expect(await fontSize(page, ".application-chip-title")).toBeGreaterThanOrEqual(18);
    expect(await fontSize(page, ".application-chip-title")).toBeLessThanOrEqual(20.5);
    expect(await fontSize(page, ".application-chip-summary")).toBeGreaterThanOrEqual(16);
    expect(await fontSize(page, ".application-chip-summary")).toBeLessThanOrEqual(17.5);
    expect(await fontSize(page, "#application-pathways .section-intro")).toBeGreaterThanOrEqual(17.5);
    expect(await fontSize(page, "#application-pathways .section-intro")).toBeLessThanOrEqual(19.5);

    const lh = await page
      .locator(".application-chip-summary")
      .first()
      .evaluate((el) => Number.parseFloat(getComputedStyle(el).lineHeight) / Number.parseFloat(getComputedStyle(el).fontSize));
    expect(lh).toBeGreaterThanOrEqual(1.55);
    expect(lh).toBeLessThanOrEqual(1.7);

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("./");
    expect(await fontSize(page, ".application-chip-title")).toBeGreaterThanOrEqual(17.5);
    expect(await fontSize(page, ".application-chip-summary")).toBeGreaterThanOrEqual(15.5);
    expect(await fontSize(page, "#application-pathways .section-intro")).toBeGreaterThanOrEqual(16.5);
  });

  test("About body paragraphs meet desktop and mobile floors", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("./about/");
    const desktop = await fontSize(page, "#about-approved-description p");
    expect(desktop).toBeGreaterThanOrEqual(18.5);
    expect(desktop).toBeLessThanOrEqual(20.5);

    const measure = await page
      .locator("#about-approved-description")
      .evaluate((el) => getComputedStyle(el).maxWidth);
    expect(px(measure)).toBeGreaterThanOrEqual(44 * 16 - 1);
    expect(px(measure)).toBeLessThanOrEqual(46 * 16 + 1);

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("./about/");
    expect(await fontSize(page, "#about-approved-description p")).toBeGreaterThanOrEqual(17.5);
  });

  test("research and publication secondary text stays at least 16px", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("./");
    expect(await fontSize(page, ".direction p")).toBeGreaterThanOrEqual(16);

    await page.goto("./publications/");
    expect(await fontSize(page, ".pub .authors")).toBeGreaterThanOrEqual(16);
    expect(await fontSize(page, ".pub .venue")).toBeGreaterThanOrEqual(16);

    await page.goto("./papers/epistemic-social-learning/");
    expect(await fontSize(page, ".paper-authors")).toBeGreaterThanOrEqual(16);
    expect(await fontSize(page, ".paper-venue")).toBeGreaterThanOrEqual(16);
    expect(await fontSize(page, ".paper-prose")).toBeGreaterThanOrEqual(16);
  });

  test("responsive reflow and 200% enlargement stay usable", async ({ page }) => {
    const routes = ["./", "./about/", "./research/", "./publications/", "./papers/epistemic-social-learning/"];
    for (const width of [320, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      for (const route of routes) {
        await page.goto(route);
        await assertNoHorizontalOverflow(page);
        await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      }
    }

    await page.setViewportSize({ width: 1280, height: 900 });
    for (const route of ["./", "./about/", "./publications/"]) {
      await page.goto(route);
      await page.addStyleTag({ content: "html { font-size: 200% !important; }" });
      await assertNoHorizontalOverflow(page);
      await expect(page.locator("header .brand-logo")).toBeVisible();
      const navBroken = await page.evaluate(() => {
        const toggle = document.querySelector(".nav-toggle");
        const brand = document.querySelector("header .brand");
        if (!toggle || !brand) return true;
        const t = toggle.getBoundingClientRect();
        const b = brand.getBoundingClientRect();
        if (getComputedStyle(toggle).display === "none") return false;
        return Math.min(b.right, t.right) - Math.max(b.left, t.left) > 4 &&
          Math.min(b.bottom, t.bottom) - Math.max(b.top, t.top) > 4;
      });
      expect(navBroken).toBe(false);
    }
  });

  test("captures 100% before/after crops for applications, about, research, pubs", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("./");
    await page.locator("#application-pathways").screenshot({
      path: runtimeScreenshotPath("m35-type-refine-applications-desktop.png"),
    });
    await page.locator("#research-themes").screenshot({
      path: runtimeScreenshotPath("m35-type-refine-research-desktop.png"),
    });

    await page.goto("./about/");
    await page.locator("#about-approved-description").screenshot({
      path: runtimeScreenshotPath("m35-type-refine-about-desktop.png"),
    });

    await page.goto("./publications/");
    await page.locator(".pub-list").screenshot({
      path: runtimeScreenshotPath("m35-type-refine-publications-desktop.png"),
    });

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("./");
    await page.locator("#application-pathways").screenshot({
      path: runtimeScreenshotPath("m35-type-refine-applications-mobile.png"),
    });
    await page.goto("./about/");
    await page.locator("#about-approved-description").screenshot({
      path: runtimeScreenshotPath("m35-type-refine-about-mobile.png"),
    });
    await page.goto("./publications/");
    await page.locator(".pub-list").first().screenshot({
      path: runtimeScreenshotPath("m35-type-refine-publications-mobile.png"),
    });
  });
});
