import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import SortMovies from "./SortMovies";

describe("SortMovies", () => {
  it("renders one labelled sorting dropdown", () => {
    render(<SortMovies sortBy="" handleSort={vi.fn()} />);

    expect(screen.getAllByRole("combobox")).toHaveLength(1);
    expect(screen.getByRole("combobox", { name: "Sort movies" })).toHaveValue(
      "",
    );
  });

  it("offers all supported sorting options", () => {
    render(<SortMovies sortBy="" handleSort={vi.fn()} />);

    const options = screen.getAllByRole("option");

    expect(options.map((option) => option.textContent)).toEqual([
      "Default order",
      "Newest releases",
      "Highest rated",
      "Title A–Z",
      "Title Z–A",
    ]);
  });

  it("displays the selected sorting option", () => {
    render(<SortMovies sortBy="rating" handleSort={vi.fn()} />);

    expect(screen.getByRole("combobox", { name: "Sort movies" })).toHaveValue(
      "rating",
    );
  });

  it("passes the selected value to the change handler", () => {
    const onSelection = vi.fn();
    const handleSort = (event) => onSelection(event.target.value);

    render(<SortMovies sortBy="" handleSort={handleSort} />);

    fireEvent.change(screen.getByRole("combobox", { name: "Sort movies" }), {
      target: { value: "date" },
    });

    expect(onSelection).toHaveBeenCalledExactlyOnceWith("date");
  });
});
