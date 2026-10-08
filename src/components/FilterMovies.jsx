import React from "react";

const FilterMovies = ({ givingRating, onRatingButtonClick, ratings }) => {
  return (
    <ul className="center_el movie_filter" aria-label="Minimum movie rating">
      {ratings.map((rating) => (
        <li key={rating} style={{ listStyle: "none" }}>
          <button
            type="button"
            className={
              givingRating === rating
                ? "movie_filter_item active"
                : "movie_filter_item"
            }
            aria-pressed={givingRating === rating}
            onClick={() => onRatingButtonClick(rating)}
          >
            {rating}+
          </button>
        </li>
      ))}
    </ul>
  );
};

export default FilterMovies;
