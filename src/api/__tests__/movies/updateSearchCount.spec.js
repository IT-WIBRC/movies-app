import { describe, it, expect, vi, afterAll, afterEach } from "vitest";
import { POST_OPTIONS } from "../../config";
import { updateSearchCount } from "../../movies";
import { fetchFn as updateSearchCountFn, signal } from "../../../../setupTests";

const firstParam = {
  searchTerm: "David",
  movieId: "13214564ddf",
  moviePosterPath: "poster.png",
};

describe("updateSearchCount", () => {
  afterEach(() => {
    updateSearchCountFn.mockClear();
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  it("should call the api with the right options", async () => {
    updateSearchCountFn.mockResolvedValueOnce({
      ok: true,
    });

    await updateSearchCount({ ...firstParam }, signal);

    expect(updateSearchCountFn).toHaveBeenCalledTimes(1);
    expect(updateSearchCountFn).toHaveBeenCalledWith(
      expect.stringContaining("/update-movie-search-count"),
      {
        ...POST_OPTIONS,
        body: JSON.stringify({
          ...firstParam,
          posterPath: firstParam.moviePosterPath,
          moviePosterPath: undefined,
        }),
        signal,
      },
    );
  });

  it("should throw an error when the update fails", async () => {
    updateSearchCountFn.mockResolvedValueOnce({
      ok: false,
    });

    const spyError = vi
      .spyOn(console, "error")
      .mockImplementationOnce(() => {});
    await updateSearchCount({ ...firstParam }, signal);

    expect(updateSearchCountFn).toHaveBeenCalledTimes(1);

    expect(spyError).toHaveBeenCalledTimes(1);
    expect(spyError).toHaveBeenCalledWith(
      "Error while fetching movies: ",
      Error("Failed to update the count of the movie"),
    );
  });

  it("should throw an error when the update throw an error", async () => {
    const failError = new Error("Error, update fails");
    updateSearchCountFn.mockRejectedValueOnce(failError);

    const spyError = vi
      .spyOn(console, "error")
      .mockImplementationOnce(() => {});

    await updateSearchCount({ ...firstParam }, signal);

    expect(updateSearchCountFn).toHaveBeenCalledTimes(1);

    expect(spyError).toHaveBeenCalledTimes(1);
    expect(spyError).toHaveBeenCalledWith(
      "Error while fetching movies: ",
      failError,
    );
  });
});
