import { test, expect } from "./fixtures";

test("CineVault: user can apply rating filter", async ({ page }) => {
  await page.goto("/");

  const moviesSection = page.locator(".movie_shows");
  await expect(moviesSection.first()).toBeVisible();

  await expect(page.locator(".movie_show")).toHaveCount(3);
  await page.getByText("8+").click();

  await expect(page.locator(".movierating")).toHaveText(["8.8"]);
});
