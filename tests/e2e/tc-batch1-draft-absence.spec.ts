import { expect, test } from "@playwright/test";
import { TC_BATCH1 } from "../fixtures/tc-batch1-drafts";

const DRAFT_SNIPPETS = [
  "smartphone magnetic proxies",
  "echolalia, coherence, and repetition",
  "selective, sustained, and alternating attention",
  "under-resourced New Delhi school",
  "normative analysis, not an experimental performance study",
] as const;

test.describe("T-C Batch 1 drafts stay off staging surfaces", () => {
  test("five draft summaries are absent from homepage, archive, and paper pages", async ({
    page,
  }) => {
    await page.goto("./");
    for (const row of TC_BATCH1) {
      await expect(page.getByText(row.text, { exact: true })).toHaveCount(0);
    }
    for (const snippet of DRAFT_SNIPPETS) {
      await expect(page.getByText(snippet)).toHaveCount(0);
    }

    await page.goto("./publications/");
    for (const snippet of DRAFT_SNIPPETS) {
      await expect(page.getByText(snippet)).toHaveCount(0);
    }

    for (const row of TC_BATCH1) {
      await page.goto(`./papers/${row.slug}/`);
      await expect(page.getByText(row.text, { exact: true })).toHaveCount(0);
      await expect(page.getByText("TL;DR — In plain language")).toHaveCount(0);
    }
  });

  test("previously approved TL;DRs remain visible on their paper pages", async ({ page }) => {
    await page.goto("./papers/epistemic-social-learning/");
    await expect(
      page.getByText("update beliefs about other agents quickly", { exact: false }),
    ).toBeVisible();
    await page.goto("./papers/express-ear/");
    await expect(
      page.getByText("recognizable movements were more limited during walking", {
        exact: false,
      }),
    ).toBeVisible();
  });
});
