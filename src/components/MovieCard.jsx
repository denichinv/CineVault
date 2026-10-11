import React, { useState } from "react";
import "./movieCard.css";

const MovieCard = ({ movie }) => {
  const title = movie.title || movie.original_title || "Untitled movie";
  const year = movie.release_date?.slice(0, 4) || "Release date unknown";
  const rating = Number.isFinite(movie.vote_average)
    ? movie.vote_average.toFixed(1)
    : "Not rated";
  const [failedPoster, setFailedPoster] = useState(null);

  const hasPoster =
    Boolean(movie.poster_path) && failedPoster !== movie.poster_path;

  return (
    <article className="movie">
      <a
        href={`https://www.themoviedb.org/movie/${movie.id}`}
        target="_blank"
        rel="noopener noreferrer"
        className="movie_show"
        aria-label={`${title} — view on TMDB (opens in a new tab)`}
      >
        <div className="movie_poster">
          {hasPoster ? (
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              className="movie_img"
              onError={() => setFailedPoster(movie.poster_path)}
              alt=""
              loading="lazy"
              decoding="async"
              width="500"
              height="750"
            />
          ) : (
            <div className="movie_poster_fallback">
              <span>Poster unavailable</span>
            </div>
          )}
        </div>

        <div className="movie_details">
          <h3 className="movie_title">{title}</h3>

          <div className="movie_metadata">
            <span className="moviedate">{year}</span>

            <span className="movierating">
              <span className="movie_star" aria-hidden="true">
                ★
              </span>
              {rating}
            </span>
          </div>
        </div>
      </a>
    </article>
  );
};

export default MovieCard;
