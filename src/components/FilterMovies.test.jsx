import FilterMovies from "./FilterMovies";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, vi } from "vitest";

describe("FilterMovies component test", () => {
  const mockCallback = vi.fn();
  const ratings = [6, 7, 8];

  test("should render all rating filter buttons ", () => {
    render(
      <FilterMovies
        onRatingButtonClick={mockCallback}
        ratings={ratings}
        givingRating={0}
      />
    );

    expect(screen.getByText("6+")).toBeInTheDocument();
    expect(screen.getByText("7+")).toBeInTheDocument();
    expect(screen.getByText("8+")).toBeInTheDocument();
  });

  it("should apply active class to button matching givingRating prop", () => {
    render(
      <FilterMovies
        onRatingButtonClick={mockCallback}
        ratings={ratings}
        givingRating={7}
      />
    );

    expect(screen.getByText("6+")).not.toHaveClass("active");
    expect(screen.getByText("7+")).toHaveClass("active");
    expect(screen.getByText("8+")).not.toHaveClass("active");
  });
  it("should call onRatingButtonClick with correct rating when clicked", () => {
    render(
      <FilterMovies
        onRatingButtonClick={mockCallback}
        ratings={ratings}
        givingRating={0}
      />
    );

    fireEvent.click(screen.getByText("7+"));

    expect(mockCallback).toHaveBeenCalledWith(7);
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });
});
