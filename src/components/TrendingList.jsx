import { use } from "react";
import NoData from "./NoData";
import { TrendingMovie } from "./TrendingMovie";

const TrendingList = ({ promise }) => {
  const movies = use(promise);

  if (!movies || movies.length === 0)
    return <NoData text="No trending movies yet" />;

  return (
    <ul>
      {movies.map(({ movie_id, poster_url }, index) => (
        <TrendingMovie key={movie_id} posterUrl={poster_url} index={index} />
      ))}
    </ul>
  );
};

export default TrendingList;
