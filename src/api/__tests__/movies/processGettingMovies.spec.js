import { describe, it, expect, vi, afterAll, afterEach } from "vitest";
import { GET_OPTIONS } from "../../config";
import { processGettingMovies } from "../../movies";
import {
  fetchFn as processGettingMoviesMock,
  signal,
} from "../../../../setupTests";

describe("processGettingMovies", () => {
  afterEach(() => {
    processGettingMoviesMock.mockClear();
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  it("should call the api with the right options when no query is made", async () => {
    processGettingMoviesMock.mockResolvedValueOnce({
      json: () => [],
      ok: true,
    });

    const trendingMovies = await processGettingMovies("", signal);

    expect(processGettingMoviesMock).toHaveBeenCalledTimes(1);
    expect(processGettingMoviesMock).toHaveBeenCalledWith(
      expect.stringContaining("/get-some-movies"),
      { signal },
      GET_OPTIONS,
    );
    expect(trendingMovies).toEqual([]);
  });

  it("should call the api with the right options when a query is made", async () => {
    processGettingMoviesMock.mockResolvedValueOnce({
      json: () => [],
      ok: true,
    });

    const searchTerm = "Davi";
    const trendingMovies = await processGettingMovies(searchTerm, signal);

    expect(processGettingMoviesMock).toHaveBeenCalledTimes(1);
    expect(processGettingMoviesMock).toHaveBeenCalledWith(
      expect.stringContaining(
        `/get-some-movies?query=${encodeURIComponent(searchTerm)}`,
      ),
      { signal },
      GET_OPTIONS,
    );
    expect(trendingMovies).toEqual([]);
  });

  it("should throw an error when the movies failed tp be fetched", async () => {
    processGettingMoviesMock.mockResolvedValueOnce({
      ok: false,
    });

    await expect(processGettingMovies("", signal)).rejects.toThrow(
      "Failed to fetch movies",
    );

    expect(processGettingMoviesMock).toHaveBeenCalledTimes(1);
  });

  it("should throw an error when the movies failed tp be fetched", async () => {
    const moviesReturnMock = [
      {
        id: "135",
        poster_path: "poster1.png",
      },
      {
        id: "13598",
        poster_path: "poster2.png",
      },
    ];
    processGettingMoviesMock.mockResolvedValueOnce({
      json: () => moviesReturnMock,
      ok: true,
    });

    const updateSearchCountMock = processGettingMoviesMock;
    updateSearchCountMock.mockResolvedValueOnce({
      ok: true,
    });

    const movies = await processGettingMovies(signal);

    expect(processGettingMoviesMock).toHaveBeenCalledTimes(2);
    expect(movies).toEqual(moviesReturnMock);
  });
});
