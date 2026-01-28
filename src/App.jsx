import Search from "./components/Search";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";
import { useState, useEffect } from "react";
import useDebounce from "./hooks/useDebounce";
import { getTrendingMovies, updateSearchCount } from "./api/appwrite";
import { API_BASE_URL } from "./api/constant";
import { API_OPTIONS } from "./api/config";

function App() {
  /*
    TODO: Check how it behaves when there is no internet connection
    TODO: Enhance the image loading display
    TODO: Check if there are way stop improve it using other hooks (useMemo, useTransition)
    TODO:  Check if it's not preferable to use Map/Set instead of an array
    TODO: Use toast lib to manage error messages
    TODO: Add unit tests for this project too
    TODO: Add a detail page too using router
    TODO: Migrate to Typescript
    ! TODO: Create a Netlify function to avoid exposing my environment variables in the request and remove the `SECRETS_SCAN_ENABLED=true` in the env files
  */
  const [searchItem, setSearchItem] = useState("");
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isMovieListLoading, setIsMovieListLoading] = useState(false);
  const debouncedSearchTerm = useDebounce(searchItem, 1000);

  const fetchMovies = async (query = "") => {
    setIsMovieListLoading(true);
    setErrorMessage("");
    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw Error("Failed to fetch movies");
      }
      const data = await response.json();

      // TODO: Double check this line as it might be wrong
      if (data.Response === "False") {
        setErrorMessage(data.Error || "Failed to fetch movies.");
        setMovieList([]);
        return;
      }
      setMovieList(data.results || []);

      if (query && data.results.length > 0) {
        const movie = data.results[0];
        await updateSearchCount(query, movie.id, movie.poster_path);
      }
    } catch (error) {
      console.error("Error while fetching movies: ", error);
      setErrorMessage("Error while fetching movies. Please try again");
    } finally {
      setIsMovieListLoading(false);
    }
  };

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
    } catch (error) {
      console.error(error);
      // TODO: Manage this error too
    }
  };

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="/hero.png" alt="Popular movies images" />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy
            Without the Hassle
          </h1>
          <Search searchItem={searchItem} setSearchItem={setSearchItem} />
          {/* TODO: Bug when we click on the search cross to delete the search content */}
        </header>

        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending</h2>
            <ul>
              {trendingMovies.map((trendingMovie, index) => (
                <li key={trendingMovie.movie_id}>
                  <p>{index + 1}</p>
                  <img src={trendingMovie.poster_url} alt="Trending movie" />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="all-movies">
          <h2 className="mt-10">All movies</h2>
          {isMovieListLoading ? (
            //* Should be centered in the content and bigger
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}

export default App;
