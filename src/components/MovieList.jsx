import React, { useEffect, useState } from "react";
import "./movieList.css";
import MovieCard from "./MovieCard";
import FilterMovies from "./FilterMovies";
import SortMovies from "./SortMovies";
import MovieCardSkeleton from "./MovieCardSkeleton";
const MovieList = ({ category }) => {
  const [movies, setMovies] = useState([]);
  const [allMoviesFiltered, setAllMoviesFiltered] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [givingRating, setRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchmovies(category);
  }, [category]);

  const fetchmovies = async (selectedCategory = "popular") => {
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

    if (!API_KEY) {
      setLoading(false);
      setError("TMDB API key is missing. Add VITE_TMDB_API_KEY to a local .env file.");
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
      const results = Array.isArray(data.results) ? data.results : [];
      setMovies(results);
      setAllMoviesFiltered(results);
      setLoading(false);
    } catch (err) {
      console.error("Movie fetch error:", err);
      setMovies([]);
      setAllMoviesFiltered([]);
      setLoading(false);
      setError("Could not load movies right now. Please try again later.");
    }
  };

  const handleFilter = (rating) => {
    if (givingRating == rating) {
      setRating(0);
      setMovies(allMoviesFiltered);
    } else {
      setRating(rating);
      const filteredMovies = allMoviesFiltered.filter(
        (movie) => movie.vote_average >= rating
      );
      setMovies(filteredMovies);
    }
  };

  const handleSort = (e) => {
    const value = e.target.value;
    setSortBy(value);

    if (value === "date") {
      const sortedMovies = [...movies].sort(
        (a, b) => new Date(b.release_date) - new Date(a.release_date)
      );
      setMovies(sortedMovies);
    } else if (value === "rating") {
      const sortedMovies = [...movies].sort(
        (a, b) => b.vote_average - a.vote_average
      );
      setMovies(sortedMovies);
    } else if (value === "ascending") {
      const sortedMovies = [...movies].sort((a, b) =>
        a.original_title.localeCompare(b.original_title)
      );
      setMovies(sortedMovies);
    } else if (value === "descending") {
      const sortedMovies = [...movies].sort((a, b) =>
        b.original_title.localeCompare(a.original_title)
      );
      setMovies(sortedMovies);
    } else {
      setMovies(allMoviesFiltered);
    }
  };
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
          <p className="noMovies">{error}</p>
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
