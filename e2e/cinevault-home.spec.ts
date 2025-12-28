import { test, expect } from "@playwright/test";

test.describe("CineVault - Home", () => {
  test("home page loads and shows movies", async ({ page }) => {
    await page.goto("https://cinevaultmoviesapp.netlify.app/");

    await expect(
      page.getByRole("navigation").getByRole("heading", { name: "CineVault" })
    ).toBeVisible();
    const movieCards = page.locator(".movie_show");
    await expect(movieCards.first()).toBeVisible();
  });
});
