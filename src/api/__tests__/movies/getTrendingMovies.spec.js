import { describe, it, expect, vi, afterAll, afterEach } from "vitest";
import { GET_OPTIONS } from "../../config";
import { getTrendingMovies } from "../../movies";
import { fetchFn as getTrendingMoviesMock, signal } from "../../../../setupTests";

describe("getTrendingMovies", () => {
  afterEach(() => {
    getTrendingMoviesMock.mockClear();
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  it("should call the api with the right options", async () => {
    getTrendingMoviesMock.mockResolvedValueOnce({
      json: () => [],
      ok: true,
    });

    const trendingMovies = await getTrendingMovies(signal);

    expect(getTrendingMoviesMock).toHaveBeenCalledTimes(1);
    expect(getTrendingMoviesMock).toHaveBeenCalledWith(
      expect.stringContaining("/get-trending-movies"),
      { signal },
      GET_OPTIONS,
    );
    expect(trendingMovies).toEqual([]);
  });

  it("should return the trending movies when the request succeed", async () => {
    const trendingMoviesReturnMock = [
      {
        movie_id: "135",
        poster_url: "poster1.png",
      },
      {
        movie_id: "13598",
        poster_url: "poster2.png",
      },
    ];
    getTrendingMoviesMock.mockResolvedValueOnce({
      json: () => trendingMoviesReturnMock,
      ok: true,
    });

    const trendingMovies = await getTrendingMovies(signal);

    expect(getTrendingMoviesMock).toHaveBeenCalledTimes(1);
    expect(trendingMovies).toEqual(trendingMoviesReturnMock);
  });

  it("should throw an error when the request fails", async () => {
    getTrendingMoviesMock.mockResolvedValueOnce({
      json: () => [],
      ok: false,
    });

    await expect(getTrendingMovies(signal)).rejects.toThrow(
      "Failed to fetch trending movies",
    );
    expect(getTrendingMoviesMock).toHaveBeenCalledTimes(1);
  });
});
