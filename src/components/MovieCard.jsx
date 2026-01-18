import React from "react";

import "./movieCard.css";
const MovieCard = ({ movie }) => {
  return (
    <div className="movie">
      <a
        href={`https://www.themoviedb.org/movie/${movie.id}`}
        target="_blank"
        className="movie_show"
      >
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          className="movie_img"
          alt="moviedetails"
        />
        <div className="movie_details">
          <p className="movierating">
            {movie.vote_average.toFixed(1)}{" "}
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/019/617/676/small_2x/gold-star-symbol-png.png"
              className="emoji_class"
              alt="rating Icon"
            ></img>{" "}
          </p>
          <p className="moviedate">{movie.release_date}</p>
        </div>
      </a>
    </div>
  );
};

export default MovieCard;
