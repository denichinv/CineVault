import React, { useRef } from "react";

const SearchMovies = ({ query, onQueryChange, onSearch }) => {
  const inputRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(query.trim());
  };

  const handleClear = () => {
    onQueryChange("");
    onSearch("");
    inputRef.current?.focus();
  };

  return (
    <form
      className="movie_search"
      role="search"
      aria-label="Movie search"
      onSubmit={handleSubmit}
      noValidate
    >
      <label htmlFor="movie-search">Search movies</label>

      <div className="movie_search_controls">
        <input
          ref={inputRef}
          id="movie-search"
          name="query"
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search by movie title"
        />

        {query.length > 0 && (
          <button type="button" onClick={handleClear}>
            Clear
          </button>
        )}

        <button type="submit">Search</button>
      </div>
    </form>
  );
};

export default SearchMovies;
