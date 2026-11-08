import { expect, test, type Page } from "@playwright/test";
import {
  APPLICATION_PATHWAYS_INTRO,
  HERO_INTRODUCTION,
  HOMEPAGE_THEMES_INTRO,
  MINSKY_SOCIETY_OF_MIND,
  PUNCHLINE,
  RESEARCH_IDENTITY,
  RESEARCH_PAGE_THEMES_LEDE,
  RESEARCH_PHILOSOPHY_LABEL,
  RESEARCH_PHILOSOPHY_PARAGRAPHS,
  RESEARCH_PHILOSOPHY_QUESTION,
} from "../../src/lib/identity";

async function assertNoHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(() => {
    const doc = document.documentElement;
    return { scrollWidth: doc.scrollWidth, clientWidth: doc.clientWidth };
  });
  expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.clientWidth + 1);
}

test.describe("Research positioning implementation", () => {
  test("homepage uses approved intro and concise themes lede", async ({ page }) => {
    await page.goto("./");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(RESEARCH_IDENTITY);
    await expect(page.locator("#hero .hero-deck")).toHaveText(PUNCHLINE);
    await expect(page.getByText(HERO_INTRODUCTION, { exact: true })).toBeVisible();
    await expect(page.locator("#research-themes .section-intro")).toHaveText(HOMEPAGE_THEMES_INTRO);
    await expect(page.getByText(RESEARCH_PAGE_THEMES_LEDE, { exact: true })).toHaveCount(0);
  });

  test("Application Pathways shows approved intro and existing cards", async ({ page }) => {
    await page.goto("./");
    const apps = page.locator("#application-pathways");
    await expect(apps.locator(".section-intro")).toHaveText(APPLICATION_PATHWAYS_INTRO);
    await expect(apps.getByText(/embodied interaction with the physical world/i)).toBeVisible();
    for (const name of [/neurodevelopment/i, /ADHD/i, /autism/i, /health/i, /accessibility/i]) {
      await expect(apps.getByRole("link", { name })).toBeVisible();
    }
    await expect(apps.getByRole("link", { name: /^Embodied interaction$/i })).toHaveCount(0);
  });

  test("Research page uses feedback-loop lede and retains theme summaries", async ({ page }) => {
    await page.goto("./research/");
    await expect(page.locator(".research-lede")).toHaveText(RESEARCH_PAGE_THEMES_LEDE);
    await expect(
      page.getByText(
        /How can interactive systems sense people, signals, and context well enough/i,
      ),
    ).toBeVisible();
    await expect(page.locator("#application-pathways .section-intro")).toHaveText(
      APPLICATION_PATHWAYS_INTRO,
    );
  });

  test("About keeps approved prose, philosophy hierarchy/order, and Minsky", async ({
    page,
  }) => {
    await page.goto("./about/");
    const approved = page.locator("#about-approved-description");
    const philosophy = page.locator(".about-philosophy");
    const quote = page.locator(".about-quote");

    await expect(approved.getByRole("heading", { name: PUNCHLINE, exact: true })).toBeVisible();
    await expect(
      approved.getByText(
        /how intelligent systems perceive and understand people and other agents/i,
      ),
    ).toBeVisible();

    await expect(philosophy.locator(".section-label")).toHaveText(RESEARCH_PHILOSOPHY_LABEL);
    await expect(page.getByRole("heading", { level: 2, name: RESEARCH_PHILOSOPHY_QUESTION })).toBeVisible();
    for (const paragraph of RESEARCH_PHILOSOPHY_PARAGRAPHS) {
      await expect(philosophy.getByText(paragraph, { exact: true })).toBeVisible();
    }

    await expect(quote.getByText(MINSKY_SOCIETY_OF_MIND.text, { exact: true })).toBeVisible();
    await expect(quote.getByText(/§\s*16\.1/)).toBeVisible();

    const order = await page.evaluate(() => {
      const a = document.querySelector("#about-approved-description");
      const p = document.querySelector(".about-philosophy");
      const q = document.querySelector(".about-quote");
      if (!a || !p || !q) return null;
      const pos = a.compareDocumentPosition(p);
      const pos2 = p.compareDocumentPosition(q);
      return {
        philosophyAfterApproved: (pos & Node.DOCUMENT_POSITION_FOLLOWING) !== 0,
        quoteAfterPhilosophy: (pos2 & Node.DOCUMENT_POSITION_FOLLOWING) !== 0,
      };
    });
    expect(order).toEqual({ philosophyAfterApproved: true, quoteAfterPhilosophy: true });
  });

  test("primary navigation and key internal links still resolve", async ({ page }) => {
    await page.goto("./");
    const nav = page.getByRole("navigation", { name: /main/i });
    for (const [label, path] of [
      ["Research", /\/research\/?$/],
      ["Publications", /\/publications\/?$/],
      ["About", /\/about\/?$/],
    ] as const) {
      await page.goto("./");
      await nav.getByRole("link", { name: label, exact: true }).click();
      await expect(page).toHaveURL(path);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    }
    await page.goto("./");
    await page.getByRole("link", { name: "Explore research", exact: true }).click();
    await expect(page).toHaveURL(/\/research\/?$/);
  });

  test("responsive reflow stays usable without horizontal overflow", async ({ page }) => {
    for (const width of [320, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      for (const route of ["./", "./about/", "./research/", "./publications/"]) {
        await page.goto(route);
        await assertNoHorizontalOverflow(page);
        await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      }
    }
  });
});
