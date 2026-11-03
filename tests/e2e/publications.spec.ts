import { expect, test } from "@playwright/test";
import path from "node:path";

test.describe("M3 publications archive", () => {
  test("lists verified publications and excludes draft markers", async ({ page }) => {
    await page.goto("./publications/");
    await expect(page.getByRole("heading", { level: 1, name: /verified research archive/i })).toBeVisible();
    await expect(page.locator("#pub-list article.pub").first()).toBeVisible();
    await expect(page.getByText(/DRAFT_ONLY_DO_NOT_PUBLISH/i)).toHaveCount(0);
    await expect(page.getByText(/Epistemic Social Learning/i)).toBeVisible();
    await expect(page.getByText(/magnetic field shielding/i)).toHaveCount(0);
    await expect(page.getByText(/UFO: Passively Enabling/i)).toHaveCount(0);
  });

  test("accepted NeurIPS paper page renders without inventing a DOI", async ({ page }) => {
    await page.goto("./papers/epistemic-social-learning/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/Epistemic Social Learning/i);
    await expect(page.getByText(/status: accepted/i)).toBeVisible();
    await expect(page.getByRole("link", { name: "DOI" })).toHaveCount(0);
    await expect(page.getByRole("link", { name: "Publisher" })).toHaveAttribute(
      "href",
      /neurips\.cc\/virtual\/2026\/poster\/150541/,
    );
    await expect(page.locator("#bibtex pre code")).toContainText("note = {Accepted}");
    await expect(page.locator("#bibtex pre code")).toContainText("Jainendra Shukla");
    await expect(page.getByText(/distinct from formal proceedings publication/i)).toBeVisible();
  });

  test("search and filters reduce visible rows without removing markup for no-js users", async ({
    page,
  }) => {
    await page.goto("./publications/");
    const total = await page.locator("#pub-list article.pub").count();
    expect(total).toBeGreaterThan(5);
    await page.locator("#pub-q").fill("expressear");
    await page.locator("#pub-q").dispatchEvent("input");
    await expect.poll(async () => page.locator("#pub-list article.pub:visible").count()).toBe(1);
    await page.locator("#pub-q").fill("");
    await page.locator("#pub-q").dispatchEvent("input");
    await page.locator("#pub-kind").selectOption("journal");
    await page.locator("#pub-kind").dispatchEvent("change");
    const journals = await page.locator("#pub-list article.pub:visible").count();
    expect(journals).toBeGreaterThan(0);
    expect(journals).toBeLessThan(total);
  });

  test("paper detail pages render bibtex and DOI", async ({ page }) => {
    await page.goto("./papers/express-ear/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/ExpressEar/i);
    await expect(page.getByRole("link", { name: "DOI" })).toHaveAttribute(
      "href",
      "https://doi.org/10.1145/3478085",
    );
    await expect(page.locator("#bibtex pre code")).toContainText("@article");
    await expect(page.locator("#bibtex pre code")).toContainText("ExpressEar");
  });

  test("captures archive screenshots", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("./publications/");
    await page.screenshot({
      path: path.resolve("docs/milestone-evidence/m3-publications-desktop.png"),
      fullPage: true,
    });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("./publications/");
    await page.screenshot({
      path: path.resolve("docs/milestone-evidence/m3-publications-mobile.png"),
      fullPage: true,
    });
  });
});

test.describe("M3 publications no-js", () => {
  test.use({ javaScriptEnabled: false });

  test("full publication list remains visible without JavaScript", async ({ page }) => {
    await page.goto("./publications/");
    await expect(page.locator("#pub-list article.pub").first()).toBeVisible();
    await expect(page.getByRole("link", { name: /ExpressEar/i })).toBeVisible();
  });
});
