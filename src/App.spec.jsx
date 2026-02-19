import {
  render,
  screen,
  waitFor,
  fireEvent,
  act,
} from "@testing-library/react";
import { vi, describe, it, expect, beforeEach, afterAll } from "vitest";
import App from "./App";
import { toast } from "react-toastify";

const mocks = vi.hoisted(() => {
  return {
    getTrendingMovies: vi.fn(() =>
      Promise.resolve([{ movie_id: "1", poster_url: "trend.png" }]),
    ),
    processGettingMovies: vi.fn(() => Promise.resolve([])),
  };
});

vi.mock("./api/movies", () => ({
  getTrendingMovies: mocks.getTrendingMovies,
  processGettingMovies: mocks.processGettingMovies,
}));

vi.mock("react-toastify", () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
  ToastContainer: () => <div data-testid="toast-container" />,
}));

describe("App", () => {
  const mockMovies = [
    {
      id: "101",
      title: "Inception",
      vote_average: 8.8,
      release_date: "2010-07-16",
      original_language: "en",
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    mocks.processGettingMovies.mockResolvedValue(mockMovies);
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  it("should render the hero section and initial data", async () => {
    await act(async () => {
      await render(<App />);
    });

    expect(screen.getByText(/Find/i)).toBeInTheDocument();

    const trendingItem = await screen.findByTestId(
      "trending-item",
      {},
      { timeout: 3000 },
    );
    expect(trendingItem).toBeInTheDocument();

    const movieTitle = await screen.findByText("Inception");
    expect(movieTitle).toBeInTheDocument();
  });

  it("should update movie list when searching (handling debounce)", async () => {
    const searchResult = [{ id: "202", title: "Interstellar" }];
    mocks.processGettingMovies.mockResolvedValueOnce(searchResult);

    await act(async () => {
      render(<App />);
    });

    const searchInput = screen.getByPlaceholderText(/search/i);
    fireEvent.change(searchInput, { target: { value: "Inter" } });

    await waitFor(
      () => {
        expect(screen.getByText("Interstellar")).toBeInTheDocument();
      },
      { timeout: 2500 },
    );
  });

  it("should show NoData message when no movies are found", async () => {
    mocks.processGettingMovies.mockResolvedValueOnce([]);

    await act(async () => {
      render(<App />);
    });

    const searchInput = screen.getByPlaceholderText(/search/i);
    fireEvent.change(searchInput, { target: { value: "Unknown" } });

    await waitFor(
      () => {
        expect(screen.getByText("No movies found")).toBeInTheDocument();
      },
      { timeout: 2500 },
    );
  });

  it("should keep previous movies on screen if a new search fails", async () => {
    mocks.processGettingMovies.mockResolvedValueOnce(mockMovies);

    await act(async () => {
      render(<App />);
    });

    await waitFor(() =>
      expect(screen.getByText("Inception")).toBeInTheDocument(),
    );

    mocks.processGettingMovies.mockRejectedValueOnce(
      new Error("Network Error"),
    );

    const searchInput = screen.getByPlaceholderText(/search/i);
    fireEvent.change(searchInput, { target: { value: "BreakMe" } });

    await waitFor(
      () => {
        expect(screen.getByText("Inception")).toBeInTheDocument();
      },
      { timeout: 2500 },
    );
  });

  it("should trigger a toast error when the search API fails", async () => {
    mocks.processGettingMovies.mockRejectedValueOnce(new Error("API Down"));

    await act(async () => {
      render(<App />);
    });

    const searchInput = screen.getByPlaceholderText(/search/i);

    fireEvent.change(searchInput, { target: { value: "Batman" } });

    await waitFor(
      () => {
        expect(toast.error).toHaveBeenCalledWith("Failed to fetch movies.");
      },
      { timeout: 2500 },
    );
  });
});
