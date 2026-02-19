import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import Search from "../Search";

describe("Search", () => {
  it("should render the component correctly", () => {
    render(<Search searchItem={""} setSearchItem={() => console.log("")} />);
    expect(screen.getByTestId("search-bar")).toBeInTheDocument();
  });

  it("should render the search icon correctly", async () => {
    render(<Search searchItem={""} setSearchItem={() => console.log("")} />);
    const searchIcon = await screen.findByAltText("Search icon");
    expect(searchIcon).toBeInTheDocument();
    expect(searchIcon.src).toContain("/search.svg");
  });

  it("should render the search input correctly", () => {
    render(<Search searchItem={""} setSearchItem={() => console.log("")} />);
    const searchInput = screen.getByPlaceholderText(
      "Search through 300+ movies online",
    );
    expect(searchInput).toBeInTheDocument();
    expect(searchInput.type).toContain("search");
    expect(searchInput.ariaLabel).toContain("Search bar for movies");
  });

  it("should render the search input correctly with default value", () => {
    render(<Search searchItem={"Dav"} setSearchItem={() => console.log("")} />);
    expect(screen.getByDisplayValue("Dav")).toBeInTheDocument();
  });

  it("should render the search input correctly with default value", async () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    const user = userEvent.setup();
    render(
      <Search
        searchItem={"Dav"}
        setSearchItem={(value) => console.log(value)}
      />,
    );
    const searchInput = screen.getByRole("searchbox", { selector: "input" });
    expect(searchInput).toBeInTheDocument();

    await user.type(searchInput, "i");

    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(consoleSpy).toHaveBeenCalledWith("Davi");

    vi.clearAllMocks();
  });
});
