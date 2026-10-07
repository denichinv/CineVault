import { test as base, expect } from "@playwright/test";

// Different title, date, and rating orders make each sorting mode observable.
const movies = [
  { id: 1, original_title: "Bravo", vote_average: 7.2, release_date: "2024-01-01", poster_path: "/bravo.svg" },
  { id: 2, original_title: "Zulu", vote_average: 6.5, release_date: "2024-03-01", poster_path: "/zulu.svg" },
  { id: 3, original_title: "Alpha", vote_average: 8.8, release_date: "2024-02-01", poster_path: "/alpha.svg" },
];

export const test = base.extend({
  page: async ({ page }, use) => {
    await page.route("https://api.themoviedb.org/**", (route) =>
      route.fulfill({ json: { results: movies } })
    );
    await page.route("https://image.tmdb.org/**", (route) =>
      route.fulfill({
        contentType: "image/svg+xml",
        body: '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="450"><rect width="300" height="450" fill="#333"/></svg>',
      })
    );
    await page.route("https://static.vecteezy.com/**", (route) => route.abort());
    await use(page);
  },
});

export { expect };
