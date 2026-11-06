import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { PRIMARY_THEME_IDS, PUNCHLINE } from "../../src/lib/identity";

const FIXTURE_STORY = "./projects/test-fixture-research-story/";
const FIXTURE_PAPER = "./papers/test-fixture-synthetic-interaction/";
const VIEWPORTS = [320, 390, 768, 1024, 1440] as const;

async function assertNoHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(() => {
    const doc = document.documentElement;
    return { scrollWidth: doc.scrollWidth, clientWidth: doc.clientWidth };
  });
  expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.clientWidth + 1);
}

test.describe("M4.2 research story remains unpublished on public surfaces", () => {
  test("Research index has no links to draft or fixture projects", async ({ page }) => {
    await page.goto("./research/");
    await expect(page.getByText("No verified project pages yet.", { exact: false })).toBeVisible();
    await expect(page.locator('a[href*="/projects/esl-research-story/"]')).toHaveCount(0);
    await expect(page.locator('a[href*="/projects/test-fixture-research-story/"]')).toHaveCount(0);
    await expect(page.getByText(/TEST_ONLY_FICTIONAL/i)).toHaveCount(0);
  });

  test("homepage and theme pages do not reveal unpublished research stories", async ({ page }) => {
    for (const route of ["./", "./research/learning-coordination/"]) {
      await page.goto(route);
      await expect(page.locator('a[href*="/projects/esl-research-story/"]')).toHaveCount(0);
      await expect(page.locator('a[href*="/projects/test-fixture-research-story/"]')).toHaveCount(0);
    }
  });

  test("unpublished ESL project has no public listing cue", async ({ page }) => {
    await page.goto("./research/");
    await expect(page.locator('a[href*="/projects/esl-research-story/"]')).toHaveCount(0);
  });

  test("publications index excludes the fictional fixture paper", async ({ page }) => {
    await page.goto("./publications/");
    await expect(page.getByText(/TEST_ONLY_FICTIONAL/i)).toHaveCount(0);
    await expect(page.locator('a[href*="/papers/test-fixture-synthetic-interaction/"]')).toHaveCount(0);
  });

  test("M4.1 theme routes and frozen homepage punchline remain intact", async ({ page }) => {
    await page.goto("./");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(PUNCHLINE);
    for (const id of PRIMARY_THEME_IDS) {
      await page.goto(`./research/${id}/`);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expect(page.locator("#theme-publications")).toBeVisible();
    }
  });
});

test.describe("M4.2 fictional Research Story fixture (INCLUDE_TEST_FIXTURES build)", () => {
  test("renders complete Appendix A section hierarchy without media", async ({ page }) => {
    await page.goto(FIXTURE_STORY);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("TEST_ONLY_FICTIONAL");
    await expect(page.getByText("Research Story", { exact: false }).first()).toBeVisible();
    await expect(page.getByText(/· Accepted/)).toBeVisible();

    for (const heading of [
      "Scientific question",
      "Contribution",
      "Method",
      "Principal findings",
      "Limitations and scope",
      "What this contributes to Interactive Intelligence",
      "Research resources and citation",
    ]) {
      await expect(page.getByRole("heading", { name: heading })).toBeVisible();
    }

    await expect(
      page.getByText("Programme interpretation · Not a separate empirical finding"),
    ).toBeVisible();
    await expect(page.locator("article.research-story figure")).toHaveCount(0);
    await expect(page.locator("article.research-story img, article.research-story video")).toHaveCount(
      0,
    );
  });

  test("links the canonical publication and surfaces Accepted labeling", async ({ page }) => {
    await page.goto(FIXTURE_STORY);
    const paperLink = page.getByRole("link", {
      name: /TEST_ONLY_FICTIONAL: Synthetic Interaction Protocol/i,
    });
    await expect(paperLink).toBeVisible();
    await paperLink.click();
    await expect(page).toHaveURL(/\/papers\/test-fixture-synthetic-interaction\/?$/);

    await page.goto(FIXTURE_STORY);
    await expect(
      page.getByText(/Accepted; proceedings publication not yet verified/i),
    ).toBeVisible();
  });

  test("exposes verified resource links and omits absent optional resources", async ({ page }) => {
    await page.goto(FIXTURE_STORY);
    const resources = page.locator('section[aria-labelledby="story-resources"]');
    await expect(resources.getByRole("link", { name: "Publisher" })).toHaveAttribute(
      "href",
      "https://example.com/test-only-fictional-acceptance",
    );
    await expect(resources.getByRole("link", { name: "Verified paper record" })).toBeVisible();
    for (const absent of ["DOI", "PDF", "Code", "Dataset", "Video", "Slides", "Project"]) {
      await expect(resources.getByRole("link", { name: absent })).toHaveCount(0);
    }
  });

  test("passes axe serious/critical and has no horizontal overflow across viewports", async ({
    page,
  }) => {
    for (const width of VIEWPORTS) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(FIXTURE_STORY);
      await assertNoHorizontalOverflow(page);
    }

    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(FIXTURE_STORY);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    const serious = results.violations.filter((v) =>
      ["serious", "critical"].includes(v.impact ?? ""),
    );
    expect(serious, JSON.stringify(serious, null, 2)).toEqual([]);
  });

  test("supports keyboard navigation through story landmarks and resource links", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(FIXTURE_STORY);

    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: /skip to content/i })).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.locator("#main")).toBeFocused();

    const paperRecord = page.getByRole("link", { name: "Verified paper record" });
    await paperRecord.focus();
    await expect(paperRecord).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "Publisher" })).toBeFocused();
  });

  test("unpublished ESL project route remains absent", async ({ request }) => {
    const response = await request.get("./projects/esl-research-story/");
    expect(response.status()).toBe(404);
  });

  test("remains readable without JavaScript", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto(FIXTURE_STORY);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("TEST_ONLY_FICTIONAL");
    await expect(page.getByRole("heading", { name: "Scientific question" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Principal findings" })).toBeVisible();
    await expect(page.getByText(/Accepted; proceedings publication not yet verified/i)).toBeVisible();
    await expect(page.getByRole("link", { name: "Publisher" })).toBeVisible();
    await context.close();
  });

  test("fixture paper route exists only in the fixture-enabled preview", async ({ request }) => {
    const story = await request.get(FIXTURE_STORY);
    const paper = await request.get(FIXTURE_PAPER);
    expect(story.status()).toBe(200);
    expect(paper.status()).toBe(200);
  });
});
