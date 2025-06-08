import React from "react";

const FilterMovies = ({ givingRating, onRatingButtonClick, ratings }) => {
  return (
    <ul className="center_el movie_filter">
      {ratings.map((rating) => (
        <li
          key={rating}
          className={
            givingRating === rating
              ? "movie_filter_item active"
              : "movie_filter_item"
          }
          onClick={() => onRatingButtonClick(rating)}
        >
          {rating}+
        </li>
      ))}
    </ul>
  );
};

export default FilterMovies;
