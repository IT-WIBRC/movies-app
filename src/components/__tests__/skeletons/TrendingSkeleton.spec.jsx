import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import TrendingSkeleton from "../../skeletons/TrendingSkeleton";

describe("TrendingSkeleton", () => {
  beforeEach(() => {
    render(<TrendingSkeleton />);
  });

  it("should render the skeleton item correctly", () => {
    expect(screen.getByTestId("skeleton-item")).toBeInTheDocument();
  });

  it("should render the skeleton trending position correctly", () => {
    expect(screen.getByTestId("skeleton-position")).toBeInTheDocument();
  });

  it("should render the skeleton image correctly", () => {
    expect(screen.getByTestId("skeleton-image")).toBeInTheDocument();
  });
});
