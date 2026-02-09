const TrendingSkeleton = () => {
  return (
    <li className="flex flex-row items-center animate-pulse">
      <div className="w-20 h-32 bg-gray-800/50 rounded-lg mr-2" />
      <div className="w-32 h-40 bg-gray-800 rounded-lg" />
    </li>
  );
};
export default TrendingSkeleton;
