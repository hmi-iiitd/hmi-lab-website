import { expect, test } from "@playwright/test";
import path from "node:path";
import {
  HERO_INTRODUCTION,
  MINSKY_SOCIETY_OF_MIND,
  PRIMARY_THEME_TITLES,
  PUNCHLINE,
} from "../../src/lib/identity";

const evidence = path.resolve("docs/milestone-evidence");

test.describe("M3.5 Interactive Intelligence identity", () => {
  test("homepage hero punchline and introduction match approved text exactly", async ({
    page,
  }) => {
    await page.goto("./");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(PUNCHLINE);
    await expect(page.getByText(HERO_INTRODUCTION, { exact: true })).toBeVisible();
    await expect(page.getByText(/Intelligence is\s+an interaction/i)).toHaveCount(0);
  });

  test("homepage shows exactly three primary themes in approved order", async ({ page }) => {
    await page.goto("./");
    const cards = page.locator("#research-themes article");
    await expect(cards).toHaveCount(3);
    await expect(cards.nth(0).getByRole("heading")).toHaveText(
      PRIMARY_THEME_TITLES["perception-understanding"],
    );
    await expect(cards.nth(1).getByRole("heading")).toHaveText(
      PRIMARY_THEME_TITLES["learning-coordination"],
    );
    await expect(cards.nth(2).getByRole("heading")).toHaveText(
      PRIMARY_THEME_TITLES["interaction-adaptation"],
    );
  });

  test("homepage exposes application pathways with neurodevelopment visible", async ({
    page,
  }) => {
    await page.goto("./");
    const apps = page.locator("#application-pathways");
    await expect(apps).toBeVisible();
    await expect(apps.getByRole("link", { name: /neurodevelopment/i })).toBeVisible();
    await expect(apps.getByRole("link", { name: /ADHD/i })).toBeVisible();
    await expect(apps.getByRole("link", { name: /autism/i })).toBeVisible();
    await expect(apps.getByRole("link", { name: /health/i })).toBeVisible();
    await expect(apps.getByRole("link", { name: /accessibility/i })).toBeVisible();
  });

  test("About page renders approved description and verified Minsky attribution", async ({
    page,
  }) => {
    await page.goto("./about/");
    await expect(
      page.getByRole("heading", { name: PUNCHLINE, exact: true }),
    ).toBeVisible();
    await expect(page.getByText(/interactive intelligence/i).first()).toBeVisible();
    await expect(
      page.getByText(
        /how intelligent systems perceive and understand people and other agents/i,
      ),
    ).toBeVisible();
    await expect(
      page.getByText(/neurodevelopment, accessibility, and health/i),
    ).toBeVisible();
    await expect(page.getByText(MINSKY_SOCIETY_OF_MIND.text, { exact: true })).toBeVisible();
    await expect(page.getByText(/Marvin Minsky/i)).toBeVisible();
    await expect(page.getByText(/Society of Mind/i)).toBeVisible();
    await expect(page.getByText(/§\s*16\.1/)).toBeVisible();
    await expect(page.getByText(/p\.\s*163/i)).toBeVisible();
    await expect(page.getByText(/§\s*30\.8/)).toHaveCount(0);
  });

  test("About is in primary navigation and resolves", async ({ page }) => {
    await page.goto("./");
    const nav = page.getByRole("navigation", { name: /main/i });
    const about = nav.getByRole("link", { name: "About", exact: true });
    await expect(about).toBeVisible();
    await about.click();
    await expect(page).toHaveURL(/\/about\/?$/);
    await expect(page.getByRole("heading", { name: PUNCHLINE })).toBeVisible();
  });

  test("research page mirrors three themes and application pathways", async ({ page }) => {
    await page.goto("./research/");
    await expect(page.locator("#research-themes article")).toHaveCount(3);
    await expect(
      page.getByRole("heading", { name: PRIMARY_THEME_TITLES["perception-understanding"] }),
    ).toBeVisible();
    await expect(page.locator("#application-pathways")).toBeVisible();
    await expect(
      page.locator("#application-pathways").getByRole("link", { name: /neurodevelopment/i }),
    ).toBeVisible();
  });

  test("footer and metadata use approved identity, not competing punchlines", async ({
    page,
  }) => {
    await page.goto("./");
    const footer = page.getByRole("contentinfo");
    await expect(footer.getByText(PUNCHLINE)).toBeVisible();
    await expect(footer.getByText(/Better intelligence begins/i)).toHaveCount(0);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      /Interactive Intelligence/i,
    );
  });

  test("header logo stays proportional and reasonably sized", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("./");
    const logo = page.locator("header .brand-logo");
    await expect(logo).toBeVisible();
    const box = await logo.boundingBox();
    expect(box).toBeTruthy();
    if (box) {
      expect(box.height).toBeGreaterThanOrEqual(52);
      expect(box.height).toBeLessThanOrEqual(78);
      expect(box.width / box.height).toBeGreaterThan(1.05);
      expect(box.width / box.height).toBeLessThan(1.3);
    }
    await expect(page.locator("header a.brand")).not.toHaveAttribute("aria-label");
  });

  test("desktop and mobile screenshots for homepage, about, and research", async ({
    page,
  }) => {
    for (const [route, slug] of [
      ["./", "homepage"],
      ["./about/", "about"],
      ["./research/", "research"],
    ] as const) {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(route);
      await page.screenshot({
        path: path.join(evidence, `m35-identity-${slug}-desktop.png`),
        fullPage: true,
      });
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(route);
      await page.screenshot({
        path: path.join(evidence, `m35-identity-${slug}-mobile.png`),
        fullPage: true,
      });
    }
  });
});
