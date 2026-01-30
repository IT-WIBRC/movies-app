import Search from "./components/Search";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";
import { useState, useEffect } from "react";
import useDebounce from "./hooks/useDebounce";
import { GET_OPTIONS } from "./api/config";
import { NETLIFY_FUNCTIONS_BASE_URL } from "./api/constant";
import { getTrendingMovies, processGettingMovies } from "./api/movies";
import { TrendingMovie } from "./components/TrendingMovie";

function App() {
  /*
    TODO: Check how it behaves when there is no internet connection
    TODO: Add the abort control on request
    TODO: Add commitlint and linter check and github ci
    TODO: Check if there are way stop improve it using other hooks (useMemo, useTransition)
    TODO: Use toast lib to manage error messages
    TODO: Add unit tests for this project too and update the github ci
    TODO: Add a detail page too using router
    TODO: Migrate to Typescript
    TODO: Enhance the image loading display
    TODO: Use Internationalization
    ! TODO: Create a Netlify function to avoid exposing my environment variables in the request and remove the `SECRETS_SCAN_ENABLED=true` in the env files. Change `NETLIFY_FUNCTIONS_BASE_URL` to the online app base url
  */
  const [searchItem, setSearchItem] = useState("");
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isMovieListLoading, setIsMovieListLoading] = useState(false);
  const debouncedSearchTerm = useDebounce(searchItem, 1000);

  const controller = new AbortController();
  const fetchMovies = async (query = "") => {
    setIsMovieListLoading(true);
    setErrorMessage("");
    try {
      const movies = await processGettingMovies(query, controller.signal);
      setMovieList(() => movies ?? []);
    } catch (error) {
      console.error("Error while fetching movies: ", error);
      setErrorMessage("Error while fetching movies. Please try again");
    } finally {
      setIsMovieListLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);

    return () => {
      controller.abort();
    };
  }, [debouncedSearchTerm]);

  useEffect(() => {
    const controllerTrending = new AbortController();
    const loadTrendingMovies = async () => {
      try {
        const movies = await getTrendingMovies(controllerTrending.signal);
        setTrendingMovies(movies);
      } catch (error) {
        console.error(error);
        // TODO: Manage this error too
      }
    };

    loadTrendingMovies();

    return () => {
      controllerTrending.abort();
    };
  }, []);

  return (
    <main className="flex flex-col">
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="/hero.png" alt="Popular movies images" />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy
            Without the Hassle
          </h1>
          <Search searchItem={searchItem} setSearchItem={setSearchItem} />
        </header>

        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending</h2>
            <ul>
              {trendingMovies.map(({ movie_id, poster_url }, index) => (
                <TrendingMovie
                  key={movie_id}
                  posterUrl={poster_url}
                  index={index}
                />
              ))}
            </ul>
          </section>
        )}

        <section className="all-movies grow h-full flex flex-col">
          <h2 className="mt-10">All movies</h2>
          {isMovieListLoading ? (
            <div className="flex justify-center items-center grow h-full">
              <Spinner />
            </div>
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
