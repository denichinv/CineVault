import { test, expect } from "./fixtures";

test.describe("CineVault sorting", () => {
  test("sorts titles in both directions", async ({ page }) => {
    await page.goto("/");

    const titles = page.getByRole("heading", { level: 3 });
    await expect(titles).toHaveCount(3);

    const sort = page.getByRole("combobox", { name: "Sort movies" });

    await sort.selectOption("ascending");
    await expect(titles).toHaveText(["Alpha", "Bravo", "Zulu"]);

    await sort.selectOption("descending");
    await expect(titles).toHaveText(["Zulu", "Bravo", "Alpha"]);
  });

  test("preserves sorting and filtering together", async ({ page }) => {
    await page.goto("/");

    const titles = page.getByRole("heading", { level: 3 });
    await expect(titles).toHaveCount(3);

    const sort = page.getByRole("combobox", { name: "Sort movies" });

    await sort.selectOption("date");
    await expect(titles).toHaveText(["Zulu", "Alpha", "Bravo"]);

    await sort.selectOption("rating");
    await expect(titles).toHaveText(["Alpha", "Bravo", "Zulu"]);

    await page.getByRole("button", { name: "7+", exact: true }).click();
    await expect(titles).toHaveText(["Alpha", "Bravo"]);

    await sort.selectOption("");
    await expect(titles).toHaveText(["Bravo", "Alpha"]);
  });
});
