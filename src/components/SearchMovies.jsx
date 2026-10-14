import React, { useRef, useState } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";

const getTitle = (movie) =>
  movie.title || movie.original_title || "Untitled movie";

const SearchMovies = ({ query, onQueryChange, onSearch, suggestions = [] }) => {
  const inputRef = useRef(null);
  const [dismissed, setDismissed] = useState(false);

  const search = () => {
    setDismissed(true);
    onSearch(query.trim());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    search();
  };

  const handleSelect = (movie) => {
    if (!movie) return;

    const title = getTitle(movie);
    setDismissed(true);
    onQueryChange(title);
    onSearch(title);
  };

  const handleClear = () => {
    setDismissed(true);
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

      <Combobox value={query} onChange={handleSelect}>
        {({ activeOption }) => (
          <>
            <div className="movie_search_controls">
              <ComboboxInput
                ref={inputRef}
                id="movie-search"
                name="query"
                type="search"
                value={query}
                displayValue={(value) => value}
                autoComplete="off"
                placeholder="Search by movie title"
                onChange={(event) => {
                  setDismissed(false);
                  onQueryChange(event.target.value);
                }}
                onKeyDown={(event) => {
                  if (event.nativeEvent.isComposing) return;

                  if (event.key === "Enter" && !activeOption) {
                    event.preventDefault();
                    search();
                  }
                }}
              />

              {query.length > 0 && (
                <button type="button" onClick={handleClear}>
                  Clear
                </button>
              )}

              <button type="submit">Search</button>
            </div>

            {!dismissed && suggestions.length > 0 && (
              <ComboboxOptions
                anchor="bottom start"
                modal={false}
                className="movie_suggestions"
                aria-label="Movie suggestions"
              >
                {suggestions.map((movie) => (
                  <ComboboxOption
                    key={movie.id}
                    value={movie}
                    className="movie_suggestion"
                  >
                    <span
                      className="movie_suggestion_poster"
                      aria-hidden="true"
                    >
                      <span>—</span>
                      {movie.poster_path && (
                        <img
                          src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                          alt=""
                          width="40"
                          height="60"
                          onError={(event) => {
                            event.currentTarget.style.visibility = "hidden";
                          }}
                        />
                      )}
                    </span>

                    <span className="movie_suggestion_details">
                      <span className="movie_suggestion_title">
                        {getTitle(movie)}
                      </span>
                      <span className="movie_suggestion_year">
                        {movie.release_date?.slice(0, 4) ||
                          "Release date unknown"}
                      </span>
                    </span>
                  </ComboboxOption>
                ))}
              </ComboboxOptions>
            )}
          </>
        )}
      </Combobox>
    </form>
  );
};

export default SearchMovies;
