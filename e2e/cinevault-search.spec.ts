import { test, expect } from "./fixtures";

test("searches with Enter and restores the category with Clear", async ({
  page,
}) => {
  await page.route(
    "https://api.themoviedb.org/3/search/movie?*",
    async (route) => {
      const url = new URL(route.request().url());

      await route.fulfill({
        json: {
          results:
            url.searchParams.get("query") === "The Matrix"
              ? [
                  {
                    id: 603,
                    title: "The Matrix",
                    original_title: "The Matrix",
                    vote_average: 8.2,
                    release_date: "1999-03-31",
                    poster_path: "/matrix.svg",
                  },
                ]
              : [],
        },
      });
    },
  );

  await page.goto("/");

  const titles = page.getByRole("heading", { level: 3 });
  await expect(titles).toHaveText(["Bravo", "Zulu", "Alpha"]);

  const input = page.getByRole("searchbox", { name: "Search movies" });

  await input.fill("The Matrix");
  await input.press("Enter");

  await expect(titles).toHaveText(["The Matrix"]);
  await expect(
    page.getByRole("heading", {
      level: 2,
      name: "Results for “The Matrix”",
    }),
  ).toBeVisible();

  await page.getByRole("button", { name: "Clear", exact: true }).click();

  await expect(input).toHaveValue("");
  await expect(input).toBeFocused();
  await expect(titles).toHaveText(["Bravo", "Zulu", "Alpha"]);
  await expect(
    page.getByRole("heading", { level: 2, name: "Popular", exact: true }),
  ).toBeVisible();
});
