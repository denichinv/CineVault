import React, { useEffect, useState } from "react";
import "./movieList.css";
import MovieCard from "./MovieCard";
import FilterMovies from "./FilterMovies";
import SortMovies from "./SortMovies";
import MovieCardSkeleton from "./MovieCardSkeleton";
import SearchMovies from "./SearchMovies";
const MovieList = ({
  category,
  query,
  setQuery,
  searchQuery,
  setSearchQuery,
}) => {
  const [allMoviesFiltered, setAllMoviesFiltered] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [givingRating, setRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [resultsQuery, setResultsQuery] = useState("");
  useEffect(() => {
    let ignore = false;

    const fetchMovies = async () => {
      const API_KEY = import.meta.env.VITE_TMDB_API_KEY?.trim();

      if (!API_KEY) {
        setLoading(false);
        setError(
          import.meta.env.DEV
            ? "TMDB API key is missing. Add VITE_TMDB_API_KEY to a local .env file."
            : "Movies are temporarily unavailable. Please try again later.",
        );
        return;
      }

      setError("");
      setLoading(true);

      try {
        const endpoint = searchQuery
          ? "https://api.themoviedb.org/3/search/movie"
          : `https://api.themoviedb.org/3/movie/${category}`;

        const params = new URLSearchParams({
          api_key: API_KEY,
        });

        if (searchQuery) {
          params.set("query", searchQuery);
        }

        const res = await fetch(`${endpoint}?${params.toString()}`);
        if (!res.ok) {
          throw new Error(`TMDB request failed with status ${res.status}`);
        }

        const data = await res.json();

        if (!Array.isArray(data?.results)) {
          throw new Error("Invalid TMDB response");
        }

        if (ignore) return;

        setAllMoviesFiltered(data.results);
        setResultsQuery(searchQuery);
        setLoading(false);
      } catch (err) {
        if (ignore) return;

        console.error("Movie fetch error:", err);
        setAllMoviesFiltered([]);
        setLoading(false);
        setError("Could not load movies right now. Please try again later.");
      }
    };

    fetchMovies();

    return () => {
      ignore = true;
    };
  }, [category, searchQuery]);

  const handleFilter = (rating) => {
    setRating((currentRating) => (currentRating === rating ? 0 : rating));
  };

  const handleSort = (e) => {
    setSortBy(e.target.value);
  };
  const suggestions =
    !loading &&
    !error &&
    searchQuery !== "" &&
    query.trim() === searchQuery &&
    resultsQuery === searchQuery
      ? allMoviesFiltered.slice(0, 5)
      : [];
  const movies = allMoviesFiltered.filter(
    (movie) => movie.vote_average >= givingRating,
  );

  switch (sortBy) {
    case "date":
      movies.sort(
        (a, b) => new Date(b.release_date) - new Date(a.release_date),
      );
      break;
    case "rating":
      movies.sort((a, b) => b.vote_average - a.vote_average);
      break;
    case "ascending":
      movies.sort((a, b) => a.original_title.localeCompare(b.original_title));
      break;
    case "descending":
      movies.sort((a, b) => b.original_title.localeCompare(a.original_title));
      break;
    default:
      break;
  }

  return (
    <section className="movie_list">
      <header className="movieheader">
        <h2 className="movieh2head">
          {searchQuery
            ? `Results for “${searchQuery}”`
            : {
                popular: "Popular",
                top_rated: "Top-rated",
                upcoming: "Upcoming",
              }[category]}
        </h2>
        <SearchMovies
          query={query}
          onQueryChange={setQuery}
          onSearch={setSearchQuery}
          suggestions={suggestions}
        />
      </header>
      <div className="movie_toolbar">
        <div className="movie_rating_controls">
          <span className="movie_filter_label">Minimum rating</span>
          <FilterMovies
            givingRating={givingRating}
            onRatingButtonClick={handleFilter}
            ratings={[6, 7, 8]}
          />
        </div>
        <SortMovies sortBy={sortBy} handleSort={handleSort} />
      </div>
      <div className="movie_shows">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => <MovieCardSkeleton key={i} />)
        ) : error ? (
          <p className="noMovies" role="alert">
            {error}
          </p>
        ) : movies.length > 0 ? (
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <p className="noMovies" role="status">
            {allMoviesFiltered.length === 0
              ? searchQuery
                ? `No movies found for “${searchQuery}”. Try another title.`
                : "No movies available in this category."
              : "No movies match this rating. Try a lower rating or turn off the filter."}
          </p>
        )}
      </div>
    </section>
  );
};

export default MovieList;
