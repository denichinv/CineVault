import React from "react";

const SortMovies = ({ sortBy, handleSort }) => {
  return (
    <>
      <select
        name=""
        id=""
        value={sortBy}
        onChange={handleSort}
        className="movie_sorting"
      >
        <option value="">Sort By</option>
        <option value="date">Date</option>
        <option value="rating">Rating</option>
      </select>
      <select
        name=""
        id=""
        value={sortBy}
        onChange={handleSort}
        className="movie_sorting"
      >
        <option value="ascending">Ascending</option>
        <option value="descending">Descending</option>
      </select>
    </>
  );
};

export default SortMovies;
