import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import TrendingMovie from "../TrendingMovie";

describe("TrendingMovie", () => {
  const renderComponent = (poster, index) => {
    render(<TrendingMovie posterUrl={poster} index={index} />);
  };

  it("should render the trending item correctly", () => {
    renderComponent("poster.png", 4);
    expect(screen.getByTestId("trending-item")).toBeInTheDocument();
  });

  it("should render the movie trending position correctly", () => {
    renderComponent("poster.png", 4);
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("should render the movie poster correctly when the poster is an image", async () => {
    renderComponent("poster.png", 4);

    const poster = await screen.findByAltText("Trending movie 5");
    expect(poster).toBeInTheDocument();
    expect(poster.src).toContain("poster.png");
  });

  it("should render the movie poster correctly when it is `null`", async () => {
    renderComponent("null", 4);

    const poster = await screen.findByAltText("Trending movie 5");
    expect(poster).toBeInTheDocument();
    expect(poster.src).toContain("no-movie.png");
  });

  it("should render the movie poster correctly when it is `N/A`(no image)", async () => {
    renderComponent("N/A", 4);

    const poster = await screen.findByAltText("Trending movie 5");
    expect(poster).toBeInTheDocument();
    expect(poster.src).toContain("no-movie.png");
  });

  it("should render the movie poster correctly when there is no poster passed", async () => {
    renderComponent("", 4);

    const poster = await screen.findByAltText("Trending movie 5");
    expect(poster).toBeInTheDocument();
    expect(poster.src).toContain("no-movie.png");
  });
});
