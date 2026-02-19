import { render, screen, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import TrendingList from "../TrendingList";

describe("TrendingList", () => {
  it("should render the component correctly when there are not movies", async () => {
    const getMovies = new Promise((resolve) => {
      resolve([]);
    });

    await act(() => {
      render(<TrendingList promise={getMovies} />);
    });

    expect(screen.getByText("No trending movies yet")).toBeInTheDocument();
  });

  it("should render the component correctly when the promise fails", async () => {
    const getMovies = new Promise((resolve) => {
      resolve(undefined);
    });

    await act(() => {
      render(<TrendingList promise={getMovies} />);
    });

    expect(screen.getByText("No trending movies yet")).toBeInTheDocument();
  });

  it("should render the movies correctly when there promise succeed", async () => {
    const getMovies = new Promise((resolve) => {
      resolve([
        {
          movie_id: "135",
          poster_url: "poster1.png",
        },
        {
          movie_id: "13598",
          poster_url: "poster2.png",
        },
      ]);
    });

    await act(() => {
      render(<TrendingList promise={getMovies} />);
    });
    expect(screen.getByTestId("movies")).toBeInTheDocument();
    expect(screen.getAllByTestId("trending-item")).toHaveLength(2);
  });
});
