import React from "react";

const SortMovies = ({ sortBy, handleSort }) => {
  return (
    <select
      name="sort"
      aria-label="Sort movies"
      value={sortBy}
      onChange={handleSort}
      className="movie_sorting"
    >
      <option value="">Default order</option>
      <option value="date">Newest releases</option>
      <option value="rating">Highest rated</option>
      <option value="ascending">Title A–Z</option>
      <option value="descending">Title Z–A</option>
    </select>
  );
};

export default SortMovies;
