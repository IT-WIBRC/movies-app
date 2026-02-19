  import { render, screen } from "@testing-library/react";
  import { describe, it, expect } from "vitest";
  import NoData from "../NoData";

  describe("NoData", () => {
    it("should render the text correctly when no props is passed", () => {
      render(<NoData />);
      expect(screen.getByText("No data")).toBeInTheDocument();
    });

    it("should render the right text when passed", () => {
      render(<NoData text="No Data to display" />);
      expect(screen.getByText("No Data to display")).toBeInTheDocument();
    });
  });
