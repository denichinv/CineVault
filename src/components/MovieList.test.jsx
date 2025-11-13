import { fireEvent, render, screen, waitFor } from "@testing-library/react";
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

    expect(screen.getByText("7.8")).toBeInTheDocument();
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
  it("should filter movies by rating when filter button clicked", async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ results: mockMovies }),
    });

    render(<MovieList category="popular" />);

    await waitFor(() => {
      expect(screen.getByText("8.5")).toBeInTheDocument();
    });

    expect(screen.getByText("8.5")).toBeInTheDocument();
    expect(screen.getByText("6.2")).toBeInTheDocument();
    expect(screen.getByText("7.8")).toBeInTheDocument();

    fireEvent.click(screen.getByText("7+"));

    expect(screen.getByText("8.5")).toBeInTheDocument();
    expect(screen.getByText("7.8")).toBeInTheDocument();
    expect(screen.queryByText("6.2")).not.toBeInTheDocument();
  });
  it("should sort movies by selected order from the dropdowns", async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ results: mockMovies }),
    });

    render(<MovieList category="popular" />);

    await waitFor(() => {
      expect(screen.getByText("8.5")).toBeInTheDocument();
    });

    const sortDropdowns = screen.getAllByRole("combobox");
    const sortByDropdown = sortDropdowns[0];

    fireEvent.change(sortByDropdown, { target: { value: "rating" } });

    expect(screen.getByText("8.5")).toBeInTheDocument();
    expect(screen.getByText("7.8")).toBeInTheDocument();
    expect(screen.getByText("6.2")).toBeInTheDocument();
  });
  it("should display 'no movies found' message when no movies match filter", async () => {
    const lowRatedMovies = [
      {
        id: 1,
        poster_path: "/fake.jpg",
        vote_average: 6.5,
        release_date: "2024-01-15",
        original_title: "Low Movie 1",
      },
      {
        id: 2,
        poster_path: "/fake2.jpg",
        vote_average: 7.2,
        release_date: "2024-02-20",
        original_title: "Low Movie 2",
      },
    ];

    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ results: lowRatedMovies }),
    });

    render(<MovieList category="popular" />);

    await waitFor(() => {
      expect(screen.getByText("6.5")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("8+"));

    expect(
      screen.getByText(/No movies found above this rating!/i)
    ).toBeInTheDocument();

    expect(screen.queryByText("6.5")).not.toBeInTheDocument();
    expect(screen.queryByText("7.2")).not.toBeInTheDocument();
  });

  it("should toggle filter off when clicking active filter", async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ results: mockMovies }),
    });

    render(<MovieList category="popular" />);

    await waitFor(() => {
      expect(screen.getByText("8.5")).toBeInTheDocument();
    });
    const filter7 = screen.getByText("7+");
    fireEvent.click(filter7);
    expect(screen.queryByText("6.2")).not.toBeInTheDocument();
    fireEvent.click(filter7);
    await waitFor(() => {
      expect(screen.getByText("6.2")).toBeInTheDocument();
    });
  });

  it("should sort movies by date", async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ results: mockMovies }),
    });

    render(<MovieList category="popular" />);

    await waitFor(() => {
      expect(screen.getByText("8.5")).toBeInTheDocument();
    });

    const sortDropdown = screen.getAllByRole("combobox")[0];
    fireEvent.change(sortDropdown, { target: { value: "date" } });

    expect(screen.getByText("8.5")).toBeInTheDocument();
    expect(screen.getByText("6.2")).toBeInTheDocument();
    expect(screen.getByText("7.8")).toBeInTheDocument();
  });
  it("should sort movies in ascending alphabetical order", async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ results: mockMovies }),
    });

    render(<MovieList category="popular" />);

    await waitFor(() => {
      expect(screen.getByText("8.5")).toBeInTheDocument();
    });

    const orderDropdown = screen.getAllByRole("combobox")[1];
    fireEvent.change(orderDropdown, { target: { value: "ascending" } });

    expect(screen.getByText("8.5")).toBeInTheDocument();
    expect(screen.getByText("6.2")).toBeInTheDocument();
  });
  it("should sort movies in descending alphabetical order", async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ results: mockMovies }),
    });

    render(<MovieList category="popular" />);

    await waitFor(() => {
      expect(screen.getByText("8.5")).toBeInTheDocument();
    });

    const orderDropdown = screen.getAllByRole("combobox")[1];
    fireEvent.change(orderDropdown, { target: { value: "descending" } });

    expect(screen.getByText("8.5")).toBeInTheDocument();
    expect(screen.getByText("6.2")).toBeInTheDocument();
  });
});
