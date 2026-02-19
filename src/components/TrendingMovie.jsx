export default function TrendingMovie({ posterUrl, index }) {
  return (
    <li data-testid="trending-item">
      <p>{index + 1}</p>
      <img
        src={
          posterUrl && !posterUrl.includes("null") && !posterUrl.includes("N/A")
            ? posterUrl
            : "/no-movie.png"
        }
        alt={"Trending movie " + (index + 1)}
      />
    </li>
  );
}
