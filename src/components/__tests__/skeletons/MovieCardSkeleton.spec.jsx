import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import MovieCardSkeleton from "../../skeletons/MovieCardSkeleton";

describe("MovieCardSkeleton", () => {
  beforeEach(() => {
    render(<MovieCardSkeleton />);
  });

  it("should render the skeleton item correctly", () => {
    expect(screen.getByTestId("skeleton-item")).toBeInTheDocument();
  });

  it("should render the skeleton trending image correctly", () => {
    expect(screen.getByTestId("skeleton-image")).toBeInTheDocument();
  });

  it("should render the skeleton star correctly", () => {
    expect(screen.getByTestId("skeleton-star")).toBeInTheDocument();
  });

  it("should render the skeleton creation date correctly", () => {
    expect(screen.getByTestId("skeleton-creation-date")).toBeInTheDocument();
  });

  it("should render the skeleton title correctly", () => {
    expect(screen.getByTestId("skeleton-title")).toBeInTheDocument();
  });
});
