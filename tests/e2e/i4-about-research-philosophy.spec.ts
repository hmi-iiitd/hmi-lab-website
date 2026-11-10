import { expect, test } from "@playwright/test";
import {
  HMI_RESEARCH_PROPOSITION,
  MINSKY_SOCIETY_OF_MIND,
  RESEARCH_PHILOSOPHY_PARAGRAPHS,
  RESEARCH_PHILOSOPHY_QUESTION,
} from "../../src/lib/identity";

test.describe("I4 About Research Philosophy proposition", () => {
  test("shows the exact HMI proposition once as ordinary philosophy prose", async ({ page }) => {
    await page.goto("./about/");
    const philosophy = page.locator(".about-philosophy");
    const quote = page.locator(".about-quote");

    await expect(page.getByText(HMI_RESEARCH_PROPOSITION, { exact: true })).toHaveCount(1);
    await expect(philosophy.getByText(HMI_RESEARCH_PROPOSITION, { exact: true })).toBeVisible();

    const prop = philosophy.locator(".hmi-research-proposition, p", {
      hasText: HMI_RESEARCH_PROPOSITION,
    });
    await expect(prop.first()).toBeVisible();
    await expect(philosophy.locator("blockquote")).toHaveCount(0);
    await expect(philosophy.locator("figure")).toHaveCount(0);
    await expect(philosophy.locator("cite")).toHaveCount(0);

    await expect(philosophy.getByText(/HMI programme statement|programme statement/i)).toBeVisible();
    await expect(philosophy.getByText(/inspired by|Minsky/i)).toBeVisible();

    for (const paragraph of RESEARCH_PHILOSOPHY_PARAGRAPHS) {
      await expect(philosophy.getByText(paragraph, { exact: true })).toBeVisible();
    }
    await expect(page.getByRole("heading", { level: 2, name: RESEARCH_PHILOSOPHY_QUESTION })).toBeVisible();

    await expect(quote).toHaveCount(1);
    await expect(quote.getByText(MINSKY_SOCIETY_OF_MIND.text, { exact: true })).toBeVisible();
    await expect(quote.getByText(/Marvin Minsky/i)).toBeVisible();
    await expect(quote.getByText(/§\s*16\.1/)).toBeVisible();
    await expect(quote.getByText(HMI_RESEARCH_PROPOSITION)).toHaveCount(0);
  });

  test("keeps About reading order: approved description → philosophy → Minsky", async ({
    page,
  }) => {
    await page.goto("./about/");
    const order = await page.evaluate((proposition) => {
      const approved = document.querySelector("#about-approved-description");
      const philosophy = document.querySelector(".about-philosophy");
      const quote = document.querySelector(".about-quote");
      const propNode = Array.from(document.querySelectorAll(".about-philosophy p")).find((p) =>
        p.textContent?.includes(proposition),
      );
      if (!approved || !philosophy || !quote || !propNode) return null;
      return {
        philosophyAfterApproved:
          (approved.compareDocumentPosition(philosophy) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0,
        propInsidePhilosophy: philosophy.contains(propNode),
        quoteAfterPhilosophy:
          (philosophy.compareDocumentPosition(quote) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0,
        propBeforeQuote:
          (propNode.compareDocumentPosition(quote) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0,
        epigraphCount: document.querySelectorAll("figure.about-quote").length,
      };
    }, HMI_RESEARCH_PROPOSITION);

    expect(order).toEqual({
      philosophyAfterApproved: true,
      propInsidePhilosophy: true,
      quoteAfterPhilosophy: true,
      propBeforeQuote: true,
      epigraphCount: 1,
    });
  });

  test("does not surface the proposition on homepage or Research index", async ({ page }) => {
    await page.goto("./");
    await expect(page.getByText(HMI_RESEARCH_PROPOSITION, { exact: true })).toHaveCount(0);
    await page.goto("./research/");
    await expect(page.getByText(HMI_RESEARCH_PROPOSITION, { exact: true })).toHaveCount(0);
  });

  test("About philosophy remains readable without JS and without overflow", async ({
    browser,
    page,
  }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const noJs = await context.newPage();
    await noJs.goto("./about/");
    await expect(noJs.getByText(HMI_RESEARCH_PROPOSITION, { exact: true })).toBeVisible();
    await expect(noJs.getByText(MINSKY_SOCIETY_OF_MIND.text, { exact: true })).toBeVisible();
    await context.close();

    for (const width of [320, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("./about/");
      const overflow = await page.evaluate(() => {
        const doc = document.documentElement;
        return { scrollWidth: doc.scrollWidth, clientWidth: doc.clientWidth };
      });
      expect(overflow.scrollWidth, `width ${width}`).toBeLessThanOrEqual(overflow.clientWidth + 1);
    }
  });
});
