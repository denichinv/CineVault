import React, { useEffect, useState } from "react";
import "./movieList.css";
import MovieCard from "./MovieCard";
import FilterMovies from "./FilterMovies";
import SortMovies from "./SortMovies";
import MovieCardSkeleton from "./MovieCardSkeleton";
const MovieList = ({ category }) => {
  const [allMoviesFiltered, setAllMoviesFiltered] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [givingRating, setRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchmovies(category);
  }, [category]);

  const fetchmovies = async (selectedCategory = "popular") => {
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY?.trim();

    if (!API_KEY) {
      setLoading(false);
      setError(import.meta.env.DEV
        ? "TMDB API key is missing. Add VITE_TMDB_API_KEY to a local .env file."
        : "Movies are temporarily unavailable. Please try again later.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const endpoint =
        selectedCategory === "upcoming"
          ? "https://api.themoviedb.org/3/movie/upcoming"
          : `https://api.themoviedb.org/3/movie/${selectedCategory}`;

      const res = await fetch(`${endpoint}?api_key=${API_KEY}`);

      if (!res.ok) {
        throw new Error(`TMDB request failed with status ${res.status}`);
      }

      const data = await res.json();
      if (!Array.isArray(data?.results)) {
        throw new Error("Invalid TMDB response");
      }
      const results = data.results;
      setAllMoviesFiltered(results);
      setLoading(false);
    } catch (err) {
      console.error("Movie fetch error:", err);
      setAllMoviesFiltered([]);
      setLoading(false);
      setError("Could not load movies right now. Please try again later.");
    }
  };

  const handleFilter = (rating) => {
    setRating((currentRating) => (currentRating === rating ? 0 : rating));
  };

  const handleSort = (e) => {
    setSortBy(e.target.value);
  };

  const movies = allMoviesFiltered.filter(
    (movie) => movie.vote_average >= givingRating
  );

  switch (sortBy) {
    case "date":
      movies.sort(
        (a, b) => new Date(b.release_date) - new Date(a.release_date)
      );
      break;
    case "rating":
      movies.sort((a, b) => b.vote_average - a.vote_average);
      break;
    case "ascending":
      movies.sort((a, b) =>
        a.original_title.localeCompare(b.original_title)
      );
      break;
    case "descending":
      movies.sort((a, b) =>
        b.original_title.localeCompare(a.original_title)
      );
      break;
    default:
      break;
  }

  return (
    <section className="movie_list">
      <header className="movieheader">
        <h2 className="center_el movieh2head">
          {category.toUpperCase().replace("_", "-")}
        </h2>
        <div className="center_el movie_listadd">
          <FilterMovies
            givingRating={givingRating}
            onRatingButtonClick={handleFilter}
            ratings={[6, 7, 8]}
          />
          <SortMovies sortBy={sortBy} handleSort={handleSort} />
        </div>
      </header>
      <div className="movie_shows">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => <MovieCardSkeleton key={i} />)
        ) : error ? (
          <p className="noMovies" role="alert">{error}</p>
        ) : movies.length > 0 ? (
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <p className="noMovies">No movies found above this rating!</p>
        )}
      </div>
    </section>
  );
};

export default MovieList;
