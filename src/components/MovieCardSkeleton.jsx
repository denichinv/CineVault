const MovieCardSkeleton = () => {
  return (
    <div className="movie skeleton-card" aria-hidden="true">
      <div className="skeleton thumbnail" />

      <div className="movie_details">
        <div className="movie_title">
          <div className="skeleton title" />
        </div>

        <div className="movie_metadata">
          <div className="skeleton subtitle" />
          <div className="skeleton rating" />
        </div>
      </div>
    </div>
  );
};

export default MovieCardSkeleton;
