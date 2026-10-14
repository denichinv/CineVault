import { test, expect } from "./fixtures";

for (const width of [1280, 375]) {
  test(`suggestions fit a ${width}px viewport and show at most five matches`, async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({ width, height: 800 });
    const matches = Array.from({ length: 7 }, (_, index) => ({
      id: 100 + index,
      original_title:
        index === 0
          ? "A Very Long Movie Title That Should Wrap Inside the Suggestions Dropdown"
          : `Movie ${index + 1}`,
      vote_average: 8,
      release_date: index === 0 ? "" : "2024-01-01",
      poster_path: index === 0 ? null : "/poster.svg",
    }));
    await page.route("https://api.themoviedb.org/3/search/movie?*", (route) =>
      route.fulfill({ json: { results: matches } }),
    );
    await page.goto("/");
    const input = page.getByRole("combobox", { name: "Search movies" });
    await input.fill("Movie");
    const list = page.getByRole("listbox", { name: "Movie suggestions" });
    await expect(list.getByRole("option")).toHaveCount(5);
    await expect(list.getByText("Release date unknown")).toBeVisible();
    await expect
      .poll(async () => {
        const popup = await list.boundingBox();
        const field = await input.boundingBox();
        const controls = await page.locator(".movie_search_controls").boundingBox();
        return (
          !!popup &&
          !!field &&
          !!controls &&
          popup.x >= 0 &&
          popup.x + popup.width <= width &&
          popup.y >= 0 &&
          popup.y + popup.height <= 800 &&
          (popup.y >= controls.y + controls.height ||
            popup.y + popup.height <= controls.y) &&
          Math.abs(popup.width - field.width) <= 1
        );
      })
      .toBe(true);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    await page.screenshot({
      path: testInfo.outputPath(`suggestions-${width}.png`),
      fullPage: true,
    });
    await list.getByRole("option").last().click();
    await expect(input).toHaveValue("Movie 5");
    await expect(list).toBeHidden();
  });
}

for (const selection of ["mouse", "keyboard"] as const) {
  test(`selects a movie suggestion with the ${selection}`, async ({ page }) => {
    const matches = [
      {
        id: 603,
        original_title: "The Matrix",
        vote_average: 8.2,
        release_date: "1999-03-31",
        poster_path: "/matrix.svg",
      },
      {
        id: 604,
        original_title: "The Matrix Reloaded",
        vote_average: 7.2,
        release_date: "2003-05-15",
        poster_path: null,
      },
    ];
    const queries: string[] = [];
    await page.route(
      "https://api.themoviedb.org/3/search/movie?*",
      async (route) => {
        const query =
          new URL(route.request().url()).searchParams.get("query") ?? "";
        queries.push(query);
        await route.fulfill({
          json: {
            results:
              query === "Matrix"
                ? matches
                : matches.filter((movie) => movie.original_title === query),
          },
        });
      },
    );
    await page.goto("/");
    const input = page.getByRole("combobox", { name: "Search movies" });
    const list = page.getByRole("listbox", { name: "Movie suggestions" });
    await input.fill("Matrix");
    await expect(list.getByRole("option")).toHaveCount(2);
    expect(queries).toEqual(["Matrix"]);

    await input.press("Escape");
    await expect(list).toBeHidden();
    await expect(input).toHaveValue("Matrix");
    await expect(input).toBeFocused();
    await input.press("ArrowDown");
    await expect(list).toBeVisible();

    if (selection === "mouse") {
      await list
        .getByRole("option", { name: "The Matrix Reloaded 2003", exact: true })
        .click();
    } else {
      await input.press("ArrowDown");
      await input.press("ArrowUp");
      const first = list.getByRole("option").first();
      await expect(input).toHaveAttribute(
        "aria-activedescendant",
        (await first.getAttribute("id"))!,
      );
      await input.press("Enter");
    }
    const expectedTitle =
      selection === "mouse" ? "The Matrix Reloaded" : "The Matrix";
    await expect(input).toHaveValue(expectedTitle);
    await expect(list).toBeHidden();
    await expect(page.getByRole("heading", { level: 3 })).toHaveText([
      expectedTitle,
    ]);
    expect(queries).toEqual(["Matrix", expectedTitle]);
  });
}

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

  const input = page.getByRole("combobox", { name: "Search movies" });

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

  const input = page.getByRole("combobox", { name: "Search movies" });
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

  const input = page.getByRole("combobox", { name: "Search movies" });
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
