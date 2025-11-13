import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import MovieList from "./MovieList";

describe("MovieList", () => {
  const mockMovies = [
    {
      id: 1,
      poster_path: "/fake-poster-1.jpg",
      vote_average: 8.5,
      release_date: "2024-01-15",
      original_title: "High Rated Movie",
    },
    {
      id: 2,
      poster_path: "/fake-poster-2.jpg",
      vote_average: 6.2,
      release_date: "2024-02-20",
      original_title: "Low Rated Movie",
    },
    {
      id: 3,
      poster_path: "/fake-poster-3.jpg",
      vote_average: 7.8,
      release_date: "2024-03-10",
      original_title: "Good Movie",
    },
  ];
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should display loading skeletons then show movies", async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ results: mockMovies }),
    });

    render(<MovieList category="popular" />);

    const skeletons = screen.getAllByText((_, element) => {
      return element?.className?.includes("skeleton");
    });
    expect(skeletons.length).toBeGreaterThan(0);

    await waitFor(() => {
      expect(screen.getByText("8.5")).toBeInTheDocument();
    });

    expect(screen.getByText("7.2")).toBeInTheDocument();
    expect(screen.getByText("2024-01-15")).toBeInTheDocument();
  });
  it("should fetch from popular endpoint", async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ results: mockMovies }),
    });

    render(<MovieList category="popular" />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("popular")
    );
  });

  it("should fetch from top_rated endpoint", async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ results: mockMovies }),
    });

    render(<MovieList category="top_rated" />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("top_rated")
    );
  });

  it("should fetch from upcoming endpoint", async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ results: mockMovies }),
    });

    render(<MovieList category="upcoming" />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("upcoming")
    );
  });
});
