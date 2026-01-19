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
    await expect(firstMovie).not.toHaveText(firstMovieTextBefore ?? "");
  });
  test("changing Popular to Rating/Date", async ({ page }) => {
    await page.goto("https://cinevaultmoviesapp.netlify.app/");
    const firstMovie = page.locator(".movie").first();
    await expect(firstMovie).toBeVisible();
    const firstMovieTextBefore = await firstMovie.textContent();
    await page.getByRole("combobox").first().selectOption({ value: "date" });
    await expect(firstMovie).not.toHaveText(firstMovieTextBefore ?? "");
    const firstMovieTextAfterDate = await firstMovie.textContent();

    await page.getByRole("combobox").first().selectOption({ value: "rating" });
    await expect(firstMovie).not.toHaveText(firstMovieTextAfterDate ?? "");
  });
});
