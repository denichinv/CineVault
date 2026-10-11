import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import MovieCard from "./MovieCard";

describe("MovieCard", () => {
  const movie = {
    id: 123,
    title: "Example Movie",
    original_title: "Original Title",
    poster_path: "/abc123.jpg",
    vote_average: 7.8,
    release_date: "2024-01-15",
  };

  it("shows the title, release year, and rating", () => {
    render(<MovieCard movie={movie} />);

    expect(
      screen.getByRole("heading", { name: "Example Movie" }),
    ).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
    expect(screen.getByText("7.8")).toBeInTheDocument();
  });

  it("provides a named link to TMDB", () => {
    render(<MovieCard movie={movie} />);

    const link = screen.getByRole("link", {
      name: "Example Movie — view on TMDB (opens in a new tab)",
    });

    expect(link).toHaveAttribute(
      "href",
      "https://www.themoviedb.org/movie/123",
    );
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("loads the poster from the correct URL", () => {
    render(<MovieCard movie={movie} />);

    expect(screen.getByAltText("")).toHaveAttribute(
      "src",
      "https://image.tmdb.org/t/p/w500/abc123.jpg",
    );
  });

  it("shows a fallback when the poster path is missing", () => {
    render(<MovieCard movie={{ ...movie, poster_path: null }} />);

    expect(screen.getByText("Poster unavailable")).toBeInTheDocument();
    expect(screen.queryByAltText("")).not.toBeInTheDocument();
  });

  it("replaces a broken poster with the fallback", () => {
    render(<MovieCard movie={movie} />);

    fireEvent.error(screen.getByAltText(""));

    expect(screen.getByText("Poster unavailable")).toBeInTheDocument();
    expect(screen.queryByAltText("")).not.toBeInTheDocument();
  });

  it("tries a different poster after the previous one fails", () => {
    const { rerender } = render(<MovieCard movie={movie} />);

    fireEvent.error(screen.getByAltText(""));

    rerender(
      <MovieCard movie={{ ...movie, poster_path: "/replacement.jpg" }} />,
    );

    expect(screen.getByAltText("")).toHaveAttribute(
      "src",
      "https://image.tmdb.org/t/p/w500/replacement.jpg",
    );
    expect(screen.queryByText("Poster unavailable")).not.toBeInTheDocument();
  });

  it("uses the original title when the display title is missing", () => {
    render(<MovieCard movie={{ ...movie, title: "" }} />);

    expect(
      screen.getByRole("heading", { name: "Original Title" }),
    ).toBeInTheDocument();
  });

  it("handles missing title, date, and rating", () => {
    render(<MovieCard movie={{ id: 123 }} />);

    expect(
      screen.getByRole("heading", { name: "Untitled movie" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Release date unknown")).toBeInTheDocument();
    expect(screen.getByText("Not rated")).toBeInTheDocument();
  });
});
