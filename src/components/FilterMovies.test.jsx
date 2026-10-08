import FilterMovies from "./FilterMovies";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, test, vi } from "vitest";
import userEvent from "@testing-library/user-event";

describe("FilterMovies component test", () => {
  const mockCallback = vi.fn();
  const ratings = [6, 7, 8];

  test("should render all rating filter buttons ", () => {
    render(
      <FilterMovies
        onRatingButtonClick={mockCallback}
        ratings={ratings}
        givingRating={0}
      />,
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
      />,
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
      />,
    );

    fireEvent.click(screen.getByText("7+"));

    expect(mockCallback).toHaveBeenCalledWith(7);
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });
  it("supports Tab, Enter, and Space and exposes selection state", async () => {
    const user = userEvent.setup();
    const onRatingButtonClick = vi.fn();

    const { rerender } = render(
      <FilterMovies
        ratings={[6, 7, 8]}
        givingRating={0}
        onRatingButtonClick={onRatingButtonClick}
      />,
    );

    const button = screen.getByRole("button", { name: "6+" });

    expect(button).toHaveAttribute("aria-pressed", "false");

    await user.tab();
    expect(button).toHaveFocus();

    await user.keyboard("{Enter}");
    expect(onRatingButtonClick).toHaveBeenNthCalledWith(1, 6);

    rerender(
      <FilterMovies
        ratings={[6, 7, 8]}
        givingRating={6}
        onRatingButtonClick={onRatingButtonClick}
      />,
    );

    expect(button).toHaveAttribute("aria-pressed", "true");

    await user.keyboard(" ");
    expect(onRatingButtonClick).toHaveBeenNthCalledWith(2, 6);
    expect(onRatingButtonClick).toHaveBeenCalledTimes(2);
  });
});
