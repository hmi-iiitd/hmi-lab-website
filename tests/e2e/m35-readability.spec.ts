import { expect, test, type Page } from "@playwright/test";
import { MINSKY_SOCIETY_OF_MIND, PUNCHLINE } from "../../src/lib/identity";
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

test.describe("M3.5 readability and editorial gate", () => {
  test("About shows restored Minsky §16.1 quotation", async ({ page }) => {
    await page.goto("./about/");
    await expect(page.getByText(MINSKY_SOCIETY_OF_MIND.text, { exact: true })).toBeVisible();
    await expect(page.getByText(/§\s*16\.1/)).toBeVisible();
    await expect(page.getByText(/p\.\s*163/i)).toBeVisible();
    await expect(page.getByText(/magical trick/i)).toHaveCount(0);
    await expect(page.getByText(/§\s*30\.8/)).toHaveCount(0);
  });

  test("homepage features ESL Accepted, CHI HM, ADHD Sci Rep, MobiTangibles", async ({
    page,
  }) => {
    await page.goto("./");
    const selected = page.locator("#selected-research");
    await expect(selected.getByText(/Epistemic Social Learning/i)).toBeVisible();
    await expect(selected.getByText(/Accepted/i).first()).toBeVisible();
    await expect(selected.getByText(/NeurIPS 2026/i)).toBeVisible();
    await expect(selected.getByText(/Honorable Mention/i)).toBeVisible();
    await expect(selected.getByText(/pupil dynamics/i)).toBeVisible();
    await expect(selected.getByText(/MobiTangibles/i)).toBeVisible();
    await expect(selected.getByText(/ExpressEar/i)).toHaveCount(0);
    await expect(selected.locator(".viz-foot")).toContainText(/not study data/i);
  });

  test("section labels are unique 01–05", async ({ page }) => {
    await page.goto("./");
    const labels = await page.locator(".section-label").allTextContents();
    const numbered = labels.map((l) => l.trim()).filter((l) => /^\d{2}\s*\//.test(l));
    expect(numbered.some((l) => l.startsWith("03"))).toBeTruthy();
    expect(numbered.filter((l) => l.startsWith("03"))).toHaveLength(1);
    expect(numbered.some((l) => l.startsWith("04"))).toBeTruthy();
    expect(numbered.some((l) => l.startsWith("05"))).toBeTruthy();
  });

  test("desktop and mobile type floors for critical roles", async ({ page }) => {
    for (const viewport of [
      { width: 1440, height: 900, heroMin: 60, bodyMin: 17.5, navMin: 14.5 },
      { width: 390, height: 844, heroMin: 36, bodyMin: 16.5, navMin: 15.5 },
    ]) {
      await page.setViewportSize(viewport);
      await page.goto("./");
      const hero = px(
        await page.locator("#hero-title").evaluate((el) => getComputedStyle(el).fontSize),
      );
      const lead = px(
        await page.locator(".hero .lead").evaluate((el) => getComputedStyle(el).fontSize),
      );
      const nav = px(
        await page.locator("#site-nav a").first().evaluate((el) => getComputedStyle(el).fontSize),
      );
      expect(hero).toBeGreaterThanOrEqual(viewport.heroMin);
      expect(lead).toBeGreaterThanOrEqual(viewport.bodyMin);
      expect(nav).toBeGreaterThanOrEqual(viewport.navMin);
    }
  });

  test("publications archive and paper page keep readable titles and controls", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("./publications/");
    const title = px(
      await page.locator(".pub h2").first().evaluate((el) => getComputedStyle(el).fontSize),
    );
    const input = px(
      await page.locator("#pub-q").evaluate((el) => getComputedStyle(el).fontSize),
    );
    expect(title).toBeGreaterThanOrEqual(18.5);
    expect(input).toBeGreaterThanOrEqual(15.5);

    await page.goto("./papers/epistemic-social-learning/");
    const paperTitle = px(
      await page.getByRole("heading", { level: 1 }).evaluate((el) => getComputedStyle(el).fontSize),
    );
    expect(paperTitle).toBeGreaterThanOrEqual(30);
  });

  test("research themes use three columns on wide screens", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("./");
    const cols = await page.locator("#research-themes .directions").evaluate((el) => {
      return getComputedStyle(el).gridTemplateColumns.split(" ").length;
    });
    expect(cols).toBe(3);
  });

  test("captures readability screenshots for key pages", async ({ page }) => {
    const routes = [
      ["./", "homepage"],
      ["./about/", "about"],
      ["./research/", "research"],
      ["./publications/", "publications"],
      ["./papers/epistemic-social-learning/", "paper"],
    ] as const;

    for (const [route, slug] of routes) {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(route);
      await page.screenshot({
        path: runtimeScreenshotPath(`runtime-readability-${slug}-desktop.png`),
        fullPage: true,
      });
      if (slug === "homepage" || slug === "about" || slug === "publications") {
        const crop = page.locator(
          slug === "homepage" ? "#hero" : slug === "about" ? ".about-prose" : ".pub-list",
        );
        await crop.first().screenshot({
          path: runtimeScreenshotPath(`runtime-readability-${slug}-desktop-crop.png`),
        });
      }
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(route);
      await page.screenshot({
        path: runtimeScreenshotPath(`runtime-readability-${slug}-mobile.png`),
        fullPage: true,
      });
    }

    await expect(page.getByRole("heading", { name: PUNCHLINE }).or(page.locator("h1"))).toBeVisible();
  });

  test("320px reflow keeps primary content usable without overflow", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 720 });
    for (const route of ["./", "./about/", "./publications/", "./papers/epistemic-social-learning/"]) {
      await page.goto(route);
      await assertNoHorizontalOverflow(page);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      const clipped = await page.evaluate(() => {
        const candidates = Array.from(
          document.querySelectorAll("h1, .lead, .about-prose p, .pub h2, .nav-toggle"),
        );
        return candidates.some((el) => {
          const style = getComputedStyle(el);
          return style.overflow === "hidden" && el.scrollWidth > el.clientWidth + 2;
        });
      });
      expect(clipped).toBe(false);
    }
  });

  test("200% text enlargement keeps layout readable without overlap", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("./");
    await page.addStyleTag({
      content: "html { font-size: 200% !important; }",
    });
    await assertNoHorizontalOverflow(page);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator("header .brand-logo")).toBeVisible();
    await expect(page.getByRole("link", { name: "Explore research", exact: true })).toBeVisible();

    const overlap = await page.evaluate(() => {
      const brand = document.querySelector("header .brand")?.getBoundingClientRect();
      const toggle = document.querySelector(".nav-toggle")?.getBoundingClientRect();
      if (!brand || !toggle || getComputedStyle(document.querySelector(".nav-toggle")!).display === "none") {
        return false;
      }
      const overlapX = Math.min(brand.right, toggle.right) - Math.max(brand.left, toggle.left);
      const overlapY = Math.min(brand.bottom, toggle.bottom) - Math.max(brand.top, toggle.top);
      return overlapX > 4 && overlapY > 4;
    });
    expect(overlap).toBe(false);

    await page.goto("./about/");
    await page.addStyleTag({
      content: "html { font-size: 200% !important; }",
    });
    await assertNoHorizontalOverflow(page);
    await expect(page.getByText(MINSKY_SOCIETY_OF_MIND.text, { exact: true })).toBeVisible();
  });
});
