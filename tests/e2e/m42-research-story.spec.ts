import { expect, test } from "@playwright/test";

test.describe("M4.2 research story remains unpublished", () => {
  test("Research index has no links to draft projects", async ({ page }) => {
    await page.goto("./research/");
    await expect(page.getByText("No verified project pages yet.", { exact: false })).toBeVisible();
    await expect(page.locator('a[href*="/projects/esl-research-story/"]')).toHaveCount(0);
  });

  test("homepage and theme pages do not reveal unpublished research stories", async ({ page }) => {
    for (const route of ["./", "./research/learning-coordination/"]) {
      await page.goto(route);
      await expect(page.locator('a[href*="/projects/esl-research-story/"]')).toHaveCount(0);
    }
  });

  test("unpublished project has no generated page in staging", async ({ request }) => {
    const response = await request.get("./projects/esl-research-story/");
    expect(response.status()).toBe(404);
  });
});
