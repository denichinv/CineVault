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

test("category navigation clears search, including the active category", async ({
  page,
}) => {
  await page.route("https://api.themoviedb.org/3/search/movie?*", (route) =>
    route.fulfill({
      json: {
        results: [
          {
            id: 603,
            original_title: "The Matrix",
            vote_average: 8.2,
            release_date: "1999-03-31",
            poster_path: "/matrix.svg",
          },
        ],
      },
    }),
  );

  await page.goto("/");

  const input = page.getByRole("searchbox", { name: "Search movies" });
  const titles = page.getByRole("heading", { level: 3 });

  await expect(titles).toHaveText(["Bravo", "Zulu", "Alpha"]);

  // First switch categories, then click that same category again.
  for (let attempt = 0; attempt < 2; attempt += 1) {
    await input.fill("The Matrix");
    await input.press("Enter");
    await expect(titles).toHaveText(["The Matrix"]);

    const categoryRequest = page.waitForRequest((request) => {
      const url = new URL(request.url());
      return url.pathname === "/3/movie/top_rated";
    });

    await page.getByRole("link", { name: "Top-Rated", exact: true }).click();
    await categoryRequest;

    await expect(input).toHaveValue("");
    await expect(
      page.getByRole("heading", { level: 2, name: "Top-rated", exact: true }),
    ).toBeVisible();
    await expect(titles).toHaveText(["Bravo", "Zulu", "Alpha"]);
  }
});
test("searches while typing, restores on deletion, and cancels on navigation", async ({
  page,
}) => {
  const searchQueries: string[] = [];

  await page.route(
    "https://api.themoviedb.org/3/search/movie?*",
    async (route) => {
      const url = new URL(route.request().url());
      searchQueries.push(url.searchParams.get("query") ?? "");

      await route.fulfill({
        json: {
          results: [
            {
              id: 603,
              original_title: "The Matrix",
              vote_average: 8.2,
              release_date: "1999-03-31",
              poster_path: "/matrix.svg",
            },
          ],
        },
      });
    },
  );

  await page.goto("/");

  const input = page.getByRole("searchbox", { name: "Search movies" });
  const titles = page.getByRole("heading", { level: 3 });

  await expect(titles).toHaveText(["Bravo", "Zulu", "Alpha"]);

  // No Enter or Search button: typing alone should load results.
  await input.fill("Matrix");
  await expect(titles).toHaveText(["The Matrix"]);
  expect(searchQueries).toEqual(["Matrix"]);

  // Deleting the text should restore the category.
  await input.fill("");
  await expect(titles).toHaveText(["Bravo", "Zulu", "Alpha"]);

  // Navigate before the pending search timer fires.
  await input.fill("Inception");
  await page.getByRole("link", { name: "Top-Rated", exact: true }).click();

  await expect(input).toHaveValue("");
  await expect(
    page.getByRole("heading", {
      level: 2,
      name: "Top-rated",
      exact: true,
    }),
  ).toBeVisible();

  // Wait beyond the debounce to catch an incorrectly surviving timer.
  await page.waitForTimeout(400);

  expect(searchQueries).toEqual(["Matrix"]);
  await expect(titles).toHaveText(["Bravo", "Zulu", "Alpha"]);
});
