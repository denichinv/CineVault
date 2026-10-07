import { test, expect } from "../fixtures";

test.describe("CineVault sorting", () => {
  test("sorts titles in both directions", async ({ page }) => {
    await page.goto("/");
    const cards = page.locator(".movie_show");
    await expect(cards).toHaveCount(3);
    const sort = page.getByRole("combobox", { name: "Sort movies" });
    await sort.selectOption("ascending");
    await expect(page.locator(".movierating")).toHaveText(["8.8", "7.2", "6.5"]);
    await sort.selectOption("descending");
    await expect(page.locator(".movierating")).toHaveText(["6.5", "7.2", "8.8"]);
  });

  test("sorts by date and rating, preserving sorting after filtering", async ({ page }) => {
    await page.goto("/");
    const ratings = page.locator(".movierating");
    await expect(ratings).toHaveCount(3);
    const sort = page.getByRole("combobox", { name: "Sort movies" });
    await sort.selectOption("date");
    await expect(ratings).toHaveText(["6.5", "8.8", "7.2"]);
    await sort.selectOption("rating");
    await expect(ratings).toHaveText(["8.8", "7.2", "6.5"]);
    await page.getByText("7+", { exact: true }).click();
    await expect(ratings).toHaveText(["8.8", "7.2"]);
    await sort.selectOption("");
    await expect(ratings).toHaveText(["7.2", "8.8"]);
  });
});
