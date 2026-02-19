const MovieCardSkeleton = () => {
  return (
    <li className="movie-card animate-pulse" data-testid="skeleton-item">
      <div
        className="w-full aspect-2/3 bg-gray-800 rounded-lg mb-4"
        data-testid="skeleton-image"
      />

      <div className="space-y-3">
        <div
          className="h-4 bg-gray-700 rounded w-3/4"
          data-testid="skeleton-star"
        />
        <div className="flex items-center space-x-2">
          <div
            className="h-3 bg-gray-700 rounded w-8"
            data-testid="skeleton-creation-date"
          />
          <div
            className="h-3 bg-gray-700 rounded w-16"
            data-testid="skeleton-title"
          />
        </div>
      </div>
    </li>
  );
};
export default MovieCardSkeleton;
