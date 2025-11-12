import { expect, it, vi } from "vitest";
import SortMovies from "./SortMovies";
import { fireEvent, render, screen } from "@testing-library/react";

describe("SortMovies component test", () => {
  const mockCallback = vi.fn();

  it("Both dropdowns render", () => {
    render(<SortMovies sortBy={""} handleSort={mockCallback} />);

    expect(screen.getAllByRole("combobox")[0]).toHaveTextContent("Sort By");
    expect(screen.getAllByRole("combobox")[1]).toHaveTextContent("Ascending");
  });
  it("Checks if the options exist", () => {
    render(<SortMovies sortBy={""} handleSort={mockCallback} />);

    expect(screen.getByRole("option", { name: "Sort By" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Date" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Rating" })).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Ascending" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Descending" })
    ).toBeInTheDocument();
  });

  it("Displays current sortBy value", () => {
    render(<SortMovies sortBy="rating" handleSort={mockCallback} />);

    const dropdowns = screen.getAllByRole("combobox");
    expect(dropdowns[0]).toHaveValue("rating");
  });

  it("Call handlesort on change", () => {
    render(<SortMovies sortBy="" handleSort={mockCallback} />);

    const dropdown = screen.getAllByRole("combobox")[0];

    fireEvent.change(dropdown, { target: { value: "date" } });

    expect(mockCallback).toHaveBeenCalledOnce();
  });
});
