import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import MovieCard from "../MovieCard";

describe("MovieCard", () => {
  const movie = {
    title: "David",
    poster_path: "poster.svg",
    release_date: "2025/10/10",
    vote_average: 750,
    original_language: "en-GB",
  };

  const renderComponent = (movieProps = {}) => {
    render(
      <MovieCard
        movie={{
          ...movie,
          ...movieProps,
        }}
      />,
    );
  };

  it("should render the component correctly", () => {
    renderComponent();
    expect(screen.getByTestId("card-item")).toBeInTheDocument();
  });

  it("should render the poster correctly when passed", async () => {
    renderComponent();
    const poster = await screen.findByAltText(movie.title);
    expect(poster).toBeInTheDocument();
    expect(poster.alt).toBe(movie.title);
    expect(poster.src).toContain(movie.poster_path);
  });

  it("should render the poster correctly when empty", async () => {
    renderComponent({
      poster_path: "",
    });
    const poster = await screen.findByAltText(movie.title);
    expect(poster).toBeInTheDocument();
    expect(poster.alt).toBe(movie.title);
    expect(poster.src).toContain("no-movie.png");
  });

  it("should display the movie title correctly", () => {
    renderComponent();
    expect(screen.getByText(movie.title)).toBeInTheDocument();
  });

  it("should render the movie rating star image correctly", async () => {
    renderComponent();
    const star = await screen.findByAltText(`star from ${movie.title}`);
    expect(star).toBeInTheDocument();
    expect(star.src).toContain("/star.svg");
  });

  it("should render the movie rating correctly", async () => {
    renderComponent();
    const votes = await screen.findByTestId("rating");
    expect(votes).toBeInTheDocument();
    expect(votes).toHaveTextContent(movie.vote_average.toFixed(1));
  });

  it("should render the movie rating correctly when empty", async () => {
    renderComponent({
      vote_average: undefined,
    });
    const votes = await screen.findByTestId("rating");
    expect(votes).toBeInTheDocument();
    expect(votes).toHaveTextContent("NN/A");
  });

  it("should display the movie original language", () => {
    renderComponent();
    expect(screen.getByText(movie.original_language)).toBeInTheDocument();
  });

   it("should display the movie release date when present", () => {
     renderComponent();
     const displayedReleaseDate = movie.release_date.split("-")[0];
     expect(screen.getByText(displayedReleaseDate)).toBeInTheDocument();
   });

    it("should display the movie release date when not present", () => {
      renderComponent({
        release_date: undefined
      });
      expect(screen.getByText("N/A")).toBeInTheDocument();
    });
});
