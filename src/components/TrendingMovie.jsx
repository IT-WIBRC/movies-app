export const TrendingMovie = ({ posterUrl, index }) => {
  return (
    <li>
      <p>{index + 1}</p>
      <img
        src={
          posterUrl && !posterUrl.includes("null") && !posterUrl.includes("N/A")
            ? posterUrl
            : "/no-movie.png"
        }
        alt="Trending movie"
      />
    </li>
  );
};
