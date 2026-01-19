import { test, expect } from "@playwright/test";

test("CineVault: user can apply rating filter", async ({ page }) => {
  await page.goto("/");

  const moviesSection = page.locator(".movie_shows");
  await expect(moviesSection.first()).toBeVisible();

  await page.getByText("8+").click();

  await expect(page.locator("text=POPULAR")).toBeVisible();
});
