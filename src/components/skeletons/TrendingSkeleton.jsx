const TrendingSkeleton = () => {
  return (
    <li
      className="flex flex-row items-center animate-pulse"
      data-testid="skeleton-item"
    >
      <div className="w-20 h-32 bg-gray-800/50 rounded-lg mr-2" data-testid="skeleton-position" />
      <div className="w-32 h-40 bg-gray-800 rounded-lg" data-testid="skeleton-image" />
    </li>
  );
};
export default TrendingSkeleton;
