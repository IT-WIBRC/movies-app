import { vi } from "vitest";
import "@testing-library/jest-dom/vitest";

const fetchFn = vi.fn();
globalThis.fetch = fetchFn;

const signal = new AbortController();

export { fetchFn, signal };
