import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import useDebounce from "../../hooks/useDebounce";

describe("useDebounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should have the initial value passed as default", () => {
    const { result } = renderHook(() => useDebounce("Davi", 300));

    expect(result.current).toBe("Davi");
  });

  it("should not update the value before the delay", async () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "first", delay: 500 },
      },
    );

    rerender({ value: "second", delay: 500 });
    act(() => {
      vi.advanceTimersByTime(499);
    });
    expect(result.current).toBe("first");
  });

  it("should update the value after the specified delay", async () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "first", delay: 500 },
      },
    );

    rerender({ value: "second", delay: 500 });
    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(result.current).toBe("second");
  });

  it("should reset the timer if the value changes within the delay period", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "first", delay: 500 },
      },
    );

    rerender({ value: "second", delay: 500 });
    act(() => {
      vi.advanceTimersByTime(250);
    });

    rerender({ value: "third", delay: 500 });

    act(() => {
      vi.advanceTimersByTime(250);
    });
    expect(result.current).toBe("first");

    act(() => {
      vi.advanceTimersByTime(250);
    });
    expect(result.current).toBe("third");
  });
});
