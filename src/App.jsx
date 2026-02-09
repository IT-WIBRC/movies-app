import {
  useState,
  useEffect,
  useTransition,
  useActionState,
  Suspense,
} from "react";
import { ToastContainer, toast } from "react-toastify";
import Search from "./components/Search";
import MovieCard from "./components/MovieCard";
import { getTrendingMovies, processGettingMovies } from "./api/movies";
import { TrendingMovie } from "./components/TrendingMovie";
import NoData from "./components/NoData";
import MovieCardSkeleton from "./components/skeletons/MovieCardSkeleton";
import TrendingSkeleton from "./components/skeletons/TrendingSkeleton";
import useDebounce from "./hooks/useDebounce";
import TrendingList from "./components/TrendingList";

async function fetchMoviesAction(prevState, query) {
  try {
    const movies = await processGettingMovies(query);
    return { movies: movies ?? [], error: null };
  } catch (error) {
    toast.error("Failed to fetch movies.");
    console.error(error);
    return { movies: [...prevState.movies], error: "Network Error" };
  }
}

const trendingPromise = getTrendingMovies();

function App() {
  const [searchItem, setSearchItem] = useState("");
  const [isPending, startTransition] = useTransition();
  const debouncedSearchTerm = useDebounce(searchItem, 1000);

  const [state, submitSearch, isSearching] = useActionState(fetchMoviesAction, {
    movies: [],
    error: null,
  });

  useEffect(() => {
    startTransition(() => {
      submitSearch(debouncedSearchTerm);
    });
  }, [debouncedSearchTerm, submitSearch]);

  return (
    <main className="flex flex-col">
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="/hero.png" alt="Popular movies" />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy
            Without the Hassle
          </h1>
          <Search searchItem={searchItem} setSearchItem={setSearchItem} />
        </header>

        <section className="trending">
          <h2>Trending</h2>
          <Suspense
            fallback={
              <ul className="mt-10">
                {[1, 2, 3, 4, 5].map((n) => (
                  <TrendingSkeleton key={n} />
                ))}
              </ul>
            }
          >
            <TrendingList promise={trendingPromise} />
          </Suspense>
        </section>

        <section className="all-movies grow h-full flex flex-col">
          <h2 className="mt-10">All movies</h2>

          <div
            className="transition-opacity duration-300"
            style={{ opacity: isSearching || isPending ? 0.6 : 1 }}
          >
            {!isSearching && state.movies.length === 0 ? (
              <NoData text="No movies found" />
            ) : (
              <ul>
                {isSearching && state.movies.length === 0
                  ? [1, 2, 3, 4, 8].map((n) => <MovieCardSkeleton key={n} />)
                  : state.movies.map((movie) => (
                      <MovieCard key={movie.id} movie={movie} />
                    ))}
              </ul>
            )}
          </div>
        </section>
      </div>

      <ToastContainer position="top-right" theme="dark" />
    </main>
  );
}

export default App;
