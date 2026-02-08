import { GET_OPTIONS, POST_OPTIONS } from "./config";
import { NETLIFY_FUNCTIONS_BASE_URL } from "./constant";

export const processGettingMovies = async (searchTerm, signal) => {
  const response = await fetch(
    `${NETLIFY_FUNCTIONS_BASE_URL}/get-some-movies${searchTerm ? `?query=${encodeURIComponent(searchTerm)}` : ""}`,
    { signal },
    GET_OPTIONS,
  );

  if (!response.ok) {
    throw Error("Failed to fetch movies");
  }
  const movies = await response.json();

  if (searchTerm && movies.length > 0) {
    const movie = movies[0];
    await updateSearchCount(
      {
        searchTerm,
        movieId: movie.id,
        moviePosterPath: movie.poster_path,
      }
    );
  }
  return movies;
};

export const updateSearchCount = async (
  { searchTerm, movieId, moviePosterPath },
  signal,
) => {
  try {
    const response = await fetch(
      `${NETLIFY_FUNCTIONS_BASE_URL}/update-movie-search-count`,
      {
        ...POST_OPTIONS,
        body: JSON.stringify({
          searchTerm,
          movieId,
          posterPath: moviePosterPath,
        }),
        signal,
      },
    );

    if (!response.ok) {
      throw Error("Failed to update the count of the movie");
    }
  } catch (error) {
    console.error("Error while fetching movies: ", error);
  }
};

export const getTrendingMovies = async (signal) => {
  const response = await fetch(
    `${NETLIFY_FUNCTIONS_BASE_URL}/get-trending-movies`,
    { signal },
    GET_OPTIONS,
  );

  if (!response.ok) {
    throw Error("Failed to fetch trending movies");
  }
  return response.json();
};
