import { render, screen } from "@testing-library/react";
import MovieCard from "./MovieCard";

describe("MovieCard", () => {
  const mockMovie = {
    id: 123,
    poster_path: "/abc123.jpg",
    vote_average: 7.8,
    release_date: "2024-01-15",
  };

  it("should render movie poster image", () => {
    render(<MovieCard movie={mockMovie} />);

    const posterImage = screen.getByAltText("moviedetails");
    expect(posterImage).toBeInTheDocument();
    expect(posterImage).toHaveAttribute(
      "src",
      expect.stringContaining(mockMovie.poster_path)
    );
  });

  it("should display movie rating", () => {
    render(<MovieCard movie={mockMovie} />);

    expect(
      screen.getByText(mockMovie.vote_average.toFixed(1))
    ).toBeInTheDocument();
  });

  it("should display release date", () => {
    render(<MovieCard movie={mockMovie} />);

    expect(screen.getByText(mockMovie.release_date)).toBeInTheDocument();
  });

  it("should have correct link to TMDB", () => {
    render(<MovieCard movie={mockMovie} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute(
      "href",
      `https://www.themoviedb.org/movie/${mockMovie.id}`
    );
  });
});
