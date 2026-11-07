import { expect, test } from "@playwright/test";
import { PUNCHLINE } from "../../src/lib/identity";

const APPROVED = [
  {
    slug: "epistemic-social-learning",
    title: /Epistemic Social Learning/i,
    snippet: "update beliefs about other agents quickly",
  },
  {
    slug: "predictive-asd-acoustic-linguistic",
    title: /Acoustic and Linguistic Behaviors for ASD Identification/i,
    snippet: "stand-alone clinical diagnostic test",
  },
  {
    slug: "trial-pupil-dynamics-adhd",
    title: /Trial-level pupil dynamics/i,
    snippet: "not a direct measure of attention or medication effectiveness",
  },
  {
    slug: "social-robots-autism-care-india",
    title: /social robots for Autism Care in India/i,
    snippet: "does not establish that robots improve clinical outcomes",
  },
  {
    slug: "vr-flat-screen-gaming-responses",
    title: /Virtual Reality and Flat Screen Gaming/i,
    snippet: "may not generalize beyond the games and laboratory conditions",
  },
  {
    slug: "emotion-recognition-eda",
    title: /Emotion Recognition from Electrodermal Activity/i,
    snippet: "people not used for training proved more difficult",
  },
  {
    slug: "express-ear",
    title: /ExpressEar/i,
    snippet: "recognizable movements were more limited during walking",
  },
] as const;

const HOMEPAGE_SNIPPETS = [
  "update beliefs about other agents quickly",
  "does not establish that robots improve clinical outcomes",
  "not a direct measure of attention or medication effectiveness",
] as const;

test.describe("T-B approved TL;DR publication surfaces", () => {
  test("homepage keeps frozen 1+3 Selected Research and shows approved TL;DRs on featured cards", async ({
    page,
  }) => {
    await page.goto("./");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(PUNCHLINE);
    const selected = page.locator("#selected-research");
    await expect(selected.locator("article.feature")).toHaveCount(1);
    await expect(selected.locator("article.mini-card")).toHaveCount(3);
    await expect(page.getByText("TL;DR — In plain language")).toHaveCount(0);

    // ESL is always the primary feature; its approved TL;DR must render.
    await expect(selected.getByText(HOMEPAGE_SNIPPETS[0])).toBeVisible();

    // CHI / ADHD appear in staging Selected; fixture-enabled e2e builds may displace one slot.
    for (const { title, snippet } of [
      { title: /social robots for Autism Care in India/i, snippet: HOMEPAGE_SNIPPETS[1] },
      { title: /pupil dynamics/i, snippet: HOMEPAGE_SNIPPETS[2] },
    ]) {
      const card = selected.locator("article", { hasText: title });
      if ((await card.count()) > 0) {
        await expect(card.getByText(snippet)).toBeVisible();
      }
    }

    // Archive-only approvals must not appear in the frozen four-card Selected set.
    await expect(selected.getByText("stand-alone clinical diagnostic test")).toHaveCount(0);
    await expect(selected.getByText("recognizable movements were more limited")).toHaveCount(0);
  });

  test("all seven approved summaries appear on paper pages and the archive", async ({ page }) => {
    for (const row of APPROVED) {
      await page.goto(`./papers/${row.slug}/`);
      await expect(page.getByRole("heading", { level: 1 })).toContainText(row.title);
      await expect(page.getByRole("heading", { name: "TL;DR — In plain language" })).toBeVisible();
      await expect(page.locator(".plain-language-tldr")).toContainText(row.snippet);
    }

    await page.goto("./publications/");
    for (const row of APPROVED) {
      const article = page.locator("article.pub", { hasText: row.title });
      await expect(article).toBeVisible();
      await expect(article.locator(".plain-language-tldr")).toContainText(row.snippet);
    }
  });

  test("unapproved papers stay without TL;DR chrome", async ({ page }) => {
    await page.goto("./papers/mobitangibles/");
    await expect(page.getByRole("heading", { name: "TL;DR — In plain language" })).toHaveCount(0);
    await expect(page.locator(".plain-language-tldr")).toHaveCount(0);

    await page.goto("./publications/");
    const mobi = page.locator("article.pub", { hasText: /MobiTangibles/i });
    await expect(mobi).toBeVisible();
    await expect(mobi.locator(".plain-language-tldr")).toHaveCount(0);
  });

  test("archive TL;DRs remain readable without JavaScript", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto("./publications/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Verified research archive");
    const express = page.locator("article.pub", { hasText: /ExpressEar/i });
    await expect(express.locator(".plain-language-tldr")).toContainText(
      "recognizable movements were more limited during walking",
    );
    await context.close();
  });

  test("approved ExpressEar TL;DR reflows without horizontal overflow", async ({ page }) => {
    for (const width of [320, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("./papers/express-ear/");
      const overflow = await page.evaluate(() => {
        const doc = document.documentElement;
        return { scrollWidth: doc.scrollWidth, clientWidth: doc.clientWidth };
      });
      expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.clientWidth + 1);
    }
  });
});
