import { test, expect } from "@playwright/test";

test.describe("CineVault: user can apply sorting", () => {
  test("changing Ascending to Descending", async ({ page }) => {
    await page.goto("https://cinevaultmoviesapp.netlify.app/");
    const firstMovie = page.locator(".movie").first();
    await expect(firstMovie).toBeVisible();
    const firstMovieTextBefore = await firstMovie.textContent();
    await page
      .getByRole("combobox")
      .nth(1)
      .selectOption({ value: "descending" });
    const firstMovieTextAfter = await firstMovie.textContent();
    await expect(firstMovie).not.toHaveText(firstMovieTextBefore ?? "");
  });
});
