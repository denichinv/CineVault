import { expect, it, vi } from "vitest";
import Header from "./Header";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Header component tests ", () => {
  const setCategoryMock = vi.fn();
  it("Renders the logo and all navigation links", () => {
    render(<Header category={""} setCategory={setCategoryMock} />);
    const nav = screen.getAllByRole("link");

    expect(screen.getByRole("heading")).toHaveTextContent("CineVault");
    expect(nav.length).toBe(3);
  });
  it("Testing the active state ", () => {
    const { rerender } = render(
      <Header category="popular" setCategory={setCategoryMock} />
    );
    const nav = screen.getAllByRole("link");

    expect(nav[0]).toHaveClass("active");

    rerender(<Header category={"top_rated"} setCategory={setCategoryMock} />);
    expect(nav[1]).toHaveClass("active");
    rerender(<Header category={"upcoming"} setCategory={setCategoryMock} />);
    expect(nav[2]).toHaveClass("active");
  });
  it("should call setCategory when links are clicked", () => {
    render(<Header category="" setCategory={setCategoryMock} />);

    fireEvent.click(screen.getByRole("link", { name: "Top-Rated" }));
    expect(setCategoryMock).toHaveBeenCalledWith("top_rated");

    fireEvent.click(screen.getByRole("link", { name: "Upcoming Releases" }));
    expect(setCategoryMock).toHaveBeenCalledWith("upcoming");
  });
  it("should apply active class based on category prop", () => {
    const { rerender } = render(
      <Header category="popular" setCategory={setCategoryMock} />
    );

    expect(screen.getByRole("link", { name: "Trending Now" })).toHaveClass(
      "active"
    );

    rerender(<Header category="top_rated" setCategory={setCategoryMock} />);
    expect(screen.getByRole("link", { name: "Top-Rated" })).toHaveClass(
      "active"
    );

    rerender(<Header category="upcoming" setCategory={setCategoryMock} />);
    expect(screen.getByRole("link", { name: "Upcoming Releases" })).toHaveClass(
      "active"
    );
  });

  it("should have href='#' on all navigation links", () => {
    render(<Header category="" setCategory={setCategoryMock} />);

    expect(screen.getByRole("link", { name: "Trending Now" })).toHaveAttribute(
      "href",
      "#"
    );
    expect(screen.getByRole("link", { name: "Top-Rated" })).toHaveAttribute(
      "href",
      "#"
    );
    expect(
      screen.getByRole("link", { name: "Upcoming Releases" })
    ).toHaveAttribute("href", "#");
  });
});
